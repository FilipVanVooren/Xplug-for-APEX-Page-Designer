//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_feature_daynight_mode.js
// 2016-07-28 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */
/* jshint -W083 */


/****************************************************************************
 * Set attribute 'title' of swap panes button
 ***************************************************************************/
 Xplug.prototype._set_button_tooltip_daynight_mode = function()
{
  var l_shortcut = apex.actions.lookup('pd-xplug-toggle-day-night-mode').shortcut;

  $("button#ORATRONIK_XPLUG_moonsun_button")
     .attr('title', '[' + l_shortcut + '] ' + get_label('BTN-TGL-DAY-MOON') );

}; // _set_button_tooltip_daynight_mode



/****************************************************************************
 * Install Theme switch (daylight/moonlight) button
 ***************************************************************************/
 Xplug.prototype.installThemeSwitch = function ()
 {
   if  ( $('button#ORATRONIK_XPLUG_moonsun_button').length == 1 ) return;

   var l_icon = xplug.darkmode ? 'icon-xplug-moon'
                               : 'icon-xplug-sun';

   var l_class_btn;

   if (xplug.apex_version.substring(0,4) === '5.1.') {
     l_class_btn = ' class="a-Button a-Button--noLabel a-Button--withIcon js-actionButton a-Button--gapRight a-Button--simple"';
   } else {
     l_class_btn = ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillStart js-actionButton"';
   }


   if (xplug.apex_version.substring(0,4) === '5.0.') {
     $('.a-PageSelect').css('border-left','0px');

   }

   $('div.a-PageSelect')
             .before( '<button'
                    + ' type="button"'
                    + ' ID="ORATRONIK_XPLUG_moonsun_button"'
                    + l_class_btn
                    + ' data-action="pd-xplug-toggle-day-night-mode"'
                    + '>'
                    + ' <span class="a-Icon ' + l_icon + '"></span>'
                    + '</button>'
                  );

   xplug._set_button_tooltip_daynight_mode();

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


 /****************************************************************************
  * Add custom method to pageDesigner Object
  * METHOD: setDayMode
  ***************************************************************************/
 window.pageDesigner.setDayMode = function() {

   var l_style = xplug.getStorage('DEFAULT_STYLE1','NONE',true);
   window.pageDesigner.loadStyle(l_style);

   $('#ORATRONIK_XPLUG_moonsun_button span')
        .removeClass('icon-xplug-moon')
        .addClass('icon-xplug-sun');
 }; // window.pageDesigner.setDayMode



 /****************************************************************************
  * Add custom method to pageDesigner Object
  * METHOD: setNightMode
  ***************************************************************************/
 window.pageDesigner.setNightMode = function() {

   var l_style = xplug.getStorage('DEFAULT_STYLE2','Moonlight',true);
   window.pageDesigner.loadStyle(l_style);

   $('#ORATRONIK_XPLUG_moonsun_button span')
         .removeClass('icon-xplug-sun')
         .addClass('icon-xplug-moon');
 }; // window.pageDesigner.setNightMode
