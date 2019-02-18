const templateConfig = require('./template.config');

module.exports = Object.assign({}, templateConfig, {
  configureWebpack(config, isServer) {
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const tailwindConfig = require('./tailwind.js');
    const precss = require('precss');
    const cssFilename = process.env.NODE_ENV === 'development' ?
          'client.build.css' :
          'client.build.[hash].css';
    return {
      module: {
        rules: [
          {
            test: /\.scss$|\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false,
                  plugins: [
                    require('tailwindcss')(tailwindConfig),
                    precss(),
                  ],
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: cssFilename,
        }),
      ],
    };
  },
});
