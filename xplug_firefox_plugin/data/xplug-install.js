{
  console.debug("Firefox Extension -> Xplug triggered");

  var l_div = document.createElement('div');
  l_div.setAttribute('xplug-background','resource://xplug/ext/images/grid_4k_3840_2160_dark.png');
  document.body.appendChild(l_div);


  // ----------------------------------------------------------
  // Inject Xplug into page
  // ----------------------------------------------------------
     var oScript   = document.createElement("script");
     oScript.type  = "text/javascript";
     oScript.src   = "resource://xplug/ext/js/xplug.js";
     document.body.appendChild(oScript);


  // ----------------------------------------------------------
  // Inject marked (Markdown parser) into page
  // ----------------------------------------------------------
     oScript       = document.createElement("script");
     oScript.type  = "text/javascript";
     oScript.src   = "resource://xplug/ext/lib/marked.min.js";
     document.body.appendChild(oScript);


  // ----------------------------------------------------------
  // Inject XSS scanner into page
  // ----------------------------------------------------------
     oScript       = document.createElement("script");
     oScript.type  = "text/javascript";
     oScript.src   = "resource://xplug/ext/lib/xss.min.js";
     document.body.appendChild(oScript);
}
