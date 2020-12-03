const { override, addLessLoader } = require('customize-cra');
const customOverrides = (config) => {
  return config
}

module.exports = override(
  customOverrides,
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    },
  }),
);