	//
    // Documentation
    // https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/page-mod
    //    
    var pageMod = require("sdk/page-mod");
    
    function getContentScript() {
        return  'console.debug("Firefox Extension -> Xplug triggered");'
             +  'var l_script   = document.createElement("script");' 
             +  'l_script.type  = "text/javascript";'
             +  'l_script.src   = "resource://xplug/ext/js/xplug.js";'
             +  'document.body.appendChild(l_script);';
    };
    
    
    pageMod.PageMod(
    {
       include       : /.*f\?p\=4000\:.*/, 
       contentScript : getContentScript()            
    });
