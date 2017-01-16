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
 * Hide Component View button
 ***************************************************************************/
 Xplug.prototype.hideBtnCompView = function()
{
    $('button#menu-comp-view').css('display','none');
    xplug.setStorage('BTN-COMPVIEW','NO');
}; // hideBtnCompView


/****************************************************************************
 * Show Component View button
 ***************************************************************************/
 Xplug.prototype.showBtnCompView = function()
{
    $('button#menu-comp-view').css('display','inline');
    xplug.setStorage('BTN-COMPVIEW','YES');
}; // showBtnCompView


/****************************************************************************
 * Hide Team Development button
 ***************************************************************************/
 Xplug.prototype.hideBtnMenuTeamDev = function()
{
    $('button#menu-team-dev').css('display','none');
    xplug.setStorage('BTN-MENU-TEAMDEV','NO');
}; // hideBtnMenuTeamDev

/****************************************************************************
 * Show Team Development button
 ***************************************************************************/
 Xplug.prototype.showBtnMenuTeamDev = function()
{
    $('button#menu-team-dev').css('display','inline');
    xplug.setStorage('BTN-MENU-TEAMDEV','YES');
}; // showBtnMenuTeamDev

/****************************************************************************
 * Hide Comments button
 ***************************************************************************/
 Xplug.prototype.hideBtnComments = function()
{
    $('button#button-comments').css('display','none');
    xplug.setStorage('BTN-ADD-COMMENT','NO');
}; // hideBtnComments


/****************************************************************************
 * Show Comments button
 ***************************************************************************/
 Xplug.prototype.showBtnComments = function()
{
    $('button#button-comments').css('display','inline');
    xplug.setStorage('BTN-ADD-COMMENT','YES');
}; // showBtnComments



/****************************************************************************
 * Presentation Mode on - Beamer with small screen size expected
 ***************************************************************************/
Xplug.prototype.presentationModeOn = function()
{
    xplug.deinstallThemeSwitch();
    xplug.deinstallPageButtons();
    xplug.hideBtnCompView();
    xplug.hideBtnMenuTeamDev();
    xplug.hideBtnComments();
    xplug.deinstallSidekick();
    xplug.setStorage('PRESENTATION-MODE','YES');
}; // presentationModeOn


/****************************************************************************
 * Presentation Mode off - Normal screen size expected
 ***************************************************************************/
Xplug.prototype.presentationModeOff = function()
{
    xplug.installThemeSwitch();
    xplug.installPageButtons();
    xplug.showBtnCompView();
    xplug.showBtnMenuTeamDev();
    xplug.showBtnComments();
    xplug.installSidekick();
    xplug.setStorage('PRESENTATION-MODE','NO');
}; // presentationModeOff
