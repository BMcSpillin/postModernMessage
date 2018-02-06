//Parent page script

// Global access to an array of all iframes present on site 
var chatWindows = document.getElementsByTagName("iframe");

// postMessage: Listen for dispatched messages
window.addEventListener("message", receiveMessage, false);

// Then distribute those messages
function receiveMessage(event) {
  for (i = 0; i < chatWindows.length; i++) {
  	chatWindows[i].contentWindow.postMessage(event.data, "*");
  }
}

// Create new chat frame
var addChat = function() {

	// Create the iframe and set attributes
	var newChat = document.createElement("iframe");

	document.body.appendChild(newChat);
		newChat.id = "window-" + chatWindows.length;
		newChat.className = "window";

	// Create iframe nested elements and set attributes
	var chatWindow = newChat.contentDocument;

	var input = chatWindow.createElement("input");
		input.setAttribute("name",chatWindows.length);
	var button = chatWindow.createElement("button");
		button.innerHTML = "Send";
		button.id = "send";
		button.setAttribute("onclick","sendMessage();")
	var script = chatWindow.createElement("script");
		script.setAttribute("src","childScript.js");
	var style = chatWindow.createElement("link");
		style.setAttribute("rel","stylesheet");
		style.setAttribute("href","styles.css");

	// Add elements to new frame
	chatWindow.head.appendChild(script);
	chatWindow.head.appendChild(style);
	chatWindow.body.appendChild(input);
	chatWindow.body.appendChild(button);

	// Alert other frames to new frame
	for (i = 0; i < chatWindows.length; i++) {
  	chatWindows[i].contentWindow.postMessage("User " + chatWindows.length + " has joined.", "*");
  }
}
