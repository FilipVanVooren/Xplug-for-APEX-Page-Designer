//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_prototypes.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */



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
