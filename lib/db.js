var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'118.89.49.121',
	user:'root',
	password:'1234',
	port:'3306'
})
connection.connect();
connection.query('use site;')
exports.auth = function(user,callback){
	connection.query('select username,password from user where username = "'+user.username+'";',function(err,row,fields){
		if(err) console.log(err);
		console.log(row)
		callback(row[0])
	})
} 
// connection.end();