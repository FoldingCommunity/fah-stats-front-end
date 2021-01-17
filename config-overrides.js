const { override, addLessLoader } = require('customize-cra');

const customOverrides = (config) => config;

module.exports = override(
  customOverrides,
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    },
  }),
);
