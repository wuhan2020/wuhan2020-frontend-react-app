'use strict';
const path = require("path");
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require("./webpack.base.conf");
const WebpackCdnPlugin = require("webpack-cdn-plugin");

const webpackConfig = merge(baseConfig, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, '..', 'wwwroot/dist'),
		filename: './static/js/app.bundle.[hash].js',
		chunkFilename: './static/js/[id].[chunkhash].js',
		publicPath: process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '',
	},
	plugins: [
		...baseConfig.plugins,
		new MiniCssExtractPlugin({
			filename: './static/css/[name].[hash].css',
			chunkFilename: './static/css/[id].[chunkhash].css',
		}),
		new WebpackCdnPlugin({
			modules: [
				{ name: 'echarts', var: 'echarts', path: 'dist/echarts.min.js' },
				{ name: 'moment', var: 'moment', path: 'min/moment.min.js' },
				{ name: 'react', var: 'React', path: `umd/react.production.min.js` },
				{ name: 'react-dom', var: 'ReactDOM', path: `umd/react-dom.production.min.js` },
			],
			publicPath: '/node_modules'
		})
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			name: true,
			cacheGroups: {
				vendors: {
					enforce: true,
					test: /node_modules/,
					name: 'vendor',
					filename: './static/js/[name].[hash].js',
					priority: -10,
				},
			},
		},
	},
});

module.exports = webpackConfig;