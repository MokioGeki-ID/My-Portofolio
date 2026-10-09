// Warna mengacu ke CSS variables agar mudah diganti
export default { content: ['./index.html', './src/**/*.{js,jsx}'], corePlugins: { preflight: false },
  theme: { extend: { colors: { cyan: 'var(--cyan)', ice: 'var(--ice)', silver: 'var(--silver)', charcoal: 'var(--charcoal)', midnight: 'var(--midnight)' } } } };
