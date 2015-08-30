chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		// ----------------------------------------------------------
		console.debug("Chrome Extension -> Xplug triggered");
        
        var l_script   = document.createElement("script");
        l_script.type  = "text/javascript";
        l_script.src   = chrome.runtime.getURL('/js/xplug.js');
        
        document.body.appendChild(l_script);    // Inject javascript code into the DOM
	}
	}, 10);
});