	//
    // Documentation
    // https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/page-mod
    // 
    var pageMod = require("sdk/page-mod");
    
    
    pageMod.PageMod(
    {
       include           : /.*f\?p\=4000\:.*/, 
       contentScriptFile : "./xplug-install.js"         
    });
