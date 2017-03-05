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
 * Hide ThemeSwitch button
 ***************************************************************************/
 Xplug.prototype.hideBtnThemeSwitch = function()
{
    $('button#ORATRONIK_XPLUG_moonsun_button').css('display','none');
}; // hideBtnThemeSwitch


/****************************************************************************
 * Show ThemeSwitch button
 ***************************************************************************/
 Xplug.prototype.showBtnThemeSwitch = function()
{
    if (xplug.getStorage('BTN-THEME-SWITCH') == 'YES') {
       $('button#ORATRONIK_XPLUG_moonsun_button').css('display','inline');
    }
}; // showBtnThemeSwitch


/****************************************************************************
 * Hide Prev/Next button
 ***************************************************************************/
 Xplug.prototype.hideBtnPrevNext = function()
{
    $('button#ORATRONIK_XPLUG_prev_page_button,button#ORATRONIK_XPLUG_next_page_button')
          .css('display','none');
}; // hideBtnPrevNext

/****************************************************************************
 * Hide Prev/Next button
 ***************************************************************************/
 Xplug.prototype.showBtnPrevNext = function()
{
  if (xplug.getStorage('BTN-PRVNEXT-PAGE') == 'YES') {
       $('button#ORATRONIK_XPLUG_prev_page_button,button#ORATRONIK_XPLUG_next_page_button')
             .css('display','inline');
  }
}; // showBtnPrevNext


/****************************************************************************
 * Hide Component View button
 ***************************************************************************/
 Xplug.prototype.hideBtnCompView = function()
{
    $('button#menu-comp-view').css('display','none');
}; // hideBtnCompView


/****************************************************************************
 * Show Component View button
 ***************************************************************************/
 Xplug.prototype.showBtnCompView = function()
{
    if (xplug.getStorage('BTN-COMPVIEW') == 'YES') {
       $('button#menu-comp-view').css('display','inline');
    }
}; // showBtnCompView


/****************************************************************************
 * Hide Team Development button
 ***************************************************************************/
 Xplug.prototype.hideBtnMenuTeamDev = function()
{
    $('button#menu-team-dev').css('display','none');
}; // hideBtnMenuTeamDev

/****************************************************************************
 * Show Team Development button
 ***************************************************************************/
 Xplug.prototype.showBtnMenuTeamDev = function()
{
    if (xplug.getStorage('BTN-MENU-TEAMDEV') == 'YES') {
       $('button#menu-team-dev').css('display','inline');
    }
}; // showBtnMenuTeamDev



/****************************************************************************
 * Hide Comments button
 ***************************************************************************/
 Xplug.prototype.hideBtnComments = function()
{
    $('button#button-comments').css('display','none');
}; // hideBtnComments


/****************************************************************************
 * Show Comments button
 ***************************************************************************/
 Xplug.prototype.showBtnComments = function()
{
  if (xplug.getStorage('BTN-ADD-COMMENT') == 'YES') {
     $('button#menu-team-dev').css('display','inline');
  }
}; // showBtnComments


/****************************************************************************
 * Hide Shared Components button
 ***************************************************************************/
 Xplug.prototype.hideBtnSharedComponents = function()
{
    $('button#menu-shared-components').css('display','none');
}; // hideBtnSharedComponents


/****************************************************************************
 * Show Shared Components button
 ***************************************************************************/
 Xplug.prototype.showBtnSharedComponents = function()
{
  if (xplug.getStorage('BTN-SHARED-COMPONENTS') == 'YES') {
     $('button#menu-shared-components').css('display','inline');
  }
}; // showBtnSharedComponents



/****************************************************************************
 * Hide Page Designer settings button
 ***************************************************************************/
 Xplug.prototype.hideBtnPageDesignerSettings = function()
{
    $('button#menu-settings').css('display','none');
}; // hideBtnPageDesignerSettings


/****************************************************************************
 * Show Page Designer settings button
 ***************************************************************************/
 Xplug.prototype.showBtnPageDesignerSettings = function()
{
  if (xplug.getStorage('BTN-SHARED-COMPONENTS') == 'YES') {
     $('button#menu-settings').css('display','inline');
  }
}; // showBtnPageDesignerSettings


/****************************************************************************
 * Presentation Mode on - Beamer with small screen size expected
 ***************************************************************************/
Xplug.prototype.presentationModeOn = function()
{
    xplug.hideBtnThemeSwitch();
    xplug.hideBtnPrevNext();
    xplug.hideBtnCompView();
    xplug.hideBtnMenuTeamDev();
    xplug.hideBtnComments();
    xplug.hideBtnSharedComponents();
    xplug.hideBtnPageDesignerSettings();
    xplug.deinstallSidekick();
    xplug.setStorage('PRESENTATION-MODE','YES');

    $('button#menu-create,button#menu-utilities').css('display','none');

}; // presentationModeOn


/****************************************************************************
 * Presentation Mode off - Normal screen size expected
 ***************************************************************************/
Xplug.prototype.presentationModeOff = function()
{
    xplug.showBtnThemeSwitch();
    xplug.showBtnPrevNext();
    xplug.showBtnCompView();
    xplug.showBtnMenuTeamDev();
    xplug.showBtnComments();
    xplug.showBtnSharedComponents();
    xplug.showBtnPageDesignerSettings();
    xplug.installSidekick();
    xplug.setStorage('PRESENTATION-MODE','NO');

    $('button#menu-create,button#menu-utilities').css('display','inline');

}; // presentationModeOff
