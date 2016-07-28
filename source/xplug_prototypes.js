//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_initialize.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */



/****************************************************************************
 * Install swap grid pane button
 ***************************************************************************/
 Xplug.prototype.installSwapGrid = function ()
 {
   if  ( $('button#ORATRONIK_XPLUG_swap_panes_button').length == 1 ) return;

   $('button#glvExpandRestoreBtn')
            .after( '<button'
                  + ' type="button"'
                  + ' ID="ORATRONIK_XPLUG_swap_panes_button"'
                  + ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillStart js-actionButton"'
                  + ' data-action="pd-xplug-swap-grid-pane">'
                  + ' <span class="a-Icon icon-xplug-arrows-h" aria-hidden="true"></span>'
                  + '</button>'
            );

   xplug.setStorage('BTN-SWAP-GRID-PANE','YES');
 }; // installSwapGrid


/****************************************************************************
 * Deinstall swap grid pane button
 ***************************************************************************/
 Xplug.prototype.deinstallSwapGrid = function ()
 {
   $('button#ORATRONIK_XPLUG_swap_panes_button').remove();

   xplug.setStorage('BTN-SWAP-GRID-PANE','NO');
 }; // DeinstallSwapGrid


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
