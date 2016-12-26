var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended:false})
var auth = require('./lib/db.js').auth
app.set("views",'./views')
app.set('view engine','jade')
app.get('/',function(req,res){
	res.sendFile(__dirname+'/'+'index.html')
})
app.use(express.static('static'));
app.post('/login',urlencodedParser,function(req,res){
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
var server = app.listen(8888,function(){
	var host = server.address().address
	var port = server.address().port
	console.log("服务器 -",server.address())
})