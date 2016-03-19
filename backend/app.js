var koa = require('koa');
var router = require('koa-router')();
var route = require('koa-route');
var serve = require('koa-static');
var mongoose = require('mongoose');
var db = require('./db.js');
var websockify = require('koa-websocket');

var events = require('events');
var emitter = new events.EventEmitter();


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


websockets = [];
var CHANNEL_NUMBER = 200
for (var i = 1; i <= CHANNEL_NUMBER; i++) {
	websockets[i] = [];
}

emitter.on("online", function(number) {
	for (var j = 0; j < websockets[number].length; j++) {
		websockets[number][j].socket.send(JSON.stringify({"cmd": "pop", "number": websockets[number].length}))
	}
})

emitter.on("offline", function(number) {
	for (var j = 0; j < websockets[number].length; j++) {
		websockets[number][j].socket.send(JSON.stringify({"cmd": "pop", "number": websockets[number].length}))
	}
})

emitter.on("command", function(number, message) {
	for (var j = 0; j < websockets[number].length; j++) {
		websockets[number][j].socket.send(message);
	}
})

app.ws.use(route.all('/channel/:number', function* (number, next) {
	var number_int = parseInt(number);

	var index = Math.random();
	websockets[number_int].push({socket: this.websocket, index: index});

	console.log(websockets[number_int].length);

	emitter.emit("online", number_int);

	var that = this;
	this.websocket.on('message', function(message) {
		emitter.emit("command", number_int, message);
		console.log(message);
	});
	this.websocket.on('close', function(message) {
		var target;
		for (var i = 0; i < websockets[number_int].length; i++) {
			if (websockets[number_int][i].index == index) {
				target = i;
			}
		}
		websockets[number_int].splice(target, 1);
		
		emitter.emit('offline', number_int);
	});
}));

app.listen(3000);

