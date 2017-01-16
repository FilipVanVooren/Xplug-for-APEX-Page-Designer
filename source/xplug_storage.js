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
       // Set "Clean UI" as default theme upon initial startup
       if (xplug.getStorage('CURRENT_STYLE','*NOT SET*',true) == '*NOT SET*') {
          window.pageDesigner.loadStyle('Clean UI');
          xplug.setStorage('DEFAULT_STYLE1','Clean UI',true);
       } else {
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

         var sJSON;       // Escaped with: http://www.url-encode-decode.com/

         // Theme: Clean UI
         sJSON = '%7B%0D%0A    %22STYLE_NAME%22%3A %22Clean UI%22%2C%0D%0A    %22DARK_STYLE%22%3A %22NO%22%2C%0D%0A    %22SHOW_GRID%22%3A %22NO%22%2C%0D%0A    %22PROTECTED%22%3A %22YES%22%2C%0D%0A    %22C1%22%3A %22%23000000%22%2C%0D%0A    %22C2%22%3A %22%23FFFFFF%22%2C%0D%0A    %22C3%22%3A %22%23CFE6FA%22%2C%0D%0A    %22C4%22%3A %22%23FFFFFF%22%2C%0D%0A    %22C5%22%3A %22%232D7BBB%22%2C%0D%0A    %22C6%22%3A %22%23FFFFFF%22%2C%0D%0A    %22C7%22%3A %22%234F9CDB%22%2C%0D%0A    %22C8%22%3A %22%23FFFFFF%22%2C%0D%0A    %22C9%22%3A %22%23000000%22%2C%0D%0A    %22C10%22%3A %22%23000000%22%2C%0D%0A    %22OVERRIDE_CSS%22%3A %22YES%22%2C%0D%0A    %22CUSTOM_CSS%22%3A %22%2F%2A%2A%2A%2A%5CnColors used%3A%5CnC1%3A  Foreground color for all buttons%5CnC2%3A  Background color for all buttons%5CnC3%3A  Background color for %27Save%27 button%5CnC4%3A  Foreground color for %27Run%27 button%5CnC5%3A  Background color for %27Run%27 button%5CnC6%3A  Properties Group header icon %26 label color%5CnC7%3A  Properties Group header background color%5CnC8%3A  Property border color%5CnC9%3A  not used%5CnC10%3A not used%5Cn%2A%2A%2A%2A%2F%5Cn%5Cn%2F%2A For all buttons not in popup editor or alert msg %2A%2F%5Cnbutton%3Anot%28%5Bid%5E%3DeditorDlg%5D%29.a-Button%3Anot%28.a-Button--alertMessages%29%5Cn  %7B %5Cn    color%3A             %25%25C1%25%25%3B %5Cn    background-color%3A  %25%25C2%25%25%3B%5Cn    box-shadow%3A        0 0 0 0px%3B %5Cn  %7D%5Cn%5Cnbutton%23button-save-page%5Cn  %7B%5Cn    background-color%3A %25%25C3%25%25%3B%5Cn  %7D%5Cn%5Cn%5Cnbutton%23button-save-run-page%5Cn  %7B%5Cn    color%3A            %25%25C4%25%25%3B%5Cn    background-color%3A %25%25C5%25%25%3B%5Cn  %7D%5Cn%5Cn.a-PageSelect%5Cn  %7B%5Cn    border%3A 0px%3B%5Cn  %7D%5Cn%5Cn%2F%2A%2A%2A%2A%2A%2A%2A%2A%2A%2A%2A%2A%2A%2A%2A%2A Properties Group Header %2A%2A%2A%2A%2A%2A%2A%2A%2A%2A%2A%2A%2A%2F%5Cn%5Cn%2F%2A  icon color %2A%2F%5Cndiv%23sp_right  .a-PropertyEditor-propertyGroup-header span%5Cn  %7B%5Cn    color%3A %25%25C6%25%25 %21important%3B %5Cn  %7D%5Cn%5Cn%2F%2A Properties Group Header label color %2A%2F%5Cndiv%23sp_right .a-PropertyEditor-propertyGroup-title %5Cn  %7B %5Cn    color%3A %25%25C6%25%25%3B %5Cn  %7D%5Cn%5Cn%2F%2A Properties Group Header background color %2A%2F%5Cndiv%23sp_right .a-PropertyEditor-propertyGroup-header %5Cn  %7B%5Cn   background-color%3A %25%25C7%25%25%3B %5Cn  %7D%5Cn%5Cn%2F%2A Property border color %2A%2F%5Cn.a-PropertyEditor-propertyGroup-body .a-Property %5Cn  %7B%5Cn   border-color%3A %25%25C8%25%25%3B%5Cn  %7D%22%0D%0A%7D%0D%0A';
         xplug.setStorage('STYLE_Clean UI', unescape(sJSON), true);
     };
