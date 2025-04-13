module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    'postcss-custom-media': {},
    '@csstools/postcss-global-data': {},
    'tailwindcss': {},
    'autoprefixer': {},
  },
} 