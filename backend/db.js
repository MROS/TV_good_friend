mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TVGFriend');

var userSchema = mongoose.Schema({
	id: String,
	passwd: String,
	name: String,
	online: Boolean,
	channel: Number
});

userSchema.methods.allFriendsChannels = function(argument) {

}
//userOnlineSchema.methods.leave //notify all friends

var friendshipSchema = mongoose.Schema({
	userid1: String,
	userid2: String,
	duration: Number //多常看一樣的頻道
});

var goodSchema = mongoose.Schema({
	time: Date,
	channel: Number
});

var fuckSchema = mongoose.Schema({
	time: Date,
	channel: Number
});

var User = mongoose.model('User', userSchema);
var Friendship = mongoose.model('Friendship', friendshipSchema);
var Good = mongoose.model('Good', goodSchema);
var Fuck = mongoose.model('Fuck', fuckSchema);
