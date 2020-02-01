'use strict';
const path = require("path");
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require("./webpack.base.conf");

const webpackConfig = merge(baseConfig, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, '..', 'wwwroot/dist'),
		filename: 'http://q519ubblo.bkt.clouddn.com/static/js/app.bundle.[hash].js',
		chunkFilename: 'http://q519ubblo.bkt.clouddn.com/static/js/[id].[chunkhash].js',
		publicPath: process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '',
	},
	plugins: [
		...baseConfig.plugins,
		new MiniCssExtractPlugin({
			filename: 'http://q519ubblo.bkt.clouddn.com/static/css/[name].[hash].css',
			chunkFilename: 'http://q519ubblo.bkt.clouddn.com/static/css/[id].[chunkhash].css',
		}),
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
					filename: 'http://q519ubblo.bkt.clouddn.com/static/js/[name].[hash].js',
					priority: -10,
				},
			},
		},
	},
});

module.exports = webpackConfig;