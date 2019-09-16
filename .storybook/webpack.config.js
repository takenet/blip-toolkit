const path = require('path');

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.s[ac]ss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });

  config.resolve.alias = {
    ...config.resolve.alias,
    '@component': path.resolve(__dirname, '../src/components/component.js'),
    "@lib": path.resolve(__dirname, "../src/lib"),
  };

  return config;
};
