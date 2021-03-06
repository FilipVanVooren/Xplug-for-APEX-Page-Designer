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
   window.xplug       = new Xplug();
   xplug.apex_version = xplug.probeAPEXVersion();

   console.info('XPLUG - Detected APEX version: ' + xplug.apex_version);

   xplug.installThemes();
   xplug.setLanguage();
   xplug.install_actions();
   xplug.install_menu();
   xplug.loadSettings();
}
