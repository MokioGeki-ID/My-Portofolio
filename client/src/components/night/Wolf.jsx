// Siluet serigala melolong (bentuk dipakai ulang oleh HeroScene)
export const WOLF_D = 'M40 300C30 282 34 250 50 232C62 218 78 200 86 180C92 166 94 150 98 138C100 118 106 96 114 80L116.6 70.5L109.1 60.1L86.8 44.2L115.8 45.9L121.9 40.5L141.9 19.0L150.6 9.0L155.3 8.7L157.4 12.9L149.2 32.2L167.3 21.7L158.8 46.8L148.4 64.8L136.3 72.8L143 80L135 82L142 92L134 95L141 106L134 110C138 124 144 150 140 176C136 196 134 236 133 272L134 296C136 302 148 302 152 300H40Z';
export const TAIL_D = 'M44 292C22 296 6 284 4 262C4 250 10 244 14 242C14 262 26 276 48 280Z';
// Serigala di batu kecil (untuk loader), hitam pekat dengan rim cahaya cyan
export default function Wolf({ size = 180 }) {
  return (
    <svg aria-hidden="true" className="wolf-glow" width={size} viewBox="-10 0 225 320" fill="#000">
      <path d="M-10 320V304Q40 298 90 302Q150 296 215 306V320Z" />
      <path d={TAIL_D} />
      <path d={WOLF_D} />
    </svg>
  );
}
