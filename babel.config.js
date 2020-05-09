const path = require('path')

const paths = {
  _assets: path.resolve(__dirname, 'app/assets'),
  _components: path.resolve(__dirname, 'app/components'),
  _configs: path.resolve(__dirname, 'app/configs'),
  _navigations: path.resolve(__dirname, 'app/navigations'),
  _views: path.resolve(__dirname, 'app/views'),
  _services: path.resolve(__dirname, 'app/services'),
  _styles: path.resolve(__dirname, 'app/styles'),
}

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./app"],
          extensions: [
            ".js",
            ".ios.js",
            ".android.js"
          ],
          alias: paths
        }
      ]
    ]
  };
};
