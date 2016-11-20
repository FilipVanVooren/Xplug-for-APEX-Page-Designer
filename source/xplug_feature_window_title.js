//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_feature_window_title.js
// 2016-09-04 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */
/* jshint -W083 */


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
