var express = require('express');
var exApp = express();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended:false})
var auth = require('./lib/db.js').auth
var renderer = require("vue-server-renderer").createRenderer()
var fs = require('fs')
global.Vue = require('vue')
exApp.set("views",'./views')
exApp.set('view engine','jade')
exApp.use(express.static('static'));
var layout = fs.readFileSync('./index.html','utf8')

var tpl = fs.readFileSync('./views/index.html','utf8')
console.log(tpl)
exApp.get('/',function(req,res){
	// res.sendFile(__dirname+'/'+'index.html')
	renderer.renderToString(require('./static/js/app.js')(layout,{username:'admin',password:"admin"}),function(err,html){
		if(err){
			console.log(err)
			return res.send('err')
		}
		// console.log(html)
		res.send(html)
	})
})

exApp.post('/login',urlencodedParser,function(req,res){
	user = {
		username:req.body.username,
		password:req.body.password
	}
	auth(user,function(data){
		if(!data){
			res.end('用户不存在')
		}else if(user.password != data.password){
			res.end('密码错误')
		}else{
			res.render('userinfo',data)
			// res.end(JSON.stringify(data))
		}
	})
})
var server = exApp.listen(8888,function(){
	var host = server.address().address
	var port = server.address().port
	console.log("服务器 -",server.address())
})
