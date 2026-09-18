const draw = (path: string, delay: number, extra = ''): string =>
  `<path class='signature-line__draw ${extra}' d='${path}' pathLength='100' style='--line-delay:${delay}ms' />`;

export function SignatureArt(): string {
  return `<div class='signature-art signature-art--plate' data-motion-item data-motion-kind='media' aria-hidden='true'><svg viewBox='0 0 440 440' focusable='false'>
    <circle class='signature-line__draw signature-line__draw--main' cx='220' cy='220' r='178' pathLength='100' />
    <circle class='signature-line__draw signature-line__draw--inner' cx='220' cy='220' r='151' pathLength='100' />
    <g class='signature-art__food signature-art__food--first'><path d='M136 165 C160 129 205 134 222 163 C217 200 170 214 140 190 Z' /><path class='signature-art__food-detail' d='M151 179 C172 165 191 166 208 174' /></g>
    <g class='signature-art__food signature-art__food--second'><path d='M245 137 C286 137 315 161 309 198 C275 214 245 193 245 137 Z' /><path class='signature-art__food-detail' d='M262 154 C270 171 281 182 300 190' /></g>
    <g class='signature-art__food signature-art__food--third'><ellipse cx='167' cy='259' rx='52' ry='34' transform='rotate(-22 167 259)' /><ellipse class='signature-art__food-detail' cx='166' cy='259' rx='25' ry='18' transform='rotate(-22 166 259)' /></g>
    <g class='signature-art__food signature-art__food--fourth'><path d='M227 243 C255 213 303 220 326 255 C307 287 264 306 230 282 Z' /><circle class='signature-art__food-detail' cx='262' cy='257' r='5' /><circle class='signature-art__food-detail' cx='285' cy='270' r='4' /><circle class='signature-art__food-detail' cx='304' cy='251' r='4' /></g>
  </svg></div>`;
}

export function SignatureFlourish(): string {
  return `<div class='signature-flourish' aria-hidden='true'><svg viewBox='0 0 260 34' focusable='false'>${draw('M2 25 C58 25 93 25 132 23 C166 21 163 6 188 7 C207 8 211 28 194 29 C184 30 180 20 185 16 C193 9 209 19 258 19', 0)}</svg></div>`;
}

export function SignatureDivider(): string {
  return `<div class='signature-divider-shell' data-motion-group aria-hidden='true'><div class='signature-divider' data-motion-item><svg viewBox='0 0 600 90' focusable='false'>${draw('M3 54 C118 54 177 54 249 52 C295 51 311 24 337 24 C361 24 375 48 356 58 C339 67 328 50 337 40 C351 25 372 57 423 57 C486 57 537 57 597 57', 0)}</svg></div></div>`;
}
