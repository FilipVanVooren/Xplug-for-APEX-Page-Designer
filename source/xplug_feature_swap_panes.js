//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_feature_swap_grid.js
// 2016-07-28 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */
/* jshint -W083 */



/****************************************************************************
 * Install swap grid pane button
 ***************************************************************************/
 Xplug.prototype.installSwapGrid = function ()
 {
   'use strict';

   if  ( $('button#ORATRONIK_XPLUG_swap_panes_button').length == 1 ) return;

   var l_shortcut = apex.actions.lookup('pd-xplug-swap-grid-pane').shortcut;

   $('button#glvExpandRestoreBtn')
            .after( '<button'
                  + ' type="button"'
                  + ' ID="ORATRONIK_XPLUG_swap_panes_button"'
                  + ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillStart js-actionButton"'
                  + ' data-action="pd-xplug-swap-grid-pane"'
                  + ' title="[' + l_shortcut + '] ' + get_label('BTN-SWAP-GRID-PANE') + '"'
                  + '>'
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
