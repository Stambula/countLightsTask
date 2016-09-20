var path = require('path');



module.exports = {
	context: path.resolve('js'),
	entry: './script.es6',
	output: {
		filename: './bundle.js'
	},

	watch: true,


	module: {
		loaders:[
			{
				test: /\.es6$/,
				exclude: /node_modules/,
				loader:"babel-loader",
				query: {
			        presets: ['es2015']
			     }
			}
		]
	},

	resolve:{
		extensions: ['', '.js', '.es6']
	}
}