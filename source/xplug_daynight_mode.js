//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_daynight_mode.js
// 2016-07-28 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */
/* jshint -W083 */

/****************************************************************************
 * Install Theme switch (daylight/moonlight) button
 ***************************************************************************/
 Xplug.prototype.installThemeSwitch = function ()
 {
   if  ( $('button#ORATRONIK_XPLUG_moonsun_button').length == 1 ) return;

   var l_shortcut_toggle = apex.actions.lookup('pd-xplug-toggle-day-night-mode').shortcut;

   $('.a-PageSelect').css('border-left','0px');
   $('div.a-PageSelect')
             .before( '<button'
                    + ' type="button"'
                    + ' ID="ORATRONIK_XPLUG_moonsun_button"'
                    + ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillStart js-actionButton"'
                    + ' data-action="pd-xplug-toggle-day-night-mode"'
                    + ' title="[' + l_shortcut_toggle + '] ' + get_label('BTN-TGL-DAY-MOON') +  '"'
                    + '>'                    
                    + ' <span class="a-Icon icon-xplug-sun"></span>'
                    + '</button>'
                  );

   xplug.setStorage('BTN-THEME-SWITCH','YES');
 }; // installThemeSwitch



/****************************************************************************
 * Deinstall Theme switch (daylight/moonlight) button
 ***************************************************************************/
 Xplug.prototype.deinstallThemeSwitch = function ()
 {
   $('button#ORATRONIK_XPLUG_moonsun_button').remove();

   if ( $('button#ORATRONIK_XPLUG_prev_page_button').length === 0) {
      $('.a-PageSelect').css('border-left',
                             xplug.getStorage('orig.a-PageSelect','0px'));
   }

   xplug.setStorage('BTN-THEME-SWITCH','NO');
 }; // deinstallThemeSwitch
