var koa = require('koa');
var router = require('koa-router')();
var serve = require('koa-static');
var mongoose = require('mongoose');
var db = require('./db.js');
// var websockify = require('koa-websocket');


// var app = websockify(koa());
var app = koa();

app.use(serve('static'));

router.get('/ch-friends', function *(next) {
	var a = [];
	var friends = yield db.User.find().exec();
	for(var i = 0; i < friends.length; i++) {
		a.push({
			channel: parseInt(Math.random()*50) + 21,
			username: friends[i].name
		});
	};
	this.body = JSON.stringify(a);
});

router.get('/ch-hot', function *(next) {
	var a = [];
	for (var i = 21; i < 68; i++) {
		a.push({
			channel: i,
			pop: parseInt(Math.random()*100)+10
		});
	};
	this.body = a
});

router.get('/statistic', function *(next) {
	var good = [], fuck = [];
	for (var i = 0; i < 623; i++) {
		var time = parseInt(Math.random()*590);
		if(Math.random() > 0.5) {
			good.push(time);
		}
		else {
			fuck.push(time);
		}
	}
	good.sort(function(a, b) {return a-b});
	fuck.sort(function(a, b) {return a-b});
	this.body = JSON.stringify({'good': good, 'fuck': fuck});
});




app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);

