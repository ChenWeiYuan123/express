module.exports = {
	entry:{
		app:'./static/js/app.js'
	},
	output:{
		path:"./dist",
		filename:"[name].js"  
	},
	module:{
		loader:[
			{ test: /\.vue$/,loader: 'vue' }
		]
	}
}