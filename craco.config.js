// craco.config.js
module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.module.rules.push({
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: /node_modules/,
        });
  
        webpackConfig.ignoreWarnings = [
          (warning) => {
            return warning.message.includes('Failed to parse source map from') &&
                   warning.message.includes('cosmjs-types/tendermint/types/params.js');
          },
        ];
  
        return webpackConfig;
      },
    },
  };
  