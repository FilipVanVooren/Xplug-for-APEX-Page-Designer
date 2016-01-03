//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_storage.js
// 2016-01-03 * Initial version
// 2016-01-03 * Multiple changes
//              - Possibility to set/retrieve global keys (meaning not dependant on host url)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */

Xplug.prototype.setStorage = function(p_key, p_value, p_is_global)
    {
        p_is_global = typeof(p_is_global) == 'undefined' ? false
                                                         : p_is_global === true;

        if (typeof(localStorage) == 'object') {
           var l_key = p_is_global ? 'APEX_XPLUG#GLOBAL#' + p_key
                                   : 'APEX_XPLUG#' + location.host + location.pathname + '#' + p_key;

           if (localStorage === null) {
              console.error('XPLUG - Your browser has localStorage disabled. Cannot save ' + p_key);
              return false;
           }
           localStorage.setItem(l_key, p_value);
           return true;
        } else {
           console.error('XPLUG - Your browser does not support localStorage. Cannot save ' + p_key);
           return false;
        }
    }; // Xplug.prototype.setStorage


Xplug.prototype.getStorage = function(p_key, p_default, p_is_global)
    {
        p_is_global = typeof(p_is_global) == 'undefined' ? false
                                                         : p_is_global === true;

        if (typeof(localStorage) == 'object') {
           var l_key = p_is_global ? 'APEX_XPLUG#GLOBAL#' + p_key
                                   : 'APEX_XPLUG#' + location.host + location.pathname + '#' + p_key;

           if (localStorage === null) {
              console.error('XPLUG - Your browser has localStorage disabled. Cannot retrieve ' + p_key);
              return p_default;
           }
           return localStorage.getItem(l_key) || p_default;
        } else {
           console.error('XPLUG - Your browser does not support localStorage. Cannot retrieve ' + p_key);
           return p_default;
       }
    }; // Xplug.prototype.getStorage
