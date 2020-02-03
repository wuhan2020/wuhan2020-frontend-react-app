'use strict';
const path = require("path");
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tsImportPluginFactory = require('ts-import-plugin')

const DEV = process.env.NODE_ENV === "development";

function resolve(dir)
{
	return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: DEV ? {
		'app': [
			'webpack-dev-server/client?http://localhost:3001',
			path.resolve(__dirname, '..', 'src/boot-client.tsx'),
		]
	} : {
			'app': path.resolve(__dirname, '..', 'src/boot-client.tsx'),
		},
	mode: DEV ? 'development' : 'production',

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
	output: {
		path: path.resolve(__dirname, '..', 'wwwroot/dist'),
		// filename: DEV ? 'app.bundle.js' : 'app.[hash].js'
		filename: DEV ? 'app.bundle.js' : 'app.js',
		publicPath: '/',
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: DEV ? 'inline-eval-cheap-source-map' : "source-map",

	optimization: {
		splitChunks: {
			chunks: 'all',
			name: true,
			cacheGroups: {
				vendors: {
					enforce: true,
					test: /node_modules/,
					name: 'vendor',
					filename: DEV ? '[name].bundle.js' : '[name].[hash].js',
					priority: -10
				},
			}
		}
	},
	node: {
		// Resolve node module use of fs
		fs: 'empty'
	},
	resolve: {
		modules: [
			"node_modules",
		],
		extensions: ['.js', '.tsx', '.json', '.ts', '.scss'],
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}, {
				test: /\.(png|gif|jpg|jpeg|xml|ico)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'static/img/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "ts-loader",
						options: {
							silent: true,
							transpileOnly: !DEV,
							getCustomTransformers: () => ({
								before: [tsImportPluginFactory({
									libraryName: 'antd',
									libraryDirectory: 'lib',
									style: 'css'
								})]
							}),
						}
					}
				]
			},
			{
				test: /\.scss$/,
				exclude: [
					/node_modules/,
				],
				oneOf: [
					{
						test: /\.module\.scss$/,
						use: [
							MiniCssExtractPlugin.loader,
							{
								loader: "css-loader",
								options: {
									modules: {
										localIdentName: '[path][name]__[local]--[hash:base64:5]',
									},
									sourceMap: DEV,
								}
							},
							{
								loader: "sass-loader",
								options: {
									sourceMap: DEV,
								}
							},
						]
					},
					{
						use: [
							MiniCssExtractPlugin.loader,
							{
								loader: "css-loader",
								options: {
									sourceMap: DEV,
								}
							},
							{
								loader: "sass-loader",
								options: {
									sourceMap: DEV,
								}
							},
						],
					}
				],
			},
			{
				test: /\.js$/, // /\.(js|jsx|mjs)$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test')]
			},
			{
				test: /\.svg$/,
				use: [
					'svg-react-loader'
				]
			},
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			// 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '..', 'wwwroot/template.html'),
		}),
	]
};