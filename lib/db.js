var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'119.29.88.175',
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
