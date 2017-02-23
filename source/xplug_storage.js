//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_storage.js
// 2016-01-03 * Initial version
// 2016-01-03 * Possibility to set/retrieve global keys (meaning not dependant on host url)
// 2016-01-04 * Added getStorageKeys method for retrieving all Xplug keys in localStorage
// 2016-01-07 * Added delStorage method for deleting entries
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true, loopfunc: true */
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


    Xplug.prototype.getStorageKeys = function(p_is_global)
    {
      var l_arr_keys = [];

      p_is_global = typeof(p_is_global) == 'undefined' ? false
                                                       : p_is_global === true;

      if (typeof(localStorage) == 'object') {

         var l_prefix = p_is_global ? 'APEX_XPLUG#GLOBAL#'
                                    : 'APEX_XPLUG#' + location.host + location.pathname + '#';

         for ( var i = 0, len = localStorage.length; i < len; ++i ) {
             var l_key = localStorage.key(i);

             if (l_key.substr(0,l_prefix.length) == l_prefix) {
                l_arr_keys.push(l_key.substr(l_prefix.length));                 // Push key without Xplug prefix
             }
         }
         return l_arr_keys;
      }
    }; // Xplug.prototype.getStorageKeys


    Xplug.prototype.delStorage = function(p_key, p_is_global)
        {
          p_is_global = typeof(p_is_global) == 'undefined' ? false
                                                           : p_is_global === true;

          if (typeof(localStorage) == 'object') {
             var l_key = p_is_global ? 'APEX_XPLUG#GLOBAL#' + p_key
                                     : 'APEX_XPLUG#' + location.host + location.pathname + '#' + p_key;

             if (localStorage === null) {
                console.error('XPLUG - Your browser has localStorage disabled. Cannot delete ' + p_key);
                return false;
             }

             localStorage.removeItem(l_key);
             return true;
          } else {
             console.error('XPLUG - Your browser does not support localStorage. Cannot delete ' + p_key);
             return p_default;
          }
        }; // Xplug.prototype.delStorage




    /*****************************************************************************
     * Load Xplug settings from localStorage
     ****************************************************************************/
     Xplug.prototype.loadSettings = function ()
     {
       if (xplug.getStorage('CURRENT_STYLE','*NOT SET*',true) == '*NOT SET*') {
       } else {
         // Load current style if set
         window.pageDesigner.loadStyle(xplug.getStorage('CURRENT_STYLE','Clean UI',true));
       }

       // Enable Markdown format upon initial startup
       if (xplug.getStorage('MARKDOWN_ENABLED','*NOT SET*',true) == '*NOT SET*')  {
         xplug.setStorage('MARKDOWN_ENABLED','YES',true);
       }

       xplug.getStorage('PANES_SWITCHED','NO')     == 'YES' && apex.actions.invoke('pd-xplug-dock-grid-right');
       xplug.getStorage('TOOLTIPS_DISABLED','NO')  == 'YES' && apex.actions.invoke('pd-xplug-disable-tooltips');

       xplug.setStorage('orig.a-PageSelect', $('.a-PageSelect').css('border-left'));
       xplug.getStorage('SHOW_SIDEKICK_PANE','YES') == 'YES' && apex.actions.invoke('pd-xplug-add-sidekick');
       xplug.getStorage('BTN-PRVNEXT-PAGE','YES')   == 'YES' && xplug.installPageButtons();
       xplug.getStorage('BTN-THEME-SWITCH','YES')   == 'YES' && xplug.installThemeSwitch();
       xplug.getStorage('BTN-COMPVIEW','YES')       == 'NO'  && xplug.hideBtnCompView();
       xplug.getStorage('BTN-MENU-TEAMDEV','YES')   == 'NO'  && xplug.hideBtnMenuTeamDev();
       xplug.getStorage('BTN-ADD-COMMENT','YES')    == 'NO'  && xplug.hideBtnComments();
       xplug.getStorage('BTN-SWAP-GRID-PANE','YES') == 'YES' && xplug.installSwapGrid();
       xplug.getStorage('APP+ID-IN-PD-TITLE','YES') == 'YES' && xplug.installPDTitle();
     }; // Xplug.prototype.loadSettings



     /*****************************************************************************
      * Install themes upon startup
      ****************************************************************************/
     Xplug.prototype.installThemes = function()
     {
         'use strict';

         var oAttr, sStyle, sURL, sJSON, iDelim;

         //
         // Loop over all attributes of DIV#XLPUG_SETTINGS, filtering for
         // "xplug-theme(1-xx)". For each matched attribute get theme
         // from browser addon resource (Chrome or Firefox) unless
         // in localStorage already.
         //
         oAttr = $('div#XPLUG_SETTINGS').get(0).attributes;
         for (var l=0; l < oAttr.length; l++) {
             if (oAttr[l].name.substr(0,11) == 'xplug-theme') {

                iDelim = oAttr[l].value.indexOf('$');
                sStyle = 'STYLE_' + oAttr[l].value.substr(0,iDelim);
                sURL   = oAttr[l].value.substr(iDelim + 1);

                if (xplug.getStorage(sStyle, 'NOT_FOUND', true) == 'NOT_FOUND') {

                   $.get(sURL, function (pData)
                      {
                        console.log('XPLUG - Installing theme "' + pData.STYLE_NAME + '"');
                        sStyle = 'STYLE_' + pData.STYLE_NAME;
                        sJSON  = JSON.stringify(pData);
                        xplug.setStorage(sStyle, sJSON, true);
                      } // Callback
                      , "json"
                  );  // $.get

                }     // if xplug.getStorage
              }       // if xplug-theme
         }            // for
     };               // installThemes()
