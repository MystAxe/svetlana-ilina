<?php
/**
 * Plugin Name: Svetlana — Sytaya private course
 * Description: Paid-access course state and protected video delivery. Payment grant is intentionally separate.
 * Version: 0.1.0
 */
declare(strict_types=1);
if (! defined('ABSPATH')) { exit; }

const SI_SYTAYA_META_ACCESS = 'si_sytaya_access';
const SI_SYTAYA_META_STATE = 'si_sytaya_state';

function si_sytaya_has_access(): bool {
    $user_id = get_current_user_id();
    return $user_id > 0 && (current_user_can('manage_options') || (string) get_user_meta($user_id, SI_SYTAYA_META_ACCESS, true) === '1');
}
function si_sytaya_default_state(): array {
    return ['screens' => [], 'mealCount' => 1];
}
function si_sytaya_state(): array {
    $saved = get_user_meta(get_current_user_id(), SI_SYTAYA_META_STATE, true);
    return is_array($saved) ? array_merge(si_sytaya_default_state(), $saved) : si_sytaya_default_state();
}
function si_sytaya_permission(): bool {
    return si_sytaya_has_access();
}
add_action('rest_api_init', static function (): void {
    register_rest_route('si/v1', '/sytaya/state', [
        [
            'methods' => WP_REST_Server::READABLE,
            'callback' => static fn () => rest_ensure_response(si_sytaya_state()),
            'permission_callback' => 'si_sytaya_permission',
        ],
        [
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => 'si_sytaya_save_state',
            'permission_callback' => 'si_sytaya_permission',
        ],
    ]);
    register_rest_route('si/v1', '/sytaya/video/(?P<day>[1-3])', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'si_sytaya_stream_video',
        'permission_callback' => 'si_sytaya_permission',
        'args' => ['day' => ['validate_callback' => static fn ($value): bool => in_array((int) $value, [1,2,3], true)]],
    ]);
});
function si_sytaya_clean_answers($value): array {
    if (! is_array($value)) { return []; }
    $clean = [];
    foreach (array_slice($value, 0, 100, true) as $key => $answer) {
        if (! is_string($key) || ! preg_match('/^[A-Za-z0-9_]{1,50}$/', $key)) { continue; }
        if (is_array($answer)) {
            $clean[$key] = array_values(array_map(
                static fn ($item): string => sanitize_text_field(substr((string) $item, 0, 500)),
                array_slice(array_filter($answer, 'is_scalar'), 0, 20)
            ));
        } elseif (is_scalar($answer)) {
            $clean[$key] = sanitize_textarea_field(substr((string) $answer, 0, 3000));
        }
    }
    return $clean;
}
function si_sytaya_save_state(WP_REST_Request $request) {
    $allowed = ['before','day1','day2','day3','day4','day5','day6','day7'];
    $screen = (string) $request->get_param('screen');
    if (! in_array($screen, $allowed, true)) {
        return new WP_Error('si_sytaya_screen', 'Некорректный экран.', ['status' => 400]);
    }
    $state = si_sytaya_state();
    $current = $state['screens'][$screen] ?? ['answers' => [], 'complete' => false];
    $answers = si_sytaya_clean_answers($request->get_param('answers'));
    $complete = (bool) $request->get_param('complete');
    if ($complete && $screen !== 'before') {
        $index = array_search($screen, $allowed, true);
        $previous = $allowed[$index - 1];
        if (empty($state['screens'][$previous]['complete'])) {
            return new WP_Error('si_sytaya_order', 'Сначала завершите предыдущий шаг.', ['status' => 409]);
        }
    }
    if ($complete && ($screen === 'before' || $screen === 'day7')) {
        foreach (['hunger','sweet','energy','calm'] as $scale) {
            if (! isset($answers[$scale]) || ! is_scalar($answers[$scale]) || ! preg_match('/^(10|[0-9])$/', (string) $answers[$scale])) {
                return new WP_Error('si_sytaya_scale', 'Заполните четыре шкалы 0–10.', ['status' => 400]);
            }
        }
    }
    if ($complete && $screen === 'day6' && (! is_array($answers['assemblies'] ?? null) || count($answers['assemblies']) < 3)) {
        return new WP_Error('si_sytaya_assemblies', 'Выберите минимум три сборки.', ['status' => 400]);
    }
    $state['screens'][$screen] = ['answers' => $answers, 'complete' => $complete || ! empty($current['complete'])];
    $state['mealCount'] = max(1, min(5, (int) $request->get_param('mealCount')));
    update_user_meta(get_current_user_id(), SI_SYTAYA_META_STATE, $state);
    return rest_ensure_response($state);
}
function si_sytaya_private_dir(): string {
    if (defined('SI_SYTAYA_PRIVATE_DIR') && is_string(SI_SYTAYA_PRIVATE_DIR)) {
        return SI_SYTAYA_PRIVATE_DIR;
    }
    return dirname(rtrim(ABSPATH, '/\\')) . '/private/sytaya';
}
function si_sytaya_stream_video(WP_REST_Request $request) {
    $day = (int) $request['day'];
    $directory = realpath(si_sytaya_private_dir());
    $path = $directory ? realpath($directory . DIRECTORY_SEPARATOR . 'day-' . $day . '.mp4') : false;
    if (! $directory || ! $path || ! str_starts_with($path, $directory . DIRECTORY_SEPARATOR) || ! is_readable($path)) {
        return new WP_Error('si_sytaya_video_missing', 'Видео пока недоступно.', ['status' => 404]);
    }
    $size = filesize($path);
    if (! is_int($size) || $size < 1) {
        return new WP_Error('si_sytaya_video_invalid', 'Видео недоступно.', ['status' => 500]);
    }
    $start = 0;
    $end = $size - 1;
    $range = isset($_SERVER['HTTP_RANGE']) ? (string) $_SERVER['HTTP_RANGE'] : '';
    if ($range !== '') {
        if (! preg_match('/^bytes=(\d+)-(\d*)$/', $range, $matches)) {
            return new WP_Error('si_sytaya_video_range', 'Некорректный диапазон.', ['status' => 416]);
        }
        $start = (int) $matches[1];
        $end = $matches[2] === '' ? $end : min($end, (int) $matches[2]);
        if ($start > $end || $start >= $size) {
            return new WP_Error('si_sytaya_video_range', 'Некорректный диапазон.', ['status' => 416]);
        }
    }
    while (ob_get_level() > 0) { ob_end_clean(); }
    status_header($range ? 206 : 200);
    header('Content-Type: video/mp4');
    header('Content-Disposition: inline; filename="sytaya-day-' . $day . '.mp4"');
    header('Content-Length: ' . (string) ($end - $start + 1));
    header('Accept-Ranges: bytes');
    header('Cache-Control: private, no-store, max-age=0');
    header('X-Content-Type-Options: nosniff');
    if ($range) { header('Content-Range: bytes ' . $start . '-' . $end . '/' . $size); }
    $handle = fopen($path, 'rb');
    if ($handle === false) { exit; }
    fseek($handle, $start);
    $remaining = $end - $start + 1;
    while ($remaining > 0 && ! feof($handle)) {
        $chunk = fread($handle, min(1024 * 1024, $remaining));
        if ($chunk === false || $chunk === '') { break; }
        echo $chunk;
        $remaining -= strlen($chunk);
        flush();
    }
    fclose($handle);
    exit;
}
add_action('wp_head', static function (): void {
    $path = (string) wp_parse_url((string) ($_SERVER['REQUEST_URI'] ?? ''), PHP_URL_PATH);
    if (trailingslashit($path) !== '/sytaya/program/') { return; }
    $config = [
        'api' => untrailingslashit(rest_url('si/v1/sytaya')),
        'nonce' => wp_create_nonce('wp_rest'),
        'login' => wp_login_url(home_url('/sytaya/program/')),
    ];
    echo '<script>window.siSytaya=' . wp_json_encode($config, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) . ';</script>' . "\n";
}, 1);
function si_sytaya_access_profile(WP_User $user): void {
    if (! current_user_can('edit_user', $user->ID)) { return; }
    wp_nonce_field('si_sytaya_access_' . $user->ID, 'si_sytaya_access_nonce');
    echo '<h2>СЫТАЯ</h2><table class="form-table"><tr><th>Доступ к программе</th><td><label><input type="checkbox" name="si_sytaya_access" value="1" ' .
        checked((string) get_user_meta($user->ID, SI_SYTAYA_META_ACCESS, true), '1', false) .
        '> Оплата подтверждена, открыть доступ</label><p class="description">Ручное управление для проверки до подключения платёжного webhook.</p></td></tr></table>';
}
add_action('show_user_profile', 'si_sytaya_access_profile');
add_action('edit_user_profile', 'si_sytaya_access_profile');
function si_sytaya_save_access(int $user_id): void {
    if (! current_user_can('edit_user', $user_id) ||
        ! isset($_POST['si_sytaya_access_nonce']) ||
        ! wp_verify_nonce(sanitize_text_field(wp_unslash((string) $_POST['si_sytaya_access_nonce'])), 'si_sytaya_access_' . $user_id)) {
        return;
    }
    update_user_meta($user_id, SI_SYTAYA_META_ACCESS, isset($_POST['si_sytaya_access']) ? '1' : '0');
}
add_action('personal_options_update', 'si_sytaya_save_access');
add_action('edit_user_profile_update', 'si_sytaya_save_access');
