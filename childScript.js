// iframes script

// Listen for dispatched messages
window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
	
	var message = document.createTextNode(event.data);
	var newMessage = document.createElement("p");

	newMessage.appendChild(message);

	var input = document.body.getElementsByTagName("input")[0];

	document.body.insertBefore(newMessage, input);

};

var input = document.getElementsByTagName("input")[0];

input.addEventListener("keydown", function(e) {
	if (e.keyCode == 13) {
		sendMessage();
	}
});

var getMessage = function() {
	return input.name + ": " + input.value;
};

var sendMessage = function() {
	if (input.value != '') {
		window.parent.postMessage(getMessage(), "*");
		input.value = '';
	} else {
		var warning = document.createElement("p");
		var blankInput = document.createTextNode("Say what, now?");
			warning.appendChild(blankInput);
			warning.setAttribute("style","font-style: italic;");
		document.body.insertBefore(warning, input);
	}
};