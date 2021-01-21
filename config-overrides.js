const { override, addLessLoader, addBabelPreset } = require('customize-cra');

const customOverrides = (config) => config;

module.exports = override(
  addBabelPreset([
    '@emotion/babel-preset-css-prop',
  ]),
  customOverrides,
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    },
  }),
);
