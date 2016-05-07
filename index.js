var os = require('os')
var argv = require('minimist')(process.argv.slice(2));
var mongoose = require('mongoose');
var db = mongoose.connection;
require('shelljs/global');
var Schema = mongoose.Schema;


var itemSchema = new Schema({
	command: String,
	hostname: String,
	created_at:Date,
});

itemSchema.pre('save', function(next){
		var current = new Date();
		this.created_at = new Date();
		this.hostname = os.hostname();
		next();
});


var Command = mongoose.model('Command', itemSchema);

var dict = {};
var commands = [];

function add(command, title) {
	var item = {'command': command, 'status':'active'};
	if (title != undefined) {
		commands.push(item);
		return
	}

	console.log(command)
	var pts = new Command({
		command: command
	});

	pts.save(function(err){
		if(err) throw err;
	});
	dict[title] = item;
	var result = exec(command + "&", {async:true, silent:true});
	console.log(result.pid);
}

// Return list of known commands
function statusCommand(command){
	Command.find({}, function(err, commands){
		if(err !== null) throw err;

		commands.forEach(function(x){
			console.log(x.command);
		});
	});
}

function removeCommand(command) {
	Command.find({command: command}, function(err, comm){
		if(err) throw err;
		Command.remove({command: command}, function(err){
			if(err) throw err;
		});
	});
}

function start(){
	var command = argv["add"];
	if (command != '' && command !== undefined) {
		add(command, argv["title"]);
	}
	var status = argv["status"];
	if(status !== undefined) {
		statusCommand(status);
	}

	var del = argv["remove"]
	if(del !== undefined) {
		removeCommand(del);
	}
}

function connect() {
	mongoose.connect('mongodb://localhost/redwatcher');
}


connect();
start()