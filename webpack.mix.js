let mix = require('laravel-mix');
mix
  .version()
  .setPublicPath('public')
  .js('resources/app/main.js', 'public/js')
  .sourceMaps()
  .webpackConfig({
    module: {
      rules: [
        {
          test: /\.sass$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                indentedSyntax: true
              }
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'resources/app/')
      }
    }
  });
