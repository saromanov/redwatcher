var os = require('os')
var argv = require('minimist')(process.argv.slice(2));
var mongoose = require('mongoose');
var db = mongoose.connection;

function add() {

}

// Return list of known commands
function status(){

}

function start(){
	var command = argv["add"];

	var status = argv["status"]
	if(status) {
		console.log(status);
	}
}

function connect() {
	mongoose.connect('mongodb://localhost/redwatcher');
}

start()