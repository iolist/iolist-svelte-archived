const path = require('path');
const fs = require('fs');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST = path.resolve(__dirname, '/server/public');

const mode = process.env.NODE_ENV || 'development';

const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

module.exports = {
  entry: {
    main: [`${SRC_DIR}/main.js`]
  },

  output: {
    path: DIST,
    publicPath: '/',
    filename: 'js/[name].[hash:8].js',
  },

  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'node_modules')].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
    ),
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },

  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: 'svelte-loader'
      },
      // {
      //     test: /\.js$/,
      //     exclude: /(node_modules)/,
      //     loader: require.resolve('babel-loader'),
      //     // options: { cacheDirectory: true },
      // },
      {
        test: /\.css$/,
        use: [
          /**
                 * MiniCssExtractPlugin doesn't support HMR.
                 * For developing, use 'style-loader' instead.
                 * */
          mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(bmp|gif|jpe?g|png|svg)$/,
        loader: require.resolve('file-loader'),
        options: {
          limit: 10000,
          name: 'assets/images/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|otf|ttf|eot)$/,
        loader: require.resolve('file-loader'),
        options: {
          limit: 10000,
          name: 'assets/fonts/[name].[hash:8].[ext]',
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        }
      },
    },
  },

  devtool: mode === 'production' ? false : 'source-map',

  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '.svelte.env'),
      systemvars: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      // chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      title: 'LoList',
      favicon: 'src/assets/favicons/favicon.ico',
      filename: 'main.html',
      meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
      chunks: ['vendor', 'main'],
    }),
    new CleanWebpackPlugin(),
    new LiveReloadPlugin()
  ],
};
