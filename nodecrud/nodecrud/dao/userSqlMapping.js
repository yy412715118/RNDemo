// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
	insert:'INSERT INTO user( name, age) VALUES(?,?)',
	update:'update user set name=?, age=? where id=?',
	delete: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryAll: 'select * from user',
	login:'select * from user where name=? AND age=?',

};

module.exports = user;