{
  console.debug("Firefox Extension -> Xplug triggered");

  var l_div = document.createElement('div');
  l_div.setAttribute('xplug-background','resource://xplug/ext/images/grid_4k_3840_2160_dark.png');
  document.body.appendChild(l_div);

  var l_script   = document.createElement("script");
  l_script.type  = "text/javascript";
  l_script.src   = "resource://xplug/ext/js/xplug.js";
  document.body.appendChild(l_script);


  l_script       = document.createElement("script");
  l_script.type  = "text/javascript";
  l_script.src   = chrome.runtime.getURL('/libs/showdown.min.js');
  document.body.appendChild(l_script);   
}
