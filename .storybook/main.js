
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
  /*   {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
        }
      }
    }, */
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

    config.plugins.push(
      new CopyWebpackPlugin({patterns: [
        {
          from: path.resolve(__dirname, '../fonts/antropos'),
          to: 'fonts/Antropos'
        },
      ]}),
    );

// Prevent webpack from using Storybook CSS rules to process CSS modules
// config.module.rules.find(
//   (rule) => rule.test.toString() === "/\\.css$/"
// ).exclude = /\.module\.scss$/;

// Tell webpack what to do with CSS modules
config.module.rules.push({
  test: /\.module\.scss$/,
  include: path.resolve(__dirname, "../src"),
  use: [
    {
      loader: 'style-loader',
      options: {
        esModule: true,
      },
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        esModule: true,
        modules: {
          namedExport: true,
          localIdentName: '[name]__[local]--[hash:base64:5]',
        },
      },
    },
    {
      loader: 'sass-loader',
    }
  ],
});

    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
    // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    config.module.rules[0].use[0].options.plugins.push(
      require.resolve("babel-plugin-remove-graphql-queries")
    )

    return config;
  },
}
