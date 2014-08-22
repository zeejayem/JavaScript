var fbase = new Firebase('https://brilliant-fire-450.firebaseio.com/Chats');
var userFbase = new Firebase('https://brilliant-fire-450.firebaseio.com/Users');
var chatQuery = fbase.limit(5);

var input = $('#input');
var loginModal = $('#loginModal');
var activeUsers = {};

chatQuery.on('value', function(chatObj) {
	var output = $('#output');
	output.empty();
	var chats = chatObj.val();
	var chatString = '';
	$.each(chats, function() {
		chatString += this + ' <br> ';
	});
	output.append(emotify(chatString));
});

userFbase.on('value', function(userObj) {
	activeUsers = {};
	var users = $('#users');
	users.empty();
	var chatString = '';
	userObj.forEach(function(childObj) {
		activeUsers[childObj.val()] = childObj.ref();
		chatString += childObj.val() + '<br>';
	});
	users.append(chatString);
});

function sendChat(msg) {
	fbase.push(window.localStorage.username + ': ' + msg);
}

function inputSend() {
	var newChat = input.val();
	if(newChat) {
		input.val('');
		sendChat(newChat);
	}
}

input.keypress(function(ev) {
	if(ev.which == 13)
		inputSend();
});

function init() {
	var username = window.localStorage.username;
	if(!username) {
		loginModal.modal({backdrop: 'static'});
	}
	$('#loggedInAs').text('Logged in as ' + username);
}

function login() {
	var username = $('#username').val();
	if(username) {
		$('#username').val('');
		window.localStorage.username = username;
		loginModal.modal('hide');
		$('#loggedInAs').text('Logged in as ' + username);
		userFbase.push(username);
	}
}

function logout() {
	activeUsers[window.localStorage.username].remove();
	window.localStorage.username = '';
	loginModal.modal({backdrop: 'static'});
}

init();