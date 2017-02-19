chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
  	if (document.readyState === "complete") {
  		clearInterval(readyStateCheckInterval);

  		// ----------------------------------------------------------
  		// This part of the script triggers when page is done loading
  		// ----------------------------------------------------------
  		console.debug("Chrome Extension -> Xplug triggered");

      var l_div = document.createElement('div');
      l_div.setAttribute('id','XPLUG_SETTINGS');
      l_div.setAttribute('xplug-background',chrome.runtime.getURL('/resources/grid_4k_3840_2160_dark.png'));
      l_div.setAttribute('xplug-theme1',chrome.runtime.getURL('/resources/themes/theme_clean_ui.json'));
      l_div.setAttribute('xplug-theme2',chrome.runtime.getURL('/resources/themes/theme_moonlight.json'));

      document.body.appendChild(l_div);

  		// ----------------------------------------------------------
  		// Inject Xplug into page
  		// ----------------------------------------------------------
         var oScript   = document.createElement("script");
         oScript.type  = "text/javascript";
         oScript.src   = chrome.runtime.getURL('/js/xplug.js');
         document.body.appendChild(oScript);


  		// ----------------------------------------------------------
  		// Inject marked (Markdown parser) into page
  		// ----------------------------------------------------------
         oScript       = document.createElement("script");
         oScript.type  = "text/javascript";
         oScript.src   = chrome.runtime.getURL('/lib/marked.min.js');
         document.body.appendChild(oScript);

      // ----------------------------------------------------------
    	// Inject XSS scanner into page
      // ----------------------------------------------------------
         oScript       = document.createElement("script");
         oScript.type  = "text/javascript";
         oScript.src   = chrome.runtime.getURL('/lib/xss.min.js');
         document.body.appendChild(oScript);

    }
	}, 10);
});
