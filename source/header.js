///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
//
// Music listened to while programming Xplug (in no particular order)
//   Kraftwerk, Loverboy, Apparat, Kebu, Hot Chip, New Order, Moderat, Fleetwood Mac, Sisters of Mercy,
//   Birdy, GusGus, Massive Attack, ...
//
// v0.1 - 2015-07-27  * Initial version
// v0.2 - 2015-07-28  * Bug fix:
//                       - pd_dock_grid_right() and pd_dock_grid_middle() now also work in non-english
//                         language environments => C_SPLIT_HANDLE does not longer filter on element title,
//                         instead we take the 2nd splitter.
// v0.3 - 2015-08-01  * Some enhancements
//                       - Options saved in local storage.
//
// v1.0 - 2015-08-07  * First official release as a chrome plugin
//
// v1.1 - 2015-08-29  * Multiple changes
//                      - Code refactored for better integration with Page Designer
//                      - Introduced previous/next page buttons
//                      - Bug-fix:
//                           The html of the XPLUG menu button was missing the attribute type="button",
//                           This resulted in the ENTER keypress on the page text input element being converted into
//                           an onclick event on my XPLUG menu button. That's apparently a normal (and weird?) browser behaviour.
//                           See https://github.com/facebook/react/issues/3907 for details.
//
// v1.1 - 2015-09-06  * Now use apex.actions for handling Xplug buttons (e.g. previous/next page).
//                      See /images/libraries/apex/actions.js for details.
//
// v1.1 - 2015-09-13  * Multiple changes
//                      - Preliminary work on customizing shortcuts.
//                      - Renamed Xplug custom apex actions to contain "xplug" in name, e.g. "pd-xplug-goto-next-page"
//                        instead of "pd-goto-next-page".
//
// v1.1 - 2015-09-28  * Previous/Next page functionality now picks the correct page, based on page list instead
//                      of just fetching -1 or +1 page.
//
// v1.1 - 2015-10-03  * Added possibility to disable tooltips
//
// v1.1 - 2015-10-09  * Multiple changes
//                      - Bug-fix in disabling/enabling tooltips.
//                        For details on copy function see: http://blog.oratronik.org/?p=301
//                      - Added CSS for adding previous/next icons.
//                      - Added possibility to prettify grid layout with background image and without 100% stretched regions.
//
// v1.1 - 2015-10-10 * Multiple changes
//                      - Removed shortcut code for now. Will be included in a later version.
//
// v1.2 - 2015-11-06 * Tweaked Xplug button color so that it doesn't stand out that much.
//
// v1.2 - 2015-11-14 * Bug-fix: Handle unavailability of HTML5 localStorage.
//                      - Fixes problem where Xplug button doesn't appear if localStorage is unavailable.
//                      - Show error message when clicking on Xplug button if localStorage is unavailable.
//
// v1.2 - 2015-12-04 * Implementation of custom midnight style
//
// v1.2 - 2015-12-06 * More work on custom midnight style
//        2015-12-06   - Redefine scrollbars on Webkit
//        2015-12-08   - Bug-fixing CSS colors of page elements
//
// v.2    2015-12-18 * Multiple changes
//                      - Refactored. Splitted Xplug code in multiple javascript files and using Gulp task for building Xplug
//                      - Finalized work on moonlight style
//                      - Removed setWidthOnGrid() and corresponding menu call
//                      - Removed submenu 'Grid Layout' and menu option 'Background Image'
//
// v1.2   2015-12-27 * Multiple changes
//                      - Added configuration dialog for custom Page Designer Style. Lots of interesting stuff.
//                      - Store/restore custom style from local storage
//
// v1.2   2016-01-02 * Added export dialog for custom style
//
// v1.2   2016-01-03 * Multiple changes
//                      - A lot of code refactoring done
//                      - Added possibility to save and retrieve custom style settings to/from local storage
//                      - Reworked menu code and added submenu "Customize"
//                      - Removed export dialog for now. Will be re-added when the other stuff is working as expected.
//                        First need to add a dialog for listing available styles
// v1.2   2016-01-04 * Multiple changes
//                      - Possibility to set/retrieve global keys (meaning not dependant on host url)
//                      - Added getStorageKeys method for retrieving all Xplug keys in localStorage
//                      - Added dialog for listing available styles (Customize submenu)
//                      - Added new submenu for picking styles
//
// v1.2   2016-01-06 * Added a lot of funky stuff
//
// v1.2   2016-01-07 * Multiple changes
//                      - Added delStorage method for deleting entries
//                      - Added dialog for selecting default styles for daylight / moonlight mode
//                      - Added/Updated many labels in xplug_language.js
//                      - ...
//
// v1.2   2016-01-08 * Multiple changes
//                     - Finalized work on dialog for selecting default styles
//                     - Make toggle buttons work with the default styles
//                       - Bug-fixes:
//                       - setStyle method -> Adjusted CSS to fix color on checkox property label to make
//                                            it play nice with dark styles
//                       - setStyle method -> Adjusted CSS to prevent button color change in dialog pages
//
// v1.2   2016-01-09 * Multiple changes (Styles Gallery / Customize Style dialog)
//                     - Refactored code. Export and Import Dialogs for styles are now in own functions
//                     - Added sanity check to style import (JSON)
//                     - Finalized work on Import dialog
//
// v1.2   2016-01-10 * Multiple changes (Styles Gallery / Customize Style dialog)
//                     - When changing default styles also switch current style
//                     - Refactored export dialog for Xplug style so that it matches with import dialog
//                     - Bug-fix: disable style DELETE button if style is default or current style
//                     - Bug-fix: remove draft style from localStorage when closing dialog without saving
//                     - Bug-fix: Re-activate correct style when closing dialog without saving
//                     - Bug-fix: Fixed duplicate value for Daylight mode in Default Styles-Dialog
//                     - Bug-fix: Update Xplug plugin menu after adding/removing styles, is needed for
//                                submenu 'Pick Style'
//
// V1.2.1 2016-01-16 * Multiple changes
//                     - Added possibility to override Xplug CSS code. That is particular useful if you only
//                       want to tweak the standard Page Designer theme.
//                     - Can now use placeholders in the format %%C1%% .. %%C10%% in the custom CSS.
//
// V1.2.1 2016-01-17 * Multiple changes
//                     - Bug-fix: Added new JSON property OVERRIDE_CSS to import check
//                     - Bug-fix: Set height of Custom CSS textarea in configuration dialog AND turn off
//                                spell-checking for that field.
//
// v1.2.2 2016-02-06 * Add application ID and page ID to window/browser tab title (setWinTttle method)
//
// V1.2.2 2016-02-07 * Multiple changes
//                     - Bug-fix: fix problem with undefined variables while loading page in setWinTitle method.
//                     - Bug-fix: removed hard code label parameter in xplug_menu.js
//                     - Renamed submenu 'Customize' to 'Setup'
//                     - Added xplug_powerbox.js for displaying errors and advisor stuff
//
// V1.2.2 2016-02-09 * Multiple changes
//                     - Bug-fix: Powerbox - Show Alertbadge when error is displayed
//                     - Bug-Fix: Powerbox - Resize gallery when Powerbox is drawn for the first time, making
//                                           sure that correct height is taken.
//
// V1.2.2 2016-02-14 * Multiple changes
//                     - Addded menu option for showing/hiding powerbox pane (Errors/Advisor)
//                     - Bug-fix: Registered additional observer in xplug_powebox.js for making sure messages
//                                get tracked as soon as the powerbox is opened.
//
// V1.2.2 2016-02-17 * Multiple changes
//                     - Bug-fix: Adjusted manifest for google chrome plugin (plug_chrome_plugin/manifest.json)
//                                We only want the Xplug plugin to be activated when dealing with
//                                page 4500 (Page Designer)
//                     - Bug-Fix: The jQuery UI tabs were not yet working in the powerbox, due to invalid DIV
//                                ordering. Is now resolved.
//                     - Bug-fix: jQuery UI tab labels were hardcoded in English, now using xplug_language.js
//
// V1.2.2 2016-03-07 * Multiple Changes
//                     - Removed Advisor/Console tabs in powerbox pane for now
//                     - Added possibility to horizontally expand/restore size of powerbox pane
//
// V1.2.2 2016-04-10 * Some minor Changes
//                     - Introduced new button for swapping grid pane from middle<->right
//                     - Worked on powerbox. Added possibility to horizontally expand/collaps pane
//
// V1.2.2 2016-04-19 * Bug-Fixes
//                     - Fixed wrong background color for buttons in powerbox, was particulary noticeable in
//                       Moonlight mode.
//                     - Adjusted size factor for powerbox, for making sure gallery still looks 'OK' if window
//                       gets too small.
//                     - This version is not officially released, functionality will be part of upcoming v1.3
//
// V1.3.0 2016-05-02 * Preliminiary work on new version
//                     - Reworked menu system (new labels, icons, ...)
//                     - Show daylight/moonlight icons in Default style dialog
//                     - Introduced new Xplug settings dialog
//
// V1.3.0 2016-05-16 * Multiple changes
//                     - Code refactoring in xplug_constructor.js
//                       Is required due to new possibility of turning most features on/off.
//                     - Possibility to toggle all Xplug buttons on/off from Xplug settings dialog
//
// V1.3.0 2016-05-16 * Change
//                     Configure default Page Designer Styles as part of Xplug settings dialog, instead of
//                     having own dialog. Removed corresponding submenu entry and refactored code.
//
// V1.3.0 2016-05-23 * Multiple changes
//                     - Bug-fix: Use promise when jumping to previous/next page. This behaviour is
//                                aligned with PD behaviour and prevents creation of double event handlers.
//                                Benefit is also that buttons are reliably re-enabled even if user aborts
//                                switching page in confirmation dialog.
//                     - Change:  Code refactoring and renamed daylight/moonlight mode to day/night mode.
//                     - Change:  Make setting [APP:ID] in Page Designer window title optional.
//                     - Change:  Renamed 'Page Designer Style' in 'Theme' because that is what it is.
//                     - Change:  Reworked the Xplug menus, is cleaner and more understandable now.
//
//
// V1.3.0 2016-05-24 * Multiple changes
//                     - Added new 'Search' tab to Powerbox
//                     - Renamed some labels
//
// V1.3.0.1 2016-06-25 * Several tweaks and Bug-Fixes
//                       - Bug-fix: Configuration of page designer title wasn't working anymore. Fixed this.
//                       - Bug-Fix: Added vertical scrollbar to Search function
//                       - Change:  Temporarly removed possibility to resize Powerbox pane
//                       - Change:  Completed work on search functionality in Powerbox pane
//
// V1.3.0.1 2016-06-28 * Multiple changes
//                       - Adjusted messages badge position in powerbox pane
//                       - This is the official released version
//
// V1.3.0.2 2016-07-01 * Bug-fix
//                       - Default value for the previous/next button and dark mode / daylight mode is set
//                         to YES in the configuration dialog. This is wrong.
//
// V1.3.0.4 2016-07-05 * Multiple changes
//                       - The versions V1.3.0.3 - V1.3.0.5 do not have any functional changes.
//                         Changes are in firefox packaging and GULP task file due to restrictiions set by
//                         Firefox add-on reviewers.
//                       - Bug-fix: to prevent security a vulnerability, a change was made to the setTimeout
//                                  method in xplug_powerbox.js as weg got the below warning before:
//                                  In order to prevent vulnerabilities, the `setTimeout` and `setInterval` functions
//                                  should be called only with function expressions as their first argument.
//
// REMARKS
// This file contains the actual Xplug functionality. The goal is to have as much browser independent stuff in here.
// That allows us to build small browser specific extensions (Chrome, Firefox, ...)
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
