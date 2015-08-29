var webpack = require('webpack');

var svgoConfig = JSON.stringify({
  plugins: [
    {removeTitle: true},
    {convertColors: {shorthex: false}},
    {convertPathData: false}
  ]
});

module.exports = {
	entry: "./app/components/Main.js",
	output: {
		filename: "public/bundle.js"
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			},
			{
				test: /\.scss?$/,
				loader: 'style!css!autoprefixer-loader!sass'
			},
			{
				test: /\.css?$/,
				loader: 'style!css'
			}
		]
	},
	plugins: [
		// otherwise it will bundle all the moment locales
    	new webpack.ContextReplacementPlugin(/.*$/, /NEVER_MATCH^/)
    ]
};