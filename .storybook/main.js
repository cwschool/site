
const path = require("path")
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
        }
      }
    },
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  webpackFinal: async (config) => {
    // fonts
    config.plugins.push(
      new CopyWebpackPlugin({patterns: [
        {
          from: path.resolve(__dirname, '../fonts/baar-philos'),
          to: 'fonts/Baar-Philos'
        },
      ]}),
    );

    return config;
  },
}
