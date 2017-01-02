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
