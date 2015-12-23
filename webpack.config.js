var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

var common = {
	entry: PATHS.app,
	/*
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},*/
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
		{
			test: /\.css$/,
			loader: 'style!css',
			include: PATHS.app
		},
		{
			test: /\.jsx?$/,
			loader: 'babel',
			include: PATHS.app
		}
		]
	},
	
	plugins: [
	new HtmlwebpackPlugin({
		title: 'Kanban app'
	})
	]
};

if( TARGET === 'start' || !TARGET ) {
	module.exports = merge(common, {
		devtool: 'eval-source-map',
		devServer: {
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,
			stats: 'error-only',
			host: process.env.HOST,
			prot: process.env.PORT
		},
		plugins: [
		new webpack.HotModuleReplacementPlugin(),
		]
	});
}