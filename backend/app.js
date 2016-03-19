var koa = require('koa');
var router = require('koa-router')();
var route = require('koa-route');
var serve = require('koa-static');
var mongoose = require('mongoose');
var db = require('./db.js');
var websockify = require('koa-websocket');


var app = websockify(koa());
// var app = koa();

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
	for (var i = 0; i < 631; i++) {
		var time = parseInt(Math.random()*580);
		if(Math.random() > 0.45) {
			good.push(parseInt(time/1.1));
		}
		else {
			fuck.push(parseInt(time/1.4));
		}
	}
	good.sort(function(a, b) {return a-b});
	fuck.sort(function(a, b) {return a-b});
	this.body = JSON.stringify({'good': good, 'fuck': fuck});
});

app.use(router.routes()).use(router.allowedMethods());

app.ws.use(route.all('/ws', function* (next) {
	this.websocket.send('Hello World');
	var that = this;
	this.websocket.on('message', function(message) {
		that.websocket.send(message);
	});
	// yielding `next` will pass the context (this) on to the next ws middleware 
	yield next;
}));

app.listen(3000);

