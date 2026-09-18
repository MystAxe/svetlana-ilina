<?php
declare(strict_types=1);
define('ABSPATH', __DIR__ . '/');
final class WP_REST_Server { public const READABLE='GET'; public const CREATABLE='POST'; }
final class WP_Error { public function __construct(public string $code, public string $message, public array $data) {} }
final class WP_REST_Request {
    public function __construct(private array $params) {}
    public function get_param(string $key) { return $this->params[$key] ?? null; }
}
$GLOBALS['test_user'] = 17;
$GLOBALS['test_admin'] = false;
$GLOBALS['test_meta'] = [];
function add_action(...$args): void {}
function register_rest_route(...$args): void {}
function rest_ensure_response($value) { return $value; }
function get_current_user_id(): int { return $GLOBALS['test_user']; }
function current_user_can(string $cap): bool { return $GLOBALS['test_admin']; }
function get_user_meta(int $user, string $key, bool $single = true) { return $GLOBALS['test_meta'][$user][$key] ?? ''; }
function update_user_meta(int $user, string $key, $value): void { $GLOBALS['test_meta'][$user][$key] = $value; }
function sanitize_text_field(string $value): string { return trim(strip_tags($value)); }
function sanitize_textarea_field(string $value): string { return trim(strip_tags($value)); }
require dirname(__DIR__) . '/wordpress/mu-plugins/svetlana-sytaya.php';
function check(bool $condition, string $message): void { if (! $condition) { throw new RuntimeException($message); } }
check(!si_sytaya_has_access(), 'Guest access should be denied');
$GLOBALS['test_meta'][17][SI_SYTAYA_META_ACCESS] = '1';
check(si_sytaya_has_access(), 'Paid access should be granted');
$save = static fn (string $screen, array $answers, bool $complete) =>
    si_sytaya_save_state(new WP_REST_Request(['screen'=>$screen,'answers'=>$answers,'complete'=>$complete,'mealCount'=>2]));
$early = $save('day2', [], true);
check($early instanceof WP_Error && $early->data['status'] === 409, 'Days must complete in order');
$missing = $save('before', ['hunger'=>'8'], true);
check($missing instanceof WP_Error && $missing->data['status'] === 400, 'Before test needs four scales');
$before = $save('before', ['hunger'=>'8','sweet'=>'7','energy'=>'4','calm'=>'3','note'=>'<script>alert(1)</script>'], true);
check($before['screens']['before']['complete'] === true, 'Before test was not saved');
check($before['screens']['before']['answers']['note'] === 'alert(1)', 'Text was not sanitized');
for ($day=1; $day<=5; $day++) {
    $result = $save('day'.$day, ['hunger'=>'5'], true);
    check(!($result instanceof WP_Error) && $result['screens']['day'.$day]['complete'] === true, 'Day '.$day.' failed');
}
$few = $save('day6', ['assemblies'=>['a','b']], true);
check($few instanceof WP_Error && $few->data['status'] === 400, 'Day 6 must require three assemblies');
$day6 = $save('day6', ['assemblies'=>['a','b','c']], true);
check($day6['screens']['day6']['complete'] === true, 'Day 6 failed');
$day7 = $save('day7', ['hunger'=>'3','sweet'=>'4','energy'=>'7','calm'=>'8'], true);
check($day7['screens']['day7']['complete'] === true, 'Day 7 failed');
$GLOBALS['test_meta'][17][SI_SYTAYA_META_ACCESS] = '0';
check(!si_sytaya_has_access(), 'Revoked access should be denied');
echo "Sytaya access and progress checks passed\n";
