//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_startup.js
// 2017-02-24 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true, loopfunc: true */
/* jshint -W030 */

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
   xplug.getStorage('SHOW_SIDEKICK_PANE','YES')     == 'YES' && apex.actions.invoke('pd-xplug-add-sidekick');
   xplug.getStorage('BTN-PRVNEXT-PAGE','YES')       == 'YES' && xplug.installPageButtons();
   xplug.getStorage('BTN-THEME-SWITCH','YES')       == 'YES' && xplug.installThemeSwitch();
   xplug.getStorage('BTN-COMPVIEW','YES')           == 'NO'  && xplug.hideBtnCompView();
   xplug.getStorage('BTN-MENU-TEAMDEV','YES')       == 'NO'  && xplug.hideBtnMenuTeamDev();
   xplug.getStorage('BTN-ADD-COMMENT','YES')        == 'NO'  && xplug.hideBtnComments();
   xplug.getStorage('BTN-SHARED-COMPONENTS','YES')  == 'NO'  && xplug.hideBtnSharedComponents();
   xplug.getStorage('BTN-SWAP-GRID-PANE','YES')     == 'YES' && xplug.installSwapGrid();
   xplug.getStorage('APP+ID-IN-PD-TITLE','YES')     == 'YES' && xplug.installPDTitle();
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

                    // Update themes in Xplug menu and set "Clean UI" as default
                    window.setTimeout(function()
                                        {
                                          xplug.install_menu();

                                          // Set "Clean UI" as default theme upon initial startup
                                          if (xplug.getStorage('CURRENT_STYLE','*NOT SET*',true) == '*NOT SET*') {
                                             window.pageDesigner.loadStyle('Clean UI');
                                             xplug.setStorage('DEFAULT_STYLE1','Clean UI',true);
                                          }
                                        },
                                        Math.random() * 1000 + 1
                                     );
                  } // Callback
                  , "json"
              );  // $.get

            }     // if xplug.getStorage
          }       // if xplug-theme
     }            // for
 };               // installThemes()
