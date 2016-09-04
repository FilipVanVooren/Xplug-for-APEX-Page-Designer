//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_prototypes.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */


 /****************************************************************************
  * Install [app:id] in Window Title
  ***************************************************************************/
  Xplug.prototype.installPDTitle = function ()
  {
    $(document).on('modelReady', pageDesigner.setWinTitle);
    pageDesigner.setWinTitle();

    xplug.setStorage('APP+ID-IN-PD-TITLE','YES');
  }; // installPDTitle


  /****************************************************************************
  * Deinstall [app:id] in Window Title
  ****************************************************************************/
  Xplug.prototype.deinstallPDTitle = function ()
  {
    $(document).off('modelReady', pageDesigner.setWinTitle);

    var l_title = $(document).attr('title');
    l_title     = l_title.replace(/\s\[.*$/,'');                             // Remnove old [xxx:xxx] value

    $(document).attr('title',l_title);

    xplug.setStorage('APP+ID-IN-PD-TITLE','NO');
  }; // deinstallPDTitle


/*****************************************************************************
 * Load Xplug settings from localStorage
 ****************************************************************************/
 Xplug.prototype.loadSettings = function ()
 {
   window.pageDesigner.loadStyle(xplug.getStorage('CURRENT_STYLE','NONE',true));

   xplug.getStorage('PANES_SWITCHED','NO')     == 'YES' && apex.actions.invoke('pd-xplug-dock-grid-right');
   xplug.getStorage('TOOLTIPS_DISABLED','NO')  == 'YES' && apex.actions.invoke('pd-xplug-disable-tooltips');
   xplug.getStorage('SHOW_POWERBOX_PANE','NO') == 'YES' && apex.actions.invoke('pd-xplug-add-powerbox');

   xplug.setStorage('orig.a-PageSelect', $('.a-PageSelect').css('border-left'));
   xplug.getStorage('BTN-PRVNEXT-PAGE','NO')   == 'YES' && xplug.installPageButtons();
   xplug.getStorage('BTN-THEME-SWITCH','NO')   == 'YES' && xplug.installThemeSwitch();
   xplug.getStorage('BTN-SWAP-GRID-PANE','NO') == 'YES' && xplug.installSwapGrid();
   xplug.getStorage('APP+ID-IN-PD-TITLE','NO') == 'YES' && xplug.installPDTitle();
 }; // Xplug.prototype.loadSettings



Xplug.prototype.getVersion = function ()
{
 return xplug.version;
}; // Xplug.prototype.getVersion



Xplug.prototype.probeAPEXVersion = function ()
{
  'use strict';

  var l_version = '?.?.?';
  try {
      l_version = $("script[src*='v=']").attr('src').split('=')[1];    // 4.2.X
  } catch(e) {
      if ($("'script[src*='apex_4_1.min.js']").length == 1) {
         l_version = '4.1.X';
      }
  }

  this.apex_version = l_version;
  return l_version;
}; // Xplug.prototype.probeAPEXVersion
