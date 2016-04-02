var os = require('os')
var argv = require('minimist')(process.argv.slice(2));
var mongoose = require('mongoose');
var db = mongoose.connection;

var dict = {};
var commands = [];

function add(command, title) {
	var item = {'command': command, 'status':'active'};
	if (title != undefined) {
		commands.push(item);
		return
	}
	dict[title] = item;
}

// Return list of known commands
function status(){

}

function start(){
	var command = argv["add"];
	if command != '' {
		add(command, argv["title"]);
	}
	var status = argv["status"]
	if(status) {
		console.log(status);
	}
}

function connect() {
	mongoose.connect('mongodb://localhost/redwatcher');
}

start()