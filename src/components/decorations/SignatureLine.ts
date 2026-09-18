type SignatureVariant = 'plate' | 'body' | 'journey';

const draw = (path: string, delay: number, extra = ''): string =>
  `<path class='signature-line__draw ${extra}' d='${path}' pathLength='100' style='--line-delay:${delay}ms' />`;

export function SignatureArt(variant: SignatureVariant): string {
  if (variant === 'plate') return `<div class='signature-art signature-art--plate' data-motion-item data-motion-kind='media' aria-hidden='true'><svg viewBox='0 0 440 440' focusable='false'>
    <circle class='signature-line__draw signature-line__draw--main' cx='220' cy='220' r='178' pathLength='100' />
    <circle class='signature-line__draw signature-line__draw--inner' cx='220' cy='220' r='151' pathLength='100' />
    ${draw('M78 112 C46 105 43 72 69 63 C91 56 109 78 93 93 C83 101 73 92 78 82', 520, 'signature-line__curl')}
    <g class='signature-art__food signature-art__food--first'><path d='M136 165 C160 129 205 134 222 163 C217 200 170 214 140 190 Z' /><path class='signature-art__food-detail' d='M151 179 C172 165 191 166 208 174' /></g>
    <g class='signature-art__food signature-art__food--second'><path d='M245 137 C286 137 315 161 309 198 C275 214 245 193 245 137 Z' /><path class='signature-art__food-detail' d='M262 154 C270 171 281 182 300 190' /></g>
    <g class='signature-art__food signature-art__food--third'><ellipse cx='167' cy='259' rx='52' ry='34' transform='rotate(-22 167 259)' /><ellipse class='signature-art__food-detail' cx='166' cy='259' rx='25' ry='18' transform='rotate(-22 166 259)' /></g>
    <g class='signature-art__food signature-art__food--fourth'><path d='M227 243 C255 213 303 220 326 255 C307 287 264 306 230 282 Z' /><circle class='signature-art__food-detail' cx='262' cy='257' r='5' /><circle class='signature-art__food-detail' cx='285' cy='270' r='4' /><circle class='signature-art__food-detail' cx='304' cy='251' r='4' /></g>
  </svg></div>`;

  if (variant === 'body') return `<div class='signature-art signature-art--body' data-motion-item aria-hidden='true'><svg viewBox='0 0 330 145' focusable='false'>
    ${draw('M33 17 C51 39 90 28 112 50 C131 69 120 103 104 131', 0)}
    ${draw('M297 17 C279 39 240 28 218 50 C199 69 210 103 226 131', 170)}
    ${draw('M165 28 C156 49 155 64 165 77 C175 91 174 105 165 125', 350, 'signature-line__spine')}
    <circle class='signature-art__point signature-art__point--one' cx='165' cy='34' r='4' /><circle class='signature-art__point signature-art__point--two' cx='165' cy='77' r='4' /><circle class='signature-art__point signature-art__point--three' cx='165' cy='123' r='4' />
  </svg></div>`;

  return `<div class='signature-art signature-art--journey' data-motion-item data-motion-kind='media' aria-hidden='true'><svg viewBox='0 0 420 420' focusable='false'>
    ${draw('M36 352 C79 342 111 316 124 285 C139 251 107 213 126 186 C149 152 207 178 230 144 C260 101 295 69 382 48', 0, 'signature-line__journey')}
    <circle class='signature-art__halo' cx='124' cy='285' r='38' /><circle class='signature-art__halo' cx='173' cy='169' r='38' /><circle class='signature-art__halo' cx='296' cy='69' r='38' />
    ${[[48,348],[66,338],[83,327],[99,311],[114,294],[129,264],[130,240],[123,216],[125,189],[149,169],[181,168],[211,160]].map(([x,y], index) => `<circle class='signature-art__waypoint' cx='${x}' cy='${y}' r='2.8' style='--point-delay:${420 + index * 55}ms' />`).join('')}
    <circle class='signature-art__milestone' cx='124' cy='285' r='6' /><circle class='signature-art__milestone' cx='173' cy='169' r='6' /><circle class='signature-art__milestone' cx='296' cy='69' r='6' />
  </svg></div>`;
}

export function SignatureFlourish(): string {
  return `<div class='signature-flourish' aria-hidden='true'><svg viewBox='0 0 260 34' focusable='false'>${draw('M2 25 C58 25 93 25 132 23 C166 21 163 6 188 7 C207 8 211 28 194 29 C184 30 180 20 185 16 C193 9 209 19 258 19', 0)}</svg></div>`;
}

export function SignatureDivider(): string {
  return `<div class='signature-divider-shell' data-motion-group aria-hidden='true'><div class='signature-divider' data-motion-item><svg viewBox='0 0 600 90' focusable='false'>${draw('M3 54 C118 54 177 54 249 52 C295 51 311 24 337 24 C361 24 375 48 356 58 C339 67 328 50 337 40 C351 25 372 57 423 57 C486 57 537 57 597 57', 0)}</svg></div></div>`;
}
