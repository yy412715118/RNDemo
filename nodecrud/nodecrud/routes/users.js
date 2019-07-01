var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
	userDao.login(req, res, next);
  });

// 增加用户
//TODO 同时支持get,post
router.post('/addUser', function(req, res, next) {
	userDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
	userDao.queryAll(req, res, next);
});

router.get('/query', function(req, res, next) {
	userDao.queryById(req, res, next);
});

router.delete('/deleteUser', function(req, res, next) {
	userDao.delete(req, res, next);
});

router.post('/updateUser', function(req, res, next) {
	userDao.update(req, res, next);
});

module.exports = router;