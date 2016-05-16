//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// main.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */

if (typeof(window.pageDesigner) == 'object') {
   window.xplug = new Xplug();

   //__install_moonsun_switch();
   //__install_goto_page();


   $(document).on('modelReady', pageDesigner.setWinTitle);

   pageDesigner.setWinTitle();

   xplug.install_menu();
   xplug.loadSettings();
}
