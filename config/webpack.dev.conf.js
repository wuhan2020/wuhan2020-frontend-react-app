'use strict';
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require("./webpack.base.conf");

module.exports = {
	...baseConfig,
	devServer: {
		contentBase: path.join(__dirname, '..', 'wwwroot/dist/'),
		compress: true,
		historyApiFallback: true,
		hot: true,
		// disableHostCheck: true,
		port: 3001
	},
	plugins: [
		...baseConfig.plugins,
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
	]
}