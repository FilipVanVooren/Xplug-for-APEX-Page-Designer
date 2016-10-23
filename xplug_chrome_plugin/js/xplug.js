// Built using Gulp. Built date: Sun Oct 23 2016 20:59:43
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
//                     - Added xplug_sidekick.js for displaying errors and advisor stuff
//
// V1.2.2 2016-02-09 * Multiple changes
//                     - Bug-fix: Sidekick - Show Alertbadge when error is displayed
//                     - Bug-Fix: Sidekick - Resize gallery when Sidekick is drawn for the first time, making
//                                           sure that correct height is taken.
//
// V1.2.2 2016-02-14 * Multiple changes
//                     - Addded menu option for showing/hiding sidekick pane (Errors/Advisor)
//                     - Bug-fix: Registered additional observer in xplug_powebox.js for making sure messages
//                                get tracked as soon as the sidekick is opened.
//
// V1.2.2 2016-02-17 * Multiple changes
//                     - Bug-fix: Adjusted manifest for google chrome plugin (plug_chrome_plugin/manifest.json)
//                                We only want the Xplug plugin to be activated when dealing with
//                                page 4500 (Page Designer)
//                     - Bug-Fix: The jQuery UI tabs were not yet working in the sidekick, due to invalid DIV
//                                ordering. Is now resolved.
//                     - Bug-fix: jQuery UI tab labels were hardcoded in English, now using xplug_language.js
//
// V1.2.2 2016-03-07 * Multiple Changes
//                     - Removed Advisor/Console tabs in sidekick pane for now
//                     - Added possibility to horizontally expand/restore size of sidekick pane
//
// V1.2.2 2016-04-10 * Some minor Changes
//                     - Introduced new button for swapping grid pane from middle<->right
//                     - Worked on sidekick. Added possibility to horizontally expand/collaps pane
//
// V1.2.2 2016-04-19 * Bug-Fixes
//                     - Fixed wrong background color for buttons in sidekick, was particulary noticeable in
//                       Moonlight mode.
//                     - Adjusted size factor for sidekick, for making sure gallery still looks 'OK' if window
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
//                     - Added new 'Search' tab to Sidekick
//                     - Renamed some labels
//
// V1.3.0.1 2016-06-25 * Several tweaks and Bug-Fixes
//                       - Bug-fix: Configuration of page designer title wasn't working anymore. Fixed this.
//                       - Bug-Fix: Added vertical scrollbar to Search function
//                       - Change:  Temporarly removed possibility to resize Sidekick pane
//                       - Change:  Completed work on search functionality in Sidekick pane
//
// V1.3.0.1 2016-06-28 * Multiple changes
//                       - Adjusted messages badge position in sidekick pane
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
//                                  method in xplug_sidekick.js as weg got the below warning before:
//                                  In order to prevent vulnerabilities, the `setTimeout` and `setInterval` functions
//                                  should be called only with function expressions as their first argument.
//
// V1.4.0.0 2016-07-28 * Multiple changes
//                       - Code refactoring for next/previous button handling. Moved to file xcplug_prevnext_page.js
//                       - Code refactoring for day/night mode. Moved to file xplug_daynight_mode.js
//                       - Removed some dead code in xplug_constructor.js
//                       - Xplug buttons now have a mouseover title (including shortcut)
//
// V1.4.0.0 2016-07-29 * Multiple changes
//                       - Refactored & renamed some script files
//                       - Bug-fix: When loading Page Designer in Dark-Mode, the sun-icon was shown.
//                                  Is solved now, moon-icon is shown.
//
//
// V1.4.0.0 2016-08-30 * Multiple changes
//                       - Added probeAPEXVersion() function to xplug_prototypes.js
//                       - Adjusted message level from debug to info for some console log messages
//
// V1.4.0.0 2016-09-04 * Multiple changes
//                       - Adjust CSS of buttons depending on APEX version 5.1 or 5.0
//                       - Code refactoring, introduced xplug_feature_window_title.js
//                       - Bug-fix: Previous / Next page buttons did not work after new page was created.
//                                  This is now resolved by refreshing the list of pages, if page can't be Found
//                                  during page hopping.
//                       - Bug-fix: Shortcut for swap grid pane was invalid, now solved by assigning new key Alt+M
//
// V1.4.0.0 2016-09-16 * Multiple changes
//                        - Some refactopring
//                        - Renamed 'Powerbox pane' to 'Sidekick panm' and rename file xplug_powerbox.js
//                          to xplug_feature_sidekick.js
//                        - Adjusted CSS of icon buttons for APEX 5.1
//                        - Added "Documentation" tab to the sidekick pane, used for showing page comments in
//                          Markdown format
//
// V1.4.0.0 2016-09-17 * Removed Markdown stuff again, risk for XSS injection is too high.
//
// V1.4.0.0 2016-09-25 * Multiple changes
//                         - Configuration dialog - Hide certain options if APEX 5.1 is detected
//                           (swap grid, page navigation buttons)
//                         - Configuration dialog - Add new options group "Experimental" and added new option
//                           "Enable 'Page Details' tab in sidekick pane
//                         - Bug fix: Enable foreground/background color in new 'Page Details' tab in sidekick pane
//                         - Bug fix: Fixed padding in Page Details tab in sidekick pane
//                         - Bug fix: Refresh page details tab if page is saved (and sidekick + tab is enabled)
//
//
// V1.4.0.0  2016-10-04 * Multiple changes
//                          - Configuration dialog - Re-added page navigation buttons also on APEX 5.1
//
//
//  V1.4.0.0 2016-10-16 * Multiple changes
//                         - Bug-fix: Sidekick resize handler was not called when resizing window/panes. Solved now.
//                         - Added possibility to resize sidekick pane.
//                         - Sidekick splitter is now a real draggable, possibility to resize pane via mouse
//
//   V1.4.0.0 2016-10-23 * Multiple changes
//                         - Bug-fix: swapping grid panes did not longer work after adding draggable. Is resolved now.
//                         - Refactored: moved some funtions from page_designer_methods.js file
//                           to xplug_feature_swap_grid.js and xplug_feature_prevnext_page.js
//                         - Re-added support for markdown format. Using open source marked.js and XSS.js libraries
//                           for parsing and XSS injection preventHideNotification
//                         - Added LICENSE file. Using MIT license for Xplug now.
//
// REMARKS
// This file contains the actual Xplug functionality. The goal is to have as much browser independent stuff in here.
// That allows us to build small browser specific extensions (Chrome, Firefox, ...)
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2015-2017 Filip van Vooren <filip.van-vooren at oratronik.de>
// http://www.oratronik.de
//
// The MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_language.js
// 2016-01-03 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */

 function get_label(p_index)
 {
   var C_lang  = gBuilderLang ? gBuilderLang : 'en';

   var C_label =  { 'en' : {   "DOCK-GRID"    : "Dock grid"
                             , "DOCKRIGHT"    : "Dock grid on right side"
                             , "DOCKMID"      : "Dock grid in middle"
                             , "PREVPAGE"     : "Go to previous page"
                             , "NEXTPAGE"     : "Go to next page"
                             , "SHORTCUTS"    : "Customize shortcuts"
                             , "NOTOOLTIPS"   : "Disable tooltips"
                             , "TOOLTIPS"     : "Enable tooltips"
                             , "PRETTYGRID"   : "Grid background image"
                             , "SETUP"        : "Setup"
                             , "CONFIGURE"    : "Configure"
                             , "CUSTOMIZE"    : "Customize"
                             , "QUICK-CTRL"   : "Quick Controls"

                             , "BTN-NEW"             : "New"
                             , "BTN-SAVE"            : "Save"
                             , "BTN-APPLY"           : "Apply"
                             , "BTN-OK"              : "OK"
                             , "BTN-CANCEL"          : "Cancel"
                             , "BTN-DELETE"          : "Delete"
                             , "BTN-CLEAR"           : "Clear"
                             , "BTN-EXPORT"          : "Export"
                             , "BTN-IMPORT"          : "Import"
                             , "BTN-TGL-DAY-MOON"    : "Toggle day/night mode"
                             , "BTN-SWAP-GRID-PANE"  : "Swap grid position (middle/right)"

                             , "LBL-STYLE"           : "Theme"
                             , "LBL-STYLE-DEFAULT"   : "Default themes"
                             , "LBL-STYLE-GALLERY"   : "Themes Gallery"
                             , "LBL-STYLE-CUSTOM"    : "Customize theme"
                             , "LBL-STYLE-EXPORT"    : "Export theme"
                             , "LBL-STYLE-IMPORT"    : "Import theme"
                             , "LBL-XPLUG"           : "Xplug"
                             , "LBL-XPLUG-SETTINGS"  : "Xplug settings"
                             , "LBL-LEFT"            : "Left"
                             , "LBL-MIDDLE"          : "Middle"
                             , "LBL-RIGHT"           : "Right"
                             , "LBL-NAME"            : "Name"
                             , "LBL-DARK-STYLE"      : "Night Mode"
                             , "LBL-CRNTLY-ACTIVE"   : "Currently Active"
                             , "LBL-PROTECTED"       : "Protected"
                             , "LBL-SHOW-GRID"       : "Show Grid"
                             , "LBL-COLOR"           : "Color"
                             , "LBL-IDENTIFICATION"  : "Identification"
                             , "LBL-CUST-COLORS"     : "Customize Colors"
                             , "LBL-OVERRIDE-CSS"    : "Override Xplug CSS"
                             , "LBL-CUST-CSS"        : "Custom CSS"
                             , "LBL-ADVANCED"        : "Advanced"
                             , "LBL-EXPERIMENTAL"    : "Experimental"
                             , "LBL-SHOW-BUTTONS"    : "Buttons"
                             , "LBL-SHOW-APPID"      : "Show [app:page] info in window title"
                             , "LBL-ENABLE-PAGEDET"  : "Enable 'Page Details' tab in sidekick pane"
                             , "LBL-ENABLE-MARKDOWN" : "Enable markdown format"
                             , "LBL-DAYLIGHT"        : "Day mode"
                             , "LBL-MOONLIGHT"       : "Night mode"
                             , "LBL-DEFAULT-STYLES"  : "Default Themes"
                             , "LBL-ADD-SIDEKICK"    : "Enable Sidekick"
                             , "LBL-CLOSE"           : "Close"
                             , "LBL-HIDE"            : "Hide"

                             , "TAB-PB-DOCU"         : "Page Details"
                             , "TAB-PB-MESSAGES"     : "Messages"
                             , "TAB-PB-SEARCH"       : "Search"
                             , "TAB-PB-CONSOLE"      : "Console"
                             , "MSG-TT-ENABLE-OK"    : "Tooltips are enabled."
                             , "MSG-TT-DISABLE-OK"   : "Tooltips are disabled."
                             , "MSG-TT-ENABLE-NOK"   : "Could not enable tooltips."
                             , "MSG-TT-DISABLE-NOK"  : "Could not disable tooltips."
                             , "MSG-ERR-STORAGE-NOK" : "localStorage not enabled in browser. Xplug preferences can't be saved/retrieved. Please check!"
                             , "MSG-STYLE-EXPORT"    : "Please mark, copy and save the Xplug JSON code in a text file and press 'OK'"
                             , "MSG-STYLE-IMPORT"    : "Please copy the saved Xplug JSON code into the below field and press 'OK'"
                             , "MSG-STYLE-JSON-OK"   : "Xplug JSON code is valid"
                             , "MSG-STYLE-JSON-NOK"  : "Xplug JSON code is invalid. Please check."
                             , "MSG-STYLE-JSON-FAIL" : "Xplug JSON code is valid, but probably incompatible. Please check."
                             , "MSG-STYLE-IS-DRAFT"  : "Page Designer Style can't be saved. Please first change the style name."

                           },

                    'de' : {   "DOCK-GRID"    : "Grid Position"
                             , "DOCKRIGHT"    : "Grid rechts außen positionieren"
                             , "DOCKMID"      : "Grid in der Mitte positionieren"
                             , "PREVPAGE"     : "Gehe zu vorherige Seite"
                             , "NEXTPAGE"     : "Gehe zu nächste Seite"
                             , "SHORTCUTS"    : "Tastenkürzel einrichten"
                             , "NOTOOLTIPS"   : "Tooltips deaktivieren"
                             , "TOOLTIPS"     : "Tooltips aktivieren"
                             , "PRETTYGRID"   : "Hintergrundbild"
                             , "SETUP"        : "Setup"
                             , "CONFIGURE"    : "Konfigurieren"
                             , "CUSTOMIZE"    : "Anpassen"
                             , "QUICK-CTRL"   : "Schnelleinstellungen"

                             , "BTN-NEW"             : "Neu"
                             , "BTN-SAVE"            : "Speichern"
                             , "BTN-APPLY"           : "Anwenden"
                             , "BTN-OK"              : "OK"
                             , "BTN-CANCEL"          : "Abbrechen"
                             , "BTN-DELETE"          : "Löschen"
                             , "BTN-CLEAR"           : "Leeren"
                             , "BTN-EXPORT"          : "Exportieren"
                             , "BTN-IMPORT"          : "Importieren"
                             , "BTN-TGL-DAY-MOON"    : "Zwischen Tageslicht / Mondlicht-Modus hin und herschalten."
                             , "BTN-SWAP-GRID-PANE"  : "Ansicht umschalten"

                             , "LBL-STYLE"           : "Theme"
                             , "LBL-STYLE-DEFAULT"   : "Standardtheme"
                             , "LBL-STYLE-GALLERY"   : "Theme Gallerie"
                             , "LBL-STYLE-CUSTOM"    : "Theme anpassen"
                             , "LBL-STYLE-EXPORT"    : "Theme exportieren"
                             , "LBL-STYLE-IMPORT"    : "Theme importieren"
                             , "LBL-XPLUG"           : "Xplug"
                             , "LBL-XPLUG-SETTINGS"  : "Xplug Einstellungen"
                             , "LBL-LEFT"            : "Links"
                             , "LBL-MIDDLE"          : "Mittig"
                             , "LBL-RIGHT"           : "Rechts"
                             , "LBL-NAME"            : "Name"
                             , "LBL-DARK-STYLE"      : "Dunkler Stil"
                             , "LBL-CRNTLY-ACTIVE"   : "Ist im Moment aktiv"
                             , "LBL-PROTECTED"       : "Gesperrt"
                             , "LBL-SHOW-GRID"       : "Grid anzeigen"
                             , "LBL-COLOR"           : "Farbe"
                             , "LBL-IDENTIFICATION"  : "Identifizierung"
                             , "LBL-CUST-COLORS"     : "Farben anpassen"
                             , "LBL-OVERRIDE-CSS"    : "Xplug CSS übersteuern"
                             , "LBL-CUST-CSS"        : "Eigenes CSS"
                             , "LBL-ADVANCED"        : "Fortgeschritten"
                             , "LBL-EXPERIMENTAL"    : "Experimentel"
                             , "LBL-SHOW-BUTTONS"    : "Schaltflächen anzeigen"
                             , "LBL-SHOW-APPID"      : "Zeige [app:page] info in Fenstertitel"
                             , "LBL-ENABLE-PAGEDET"  : "Aktiviere Reiter 'Seitendetails' in Sidekick bereich"
                             , "LBL-ENABLE-MARKDOWN" : "Aktiviere markdown Format"                             
                             , "LBL-DAYLIGHT"        : "Tag Modus"
                             , "LBL-MOONLIGHT"       : "Nacht Modus"
                             , "LBL-DEFAULT-STYLES"  : "Standard Themes"
                             , "LBL-ADD-SIDEKICK"    : "Sidekick einschalten"
                             , "LBL-CLOSE"           : "Schliessen"
                             , "LBL-HIDE"            : "Ausblenden"

                             , "TAB-PB-DOCU"         : "Details der Seite"
                             , "TAB-PB-MESSAGES"     : "Nachrichten"
                             , "TAB-PB-SEARCH"       : "Suchen"
                             , "TAB-PB-CONSOLE"      : "Konsole"
                             , "MSG-TT-ENABLE-OK"    : "Tooltips sind aktiviert."
                             , "MSG-TT-DISABLE-OK"   : "Tooltips sind deaktiviert."
                             , "MSG-TT-ENABLE-NOK"   : "Konnte Tooltips nicht aktivieren."
                             , "MSG-TT-DISABLE-NOK"  : "Konnte Tooltips nicht deaktivieren."
                             , "MSG-ERR-STORAGE-NOK" : "localStorage nicht aktiviert im Browser. Xplug Einstellungen können nicht gespeichert/geladen werden. Bitte prüfen!"
                             , "MSG-STYLE-EXPORT"    : "Bitte markieren, kopieren und Speichern Sie den Xplug JSON code als Textdatei und drücken Sie danach 'OK'"
                             , "MSG-STYLE-IMPORT"    : "Bitte fügen Sie den gespeicherten Xplug JSON hier ein und drücken Sie 'OK'"
                             , "MSG-STYLE-JSON-OK"   : "Xplug JSON code is gültig."
                             , "MSG-STYLE-JSON-NOK"  : "Xplug JSON code ist ungültig. Bitte prüfen."
                             , "MSG-STYLE-JSON-FAIL" : "Xplug JSON code ist gültig, aber vermutlich nicht kompatible. Bitte prüfen."
                             , "MSG-STYLE-IS-DRAFT"  : "Page Designer Stil kann nicht gespeichert werden. Bitte zuerst Stilnamen ändern."


                           },
                  };

     return C_label[C_lang][p_index];
 }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// page_designer_methods.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: setWinTitle
 ***************************************************************************/
 window.pageDesigner.setWinTitle = function()
  {
    var l_appid   = pe.getCurrentAppId();                                       // get current appid from PageDesigner model
    var l_page_id = pe.getCurrentPageId();                                      // get Currrent page from PageDesigner model
    var l_title   = $(document).attr('title');

    l_title  = l_title.replace(/\s\[.*$/,'');                                   // Remnove old [xxx:xxx] value

    if ((typeof(l_appid) == 'string') && (typeof(l_page_id) == 'string')) {
      l_title += ' [' + l_appid + ':' + l_page_id + ']';
    }
    $(document).attr('title',l_title);

    return 1;
  }; // window.pageDesigner.setWinTitle


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: Disable tooltips
 ***************************************************************************/
window.pageDesigner.disableTooltips = function()
{
  if (typeof(pageDesigner.tooltipContentForComponent) == "function") {

     // Backup function
     if (typeof(pageDesigner.tooltipContentForComponentCopy) == "undefined") {
        pageDesigner.tooltipContentForComponentCopy = pageDesigner.tooltipContentForComponent;
     }

     // Turn off tooltips
     pageDesigner.tooltipContentForComponent = function() { };

     xplug.setStorage('TOOLTIPS_DISABLED','YES');                                             // Save option in local database
     console.info('XPLUG - Tooltips disabled');

     return 1;
   } else {
      console.error("XPLUG - Tooltips can't be disabled");
      return 0;
   }
}; // window.pageDesigner.disableTooltips


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: Enable tooltips
 ***************************************************************************/
window.pageDesigner.enableTooltips = function()
{
  // Restore - Turn on tooltips again
  if (typeof(pageDesigner.tooltipContentForComponentCopy) == "function") {
     pageDesigner.tooltipContentForComponent = pageDesigner.tooltipContentForComponentCopy;

     pageDesigner.tooltipContentForComponentCopy = undefined;

     xplug.setStorage('TOOLTIPS_DISABLED','NO');                                              // Save option in local database
     console.info('XPLUG - Tooltips enabled');

     return 1;
  } else {
     console.error("XPLUG - Tooltips can't be enabled");
     return 0;
  }
}; // window.pageDesigner.enableTooltips


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



/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: prettfyGrid
 ***************************************************************************/
window.pageDesigner.prettyGrid = function()
{
  document.getElementById("glv-viewport").style.backgroundImage = "url('" + $('div[xplug-background]').attr('xplug-background') + "')";
  xplug.setStorage('PRETTY_GRID','YES');

  return 1;
}; // window.pageDesigner.prettyGrid


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: noPrettyGrid
 ***************************************************************************/
window.pageDesigner.noPrettyGrid = function()
{
  $('#glv-viewport').css('background-image','none');
  xplug.setStorage('PRETTY_GRID','NO');

  return 1;
}; // window.pageDesigner.noPrettyGrid




/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: customizeShortcuts
 ***************************************************************************/
window.pageDesigner.customizeShortcuts = function(p_title)
{
    'use strict';

    //
    // Exit if not in APEX Page Designer
    //
    if (typeof(window.pageDesigner) != 'object') {
       return 0;
    }

    $('#ORATRONIK_XPLUG_DIALOG_SHORTCUTS').length === 0
        && $('body').append('<div ID="ORATRONIK_XPLUG_DIALOG_SHORTCUTS"></div');

    $('#ORATRONIK_XPLUG_DIALOG_SHORTCUTS')
        .lovDialog(
                { modal             : true,
                  title             : p_title,
                  resizable         : true,

                  columnDefinitions : [ { name  : "label",     title : "Action"   },
                                        { name  : "shortcut",  title : "Shortcut" } ],

                  filterLov         : function( pFilters, pRenderLovEntries ) {
                                         // To understand where we get our LOV from, just
                                         // run apex.actions.list() in your javascript console and you'll get the idea.
                                         //
                                         // We're not using apex.actions.listShortcuts() because we also want to list
                                         // actions that do not yet have a shortcut assigned.

                                         var l_arr = apex.actions.list().sort();
                                         for (var i=0; i<l_arr.length; i++) {
                                             l_arr[i].shortcut =  apex.actions.lookup(l_arr[i].name).shortcut;
                                         }

                                         // pRenderLovEntries is a method function set by widget.lovDialog.js
                                         // To render our LOV, all we need to do is call this function and pass
                                         // our LOV as an array.
                                         pRenderLovEntries(l_arr);
                                      },

                  width             : 700,
                  height            : 340,

                  close             : // called by widget.lovDialog.js close function
                                      function(pEvent) {
                                         $('#ORATRONIK_XPLUG_DIALOG_SHORTCUTS').remove();
                                      },

                  multiValue       : false,
                  valueSelected    : function( pEvent, pData ) {
                                         alert(pData.label);
                                         console.log(pData);
                                     }

                }
               );

    return 1;
}; // window.pageDesigner.customizeShortcuts

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// page_designer_style.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */

/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: setStyle
 ***************************************************************************/
window.pageDesigner.setStyle = function( p_style_name,
                                         p_save_style,
                                         p_is_dark_style,
                                         p_show_grid,
                                         p_override_css,
                                         p_custom_css,
                                         p1,p2,p3,p4,p5,p6,p7,p8,p9,p_err
                                       )
{
   'use strict';

    var l_c1   = p1    || '#3F3F3F';       // Dark-Grey
    var l_c2   = p2    || '#505050';       // Light-Grey shade 3
    var l_c3   = p3    || '#246396';       // Light-blue
    var l_c4   = p4    || '#3C424F';       // Dark-Grey 2
    var l_c5   = p5    || '#909090';       // Light-Grey
    var l_c6   = p6    || '#AC761B';       // Orange
    var l_c7   = p7    || '#FFFFFF';       // White
    var l_c8   = p8    || '#000000';       // Black
    var l_c9   = p9    || '#CFE6FA';       // light-Cyan
    var l_cerr = p_err || '#FFC3C3';       // Error background color
    var l_lf   = "\n";

    var l_css, l_custom_css;


    function is_protected(p_style_name) {
      return (p_style_name.toUpperCase() == 'MOONLIGHT') ? 'YES' : 'NO';
    }


    //==========================================================================
    // Save style settings if required
    //==========================================================================
    var l_settings_obj = { "STYLE_NAME"   : p_style_name,
                           "DARK_STYLE"   : typeof(p_is_dark_style) == 'undefined' ? 'YES' : p_is_dark_style,
                           "SHOW_GRID"    : typeof(p_show_grid)     == 'undefined' ? 'YES' : p_show_grid,
                           "PROTECTED"    : is_protected(p_style_name),
                           "C1"           : l_c1,
                           "C2"           : l_c2,
                           "C3"           : l_c3,
                           "C4"           : l_c4,
                           "C5"           : l_c5,
                           "C6"           : l_c6,
                           "C7"           : l_c7,
                           "C8"           : l_c8,
                           "C9"           : l_c9,
                           "C10"          : l_cerr,
                           "OVERRIDE_CSS" : typeof(p_override_css)  == 'undefined' ? 'NO'  : p_override_css,
                           "CUSTOM_CSS"   : p_custom_css
                      };

    if (p_save_style == 'SAVE' || p_save_style == 'SAVE_ONLY') {
       xplug.setStorage('STYLE_' + p_style_name, JSON.stringify(l_settings_obj), true);         // Save global option in local storage

       if (p_save_style == 'SAVE_ONLY') {
          return;
       }
    }

    window.pageDesigner.unsetStyle();

    //==========================================================================
    // Custom icon for Page Designer select element. Needed due to colours
    //==========================================================================
    var l_icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24">'
               + '<path fill="' + l_c1 + '" d="M0 0h24v24h-24z"/>'                                  // Background color
               + '<path fill="' + l_c2 + '" d="M0 0h1v24h-1z"/>'                                    // Left vertical line
               + '<path fill="' + l_c9 + '" d="M16.5 14.293c0 .128-.049.256-.146.354l-4.354 4.353-4.354-4.354c-.195-.195-.195-.512 0-.707s.512-.195.707 0l3.647 3.647 3.646-3.646c.195-.195.512-.195.707 0 .098.097.147.225.147.353zM7.5 9.707c0-.128.049-.256.146-.354l4.354-4.353 4.354 4.354c.195.195.195.512 0 .707s-.512.195-.707 0l-3.647-3.647-3.646 3.646c-.195.195-.512.195-.707 0-.098-.097-.147-.225-.147-.353z"/>'
               + '</svg>';


    //==========================================================================
    // Widgets, tabs
    //==========================================================================
    l_css = l_lf + ' body                                    { background-color: ' + l_c2 + '; }';

    // Tabs at the top of page designer (active)
    l_css +=  l_lf + ' .ui-tabs-active .ui-tabs-anchor       { background-color: ' + l_c1 + ' !important; }'
          +   l_lf + ' .ui-tabs-active .ui-tabs-anchor span  { color: '            + l_c7 +  '!important; }'
          +   l_lf + ' .ui-tabs-active .ui-tabs-anchor       { color: '            + l_c7 +  '!important; }'
          +   l_lf + ' #sp_main a.ui-tabs-anchor             { background-color:'  + l_c6 + '; }';

    // Tabs at the top of page designer (inactive)
    l_css += l_lf + ' .ui-tabs-anchor > span                 { color: ' + l_c6 + '; }'                   // Icon color tabs (Rendering, ...)
          + l_lf  + ' .a-PageDesigner-treeTitle              { color: ' + l_c7 + '; }'   // Tab Tree title color (Rendering, Dynamic Actions, ....)
          + l_lf  + ' .ui-tabs--simpleInset>.a-Tabs-toolbar>.ui-tabs-nav'
                  + ' .ui-tabs-anchor { color: ' + l_c1 + '; border-right-color: ' + l_c4 + '; }'
          + l_lf  + ' .ui-tabs--simpleInset>.a-Tabs-toolbar>.ui-tabs-nav .ui-state-default { background-color: ' + l_c6 + '; }';

    // Toolbar below tabs
    l_css += l_lf  + ' div.a-Toolbar-items                   { background-color: ' + l_c1     + '; }';   // Toolbar items


    // Border-color between elements
    l_css +='.body,'
          + '.ui-widget-content,'
          + '.a-Toolbar-pageColumn,'
          + '.a-Property, '
          + '.a-PropertyEditor-propertyGroup, '
          + '.a-PropertyEditor-propertyGroup-body, '
          + '.a-PropertyEditor-propertyGroup-header, '
          + 'div#sp_right .ui-dialog .a-Property    { border-color: ' + l_c4 + '; }'
          + l_lf;

    // Buttons
    l_css +=        ' .ui-tabs-nav .ui-tabs-anchor           { border-right-color : ' + l_c4 + '; }'
          +  l_lf + ' div#sp_main button.a-Button            { background-color   : ' + l_c5 + '; }'
          +  l_lf + ' div#sp_main .a-Button.is-active,'
          +  l_lf + ' div#sp_main .a-Button.is-active:active,'
          +  l_lf + ' div#sp_main .a-MenuButton.is-active,'
          +  l_lf + ' div#sp_main .fc-button.ui-state-active,'
          +  l_lf + ' div#sp_main .ui-buttonset .ui-button.ui-state-active,'
          +  l_lf + ' div#sp_main .ui-buttonset .ui-button.ui-state-active.ui-state-hover:active '
          +  l_lf + '                                        { background-color: ' + l_c9 + ' !important; }'; // Active Buttons

    l_css += ' div#sp_main .a-Button:hover,'
           + ' div#sp_main .fc-button.ui-state-hover         { background-color: ' + l_c7 + '!important; }'   // Hover Buttons
           + l_lf;


    //==========================================================================
    // Left pane (Tree)
    //==========================================================================
    l_css +=        ' .a-PageDesigner-treeWrap               { background-color : ' + l_c1 + '; }'          // Space between tree and surroundings (tab1-tab4)
          +  l_lf + ' div#PDrenderingTree.a-TreeView         { background-color : ' + l_c1 + '; }'          // Rendering - Tree (=tab1)
          +  l_lf + ' div#PDdynamicActionTree.a-TreeView     { background-color : ' + l_c1 + '; }'          // Dynamic Actions - Tree (=tab2)
          +  l_lf + ' div#PDprocessingTree.a-TreeView        { background-color : ' + l_c1 + '; }'          // Processing - Tree (=tab3)
          +  l_lf + ' div#PDsharedCompTree.a-TreeView        { background-color : ' + l_c1 + '; }'          // Processing - Tree (=tab4)
          +  l_lf + ' span.a-TreeView-label                  { color            : ' + l_c5 + '; }'          // Node label text color
          +  l_lf + ' span.a-TreeView-toggle                 { color            : ' + l_c5 + '; }'          // Node collapse/expand icon color
          +  l_lf + ' div.resize.u-ScrollingViewport         { background-color : ' + l_c1 + '; }'          // Background color empty space
          +  l_lf + ' ul.ui-widget-header                    { background-color : ' + l_c1 + '; }'          // Background color empty space
          +  l_lf;

    //==========================================================================
    // Properties Editor
    //==========================================================================
    l_css +=        ' div#sp_right .a-PropertyEditor-propertyGroup-header { background-color : ' + l_c3  + '; }'  // Group header
          +  l_lf + ' div#sp_right .a-PropertyEditor-propertyGroup-title  { color            : ' + l_c7  + '; }'  // Group header title
          +  l_lf + ' div#sp_right div.a-Property-fieldContainer          { background-color : ' + l_c2  + '; }'  // Fieldcontainer
          +  l_lf + ' div#sp_right div.a-Property-labelContainer          { background-color : ' + l_c2  + '; }'  // Labelcontainer

          +  l_lf + ' div.a-Property.is-error div.a-Property-labelContainer,'                                     // Labelcontainer in error
          +  l_lf + ' div.a-Property.is-error div.a-Property-fieldContainer,'                                     // Fieldcontainer in error
          +  l_lf + ' .a-Property.is-error { background-color: ' + l_cerr + '!important; }'

          +  l_lf + ' div#sp_right div.a-Property,'
          +  l_lf + ' div#sp_right div.a-Property:hover,'
          +  l_lf + ' div#sp_right div.a-Property:focus,'
          +  l_lf + ' div#sp_right div.a-Property:active                  { background-color : ' + l_c2 + '; }'            // Property button
          +  l_lf + ' div#sp_right div.a-Property                         { border-color     : ' + l_c1 + ' !important; }' // Property border color
          +  l_lf + ' div#sp_right .a-Property-field:hover,'
          +  l_lf + ' div#sp_right .a-Property-field:focus                { background-color : ' + l_c1 + '; }'            // Property input field (active)
          +  l_lf + ' div#sp_right .a-Property-field                      { background-color : ' + l_c2 + '; }'            // Property input field
          +  l_lf + ' div#sp_right .a-Property-field                      { color            : ' + l_c9 + '; }'            // Property input field
          +  l_lf + ' div#sp_right .a-Property-label                      { color : ' + l_c5 + '; text-shadow : none; }'   // Property label
          +  l_lf + ' div#sp_right .a-Property-checkbox-label             { color : ' + l_c9 + '; text-shadow : none; }'   // Property Checkbox label
          +  l_lf + ' div#sp_right .a-PropertyEditor-messageText          { color : ' + l_c6 + '; }'                       // Properties editor message
          +  l_lf +  'div#sp_right select { background-image : url(data:image/svg+xml;base64,' + btoa(l_icon) + '); }'     // Redefine select icon

          +  l_lf + ' .a-Property-checkbox-label, .a-Property-radio, .a-Property-unit { text-shadow :  none; }'
          +  l_lf;

    //==========================================================================
    // Grid Layout - Gallery
    //==========================================================================
    l_css +=       ' div#gallery-tabs div             { background-color : ' + l_c2 + '; }'                       // Gallery background
          + l_lf + ' div#gallery-tabs .aTabs-Toolbar  { }'                                                        // Gallery tab row reset
          + l_lf + ' div#gallery-tabs .ui-tabs-anchor { background-color : ' + l_c6 + '; border: 0px solid ' + l_c2 + '; border-radius: 2px;}'
                                                                                                                  // Gallery tab background color
          + l_lf + ' div#R1157688004078338241 li.ui-state-default { background-color : ' + l_c2 + '; } '          // Hack for border-radius
          + l_lf;

    //==========================================================================
    // Xplug sidekick
    //==========================================================================
    l_css += ' div#xplug_pb_tabs, div#xplug_pb_docu, div#xplug_pb_msgview, div#xplug_pb_search { background-color : ' + l_c2 + '; }'
                                                                                                                  // Sidekick background
          +  l_lf + ' div#xplug_pb_resize, div#xplug_pb_right { background-color : ' + l_c2 + '; }';              // Buttons background

    //==========================================================================
    // Messages, Page Search, Help, Alert Badge
    //==========================================================================
    l_css +=       ' div#messages, div#search, div#help               { background-color : ' + l_c1 + '; }'
          + l_lf + ' div#help-container                               { background-color : ' + l_c1 + '; }'
          + l_lf + ' .ui-tabs-helpTab.ui-state-active .ui-tabs-anchor { background-color : ' + l_c1 + ' !important; }'
          + l_lf + ' div#help-container h3, div#help-container h4     { color : '            + l_c7 + '; }'
          + l_lf + ' div#help-container dt                            { color : '            + l_c7 + '; }'
          + l_lf + ' div#help-container a                             { color : '            + l_c3 + '; }'
          + l_lf + ' div#help-container *                             { color : '            + l_c5 + '; }';

    // Messages
    l_css += l_lf + ' .a-AlertMessages-message                        {  color: '            + l_c6 + '; }'
          +  l_lf + ' .a-AlertMessages-message.is-error:hover,'
                  + ' .a-AlertMessages-message.is-error:focus         {  background-color : ' + l_c7 + ' !important; }';

    // Page Search and Sidekick (Page Details, Search)
    l_css += l_lf + ' div.a-Form-labelContainer .a-Form-label, div#xplug_pb_docu, div#xplug_pb_search  .a-Form-label,'
          +  l_lf + ' .a-Form-checkboxLabel, .a-Form-inputContainer .checkbox_group label, .a-Form-inputContainer .radio_group label, .a-Form-radioLabel'
          +  l_lf + ' { color: ' + l_c7 + '; }';

    // Alert Badge
    l_css += l_lf + ' span.a-AlertBadge { color : ' + l_c7 + '; }';



    //==========================================================================
    // Scrollbars
    //==========================================================================
    // Webkit scrollbar generator
    // http://mikethedj4.github.io/Webkit-Scrollbar-Generator/
    //
    var l_scroll =        '::-webkit-scrollbar              { width: 10px; height: 10px; }'
                 + l_lf + '::-webkit-scrollbar-button       { width: 0px;  height: 0px;  }'
                 + l_lf + '::-webkit-scrollbar-thumb        { background: ' + l_c5 + ';  border-radius: 50px; }'
                 + l_lf + '::-webkit-scrollbar-thumb:hover  { background: #ffffff;      }'
                 + l_lf + '::-webkit-scrollbar-thumb:active { background: ' + l_c3 + '; }'
                 + l_lf + '::-webkit-scrollbar-track        { background: #666666; border: 90px none #ffffff; border-radius: 45px; }'
                 + l_lf + '::-webkit-scrollbar-track:hover  { background: #666666;     }'
                 + l_lf + '::-webkit-scrollbar-track:active { background: #333333;     }'
                 + l_lf + '::-webkit-scrollbar-corner       { background: transparent; }'
                 + l_lf;


    //==========================================================================
    // Add Xplug CSS style to HTML page head
    //==========================================================================
    var l_style = '<style type="text/css" ID="XPLUG_THEME">' + l_lf;

    if (p_override_css != 'YES') {
        l_style += l_css    + l_lf;
        l_style += l_scroll + l_lf;
    }

    //==========================================================================
    // Add custom CSS to HTML page head
    //==========================================================================
    if (typeof(p_custom_css) != 'undefined') {
       l_custom_css = p_custom_css;
       l_custom_css = l_custom_css.replace(/%%C1%%/gi,l_c1);
       l_custom_css = l_custom_css.replace(/%%C2%%/gi,l_c2);
       l_custom_css = l_custom_css.replace(/%%C3%%/gi,l_c3);
       l_custom_css = l_custom_css.replace(/%%C4%%/gi,l_c4);
       l_custom_css = l_custom_css.replace(/%%C5%%/gi,l_c5);
       l_custom_css = l_custom_css.replace(/%%C6%%/gi,l_c6);
       l_custom_css = l_custom_css.replace(/%%C7%%/gi,l_c7);
       l_custom_css = l_custom_css.replace(/%%C8%%/gi,l_c8);
       l_custom_css = l_custom_css.replace(/%%C9%%/gi,l_c9);
       l_custom_css = l_custom_css.replace(/%%C10%%/gi,l_cerr);

       l_style += l_custom_css + l_lf;
    }
    l_style += '</style>' + l_lf;

    // console.log(l_style);

    $("link[href*='/css/Theme-Standard']").after(l_style);

    if (p_show_grid == 'YES') {
       window.pageDesigner.prettyGrid();
    } else {
       window.pageDesigner.noPrettyGrid();
    }

    $('#ORATRONIK_XPLUG_moonsun_button span')
         .removeClass( p_is_dark_style == 'YES' ? 'icon-xplug-sun' : 'icon-xplug-moon')
         .addClass(    p_is_dark_style == 'YES' ? 'icon-xplug-moon': 'icon-xplug-sun');


    if ( p_save_style == 'DO_NOT_SAVE') {
         console.info('XPLUG - Page Designer style "' + p_style_name + '" (DRAFT mode applied).');
    } else {
         console.info('XPLUG - Page Designer Style "' + p_style_name + '" set.');
         xplug.setStorage('CURRENT_STYLE',p_style_name, true);
    }

    return JSON.stringify(l_settings_obj);
}; // window.pageDesigner.setStyle


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: unsetStyle
 ***************************************************************************/
window.pageDesigner.unsetStyle = function()
{
   'use strict';

   $('style#XPLUG_THEME').remove();
   window.pageDesigner.noPrettyGrid();

   $('#ORATRONIK_XPLUG_moonsun_button span')
        .removeClass('icon-xplug-moon')
        .addClass('icon-xplug-sun');

   console.info('XPLUG - Current page designer style unset.');

   xplug.setStorage('CURRENT_STYLE','NONE', true);

   return 1;
}; // window.pageDesigner.unsetStyle


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: loadStyle
 ***************************************************************************/
window.pageDesigner.loadStyle = function(p_style_name)
{
   'use strict';

   var l_imp_obj;

   if (p_style_name == 'NONE') {
      window.pageDesigner.unsetStyle();
      return;
   }

   //
   // Get settings
   //
   try {
      l_imp_obj = JSON.parse(xplug.getStorage('STYLE_' + p_style_name,null,true));
   } catch(e) {
      console.warn("XPLUG: can't fetch " + p_style_name + " from localStorage.");
      return 0;
   }


   if (l_imp_obj === null) {
      console.error('XPLUG: could not retrieve Page Designer style "' + p_style_name + '". Reverting to NONE.');
      window.pageDesigner.loadStyle('NONE');
      return 0;
   }


  window.pageDesigner.setStyle
    (
       l_imp_obj.STYLE_NAME,
       'LOAD_STYLE',
       l_imp_obj.DARK_STYLE,
       l_imp_obj.SHOW_GRID,
       l_imp_obj.OVERRIDE_CSS,
       l_imp_obj.CUSTOM_CSS,
       l_imp_obj.C1,
       l_imp_obj.C2,
       l_imp_obj.C3,
       l_imp_obj.C4,
       l_imp_obj.C5,
       l_imp_obj.C6,
       l_imp_obj.C7,
       l_imp_obj.C8,
       l_imp_obj.C9,
       l_imp_obj.C10
    );

    xplug.darkmode = l_imp_obj.DARK_STYLE == 'YES';
}; // window.pageDesigner.loadStyle


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: getStyles
 ***************************************************************************/
window.pageDesigner.getStyles = function()
{
   'use strict';

   var l_arr_styles = [];
   var l_arr_keys   = xplug.getStorageKeys(true);

   for (var i = 0, l_length = l_arr_keys.length; i < l_length; ++i ) {
      var l_key = l_arr_keys[i];

      var l_current = xplug.getStorage('CURRENT_STYLE','',true);

      if (l_key.substr(0,6) == 'STYLE_') {
         var l_style = JSON.parse(xplug.getStorage(l_key,null,true));

         if (l_style.STYLE_NAME == l_current) {
            l_style.IS_CURRENT = 'YES';
         }

         if (l_style !== null) {
            l_arr_styles.push(l_style);
         }
      }
   }

   return l_arr_styles;
}; // window.pageDesigner.getStyles



window.pageDesigner.customizeStyle = function(p_title)
{
    'use strict';

    //
    // Exit if not in APEX Page Designer
    //
    if (typeof(window.pageDesigner) != 'object') {
       return 0;
    }

    $('#ORATRONIK_XPLUG_DIALOG_STYLE_LOV').length === 0
        && $('body').append('<div ID="ORATRONIK_XPLUG_DIALOG_STYLE_LOV"></div');

    $('#ORATRONIK_XPLUG_DIALOG_STYLE_LOV')
        .lovDialog(
                { modal             : true,
                  title             : get_label('LBL-STYLE-GALLERY'),
                  resizable         : true,

                  columnDefinitions : [ { name  : "STYLE_NAME",  title : get_label('LBL-NAME')          },
                                        { name  : "DARK_STYLE",  title : get_label('LBL-DARK-STYLE')    },
                                        { name  : "IS_CURRENT",  title : get_label('LBL-CRNTLY-ACTIVE') },
                                        { name  : "PROTECTED",   title : get_label("LBL-PROTECTED")     },
                                       ],

                  filterLov         : function( pFilters, pRenderLovEntries ) {

                                         var l_arr = window.pageDesigner.getStyles();
                                         // pRenderLovEntries is a method function set by widget.lovDialog.js
                                         // For details see /images/apex_ui/js/widget.lovDioalog.js
                                         //
                                         // To render our LOV, all we need to do is call this function and pass
                                         // our LOV as an array.
                                         pRenderLovEntries(l_arr);
                                      },

                  width             : 600,
                  height            : 340,

                  close             : // called by widget.lovDialog.js close function
                                      function(pEvent) {
                                         $('#ORATRONIK_XPLUG_DIALOG_STYLE_LOV').remove();

                                         // Update Xplug plugin menu: sync Styles in submenu "Pick Style"
                                         xplug.install_menu();
                                      },

                  multiValue       : false,

                  valueSelected    : function( pEvent, pData ) {
                                         window.pageDesigner.customizeStyleDialog(
                                            pData.STYLE_NAME,
                                            get_label('LBL-STYLE-CUSTOM'),
                                            p_title
                                         );
                                     },

                   buttons : [
                               { text  : get_label('BTN-IMPORT'),
                                 click : function(pEvent) {
                                            $( this ).lovDialog("close");
                                            window.pageDesigner.importStyleDialog(p_title);
                                         }
                               },

                               { text  : get_label('BTN-NEW'),
                                 click : function() {
                                   window.pageDesigner.setStyle('New custom style','SAVE_ONLY');
                                   window.pageDesigner.customizeStyleDialog(
                                      'New custom style',
                                      get_label('LBL-STYLE-CUSTOM'),
                                      p_title
                                   );
                                   $( this ).lovDialog("close");
                                 }
                               },

                               { text  : get_label('BTN-OK'),
                                 class : 'a-Button--hot',
                                 click : function() {
                                   $( this ).lovDialog("close");
                                 }
                               }
                             ]
                }
               );

    return 1;
}; // window.pageDesigner.customizeStyle




/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: exportStyleDialog
 ***************************************************************************/
 window.pageDesigner.exportStyleDialog = function(p_style)
 {
   'use strict';

   var l_out = apex.util.htmlBuilder();

   l_out.markup('<div ID="ORATRONIK_XPLUG_EXPORT_DIALOG">')
        .markup('<span>' + get_label('MSG-STYLE-EXPORT') + '</span>')
        .markup('<div><textarea ID=ORATRONIK_XPLUG_TXTAREA_JSON width=80 height=15 style="width: 100%; height: 250px">')
        .markup('</textarea>')
        .markup('</div>');

   $(l_out.html).dialog({
       modal   : true,
       title   : get_label('LBL-STYLE-EXPORT'),
       width   : 700,
       height  : 400,
       close   : function(pEvent) {
                    $(this).dialog( "close" );
                    $('#ORATRONIK_XPLUG_EXPORT_DIALOG').remove();
                 },

       buttons : [
                   { text  : get_label('BTN-OK'),
                     class : 'a-Button--hot',
                     click : function() {
                        $(this).dialog( "close" );
                     },
                   }
                 ],

       position: { 'my': 'center', 'at': 'center' }
   });

   var l_json = JSON.parse(xplug.getStorage(p_style,null,true));

   $('textarea#ORATRONIK_XPLUG_TXTAREA_JSON').val(JSON.stringify(l_json,null,4));
 }; // exportStyleDalog



/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: importStyleDialog
 ***************************************************************************/
 window.pageDesigner.importStyleDialog = function(p_LOV_title)
 {
   'use strict';

   var l_out = apex.util.htmlBuilder();

   var C_valid = '#style_name#dark_style#show_grid#protected'
               + '#c1#c2#c3#c4#c5#c6#c7#c8#c9#c10#override_css#custom_css';

   function verifyJSON(p_json) {
     var l_json_obj;
     var l_is_valid;
     var l_req = '';

     $(   'div#ORATRONIK_XPLUG_IMPORT_DIALOG_MSG1,'
        + 'div#ORATRONIK_XPLUG_IMPORT_DIALOG_MSG2,'
        + 'div#ORATRONIK_XPLUG_IMPORT_DIALOG_MSG3'  ).css('display','none');

     if ((p_json === '') || (p_json === null) || (typeof(p_json) == 'undefined')) {
        return undefined;
     }

     try {
            l_json_obj = JSON.parse(p_json);
            l_is_valid = true;
         }
     catch(e)
         {
            l_is_valid = false;
         }


     // Show message
     if (l_is_valid === true) {

        // Check if required keys are all there
        for (var l_key in l_json_obj) {
            l_req += '#' + l_key.toLowerCase();
        }

        if (l_req == C_valid) {
           // JSON code is valid and compatible
           $('div#ORATRONIK_XPLUG_IMPORT_DIALOG_MSG1').css('display','block');

        } else {
           // JSON code is valid but probably incompatible
           $('div#ORATRONIK_XPLUG_IMPORT_DIALOG_MSG3').css('display','block'); }

     } else {
        // JSON code is invalid
        $('div#ORATRONIK_XPLUG_IMPORT_DIALOG_MSG2').css('display','block');
     }

     // Enable or disable "OK" button
     if (l_is_valid === true) {
        $('button#ORATRONIK_XPLUG_STYLE_IMPORT_JSON')
             .removeAttr('disabled')
             .removeClass('disabled ui-button-disabled ui-state-disabled');

        return l_json_obj;
     } else {
        $('button#ORATRONIK_XPLUG_STYLE_IMPORT_JSON').attr('disabled','disabled');
     }
     return undefined;
   }


    l_out = apex.util.htmlBuilder();
    l_out.markup('<div ID="ORATRONIK_XPLUG_IMPORT_DIALOG">')
         .markup('<span>' + get_label('MSG-STYLE-IMPORT') + '</span>')
         .markup('<div><textarea ID=ORATRONIK_XPLUG_TXTAREA_JSON width=80 height=15 style="width: 100%; height: 250px">')
         .markup('</textarea>')
         .markup('<div ID="ORATRONIK_XPLUG_IMPORT_DIALOG_MSG1" style="display:none; background-color:#0a8040;" width=100%>')
         .markup('<span style="color: #ffffff;">' + get_label('MSG-STYLE-JSON-OK')   + '</span>')
         .markup('</div>')
         .markup('<div ID="ORATRONIK_XPLUG_IMPORT_DIALOG_MSG2" style="display:none; background-color:#ff0000;" width=100%>')
         .markup('<span style="color: #ffffff;">' + get_label('MSG-STYLE-JSON-NOK')  + '</span>')
         .markup('</div>')
         .markup('<div ID="ORATRONIK_XPLUG_IMPORT_DIALOG_MSG3" style="display:none; background-color:#ff0000;" width=100%>')
         .markup('<span style="color: #ffffff;">' + get_label('MSG-STYLE-JSON-FAIL') + '</span>')
         .markup('</div>')
         .markup('</div>');

    $(l_out.html).dialog({
        modal   : true,
        title   : get_label('LBL-STYLE-IMPORT'),
        width   : 700,
        height  : 400,
        close   : function(pEvent) {
                     $(this).dialog( "close" );
                     $('#ORATRONIK_XPLUG_IMPORT_DIALOG').remove();
                     window.pageDesigner.customizeStyle(p_LOV_title);
                  },

        buttons : [
                    { text  : get_label('BTN-CLEAR'),
                      click : function() {
                         $('textarea#ORATRONIK_XPLUG_TXTAREA_JSON')
                             .val('')
                             .trigger('change');
                      },
                    },

                    { text  : get_label('BTN-CANCEL'),
                      click : function() {
                         $(this).dialog( "close" );
                      },
                    },

                    { text     : get_label('BTN-OK'),
                      id       : 'ORATRONIK_XPLUG_STYLE_IMPORT_JSON',
                      class    : 'a-Button--hot',
                      disabled : true,
                      click    : function() {
                         var l_imp_obj = verifyJSON(
                                 $('textarea#ORATRONIK_XPLUG_TXTAREA_JSON').val()
                             );

                         window.pageDesigner.setStyle
                           (
                              l_imp_obj.STYLE_NAME,
                              'SAVE_ONLY',
                              l_imp_obj.DARK_STYLE,
                              l_imp_obj.SHOW_GRID,
                              l_imp_obj.OVERRIDE_CSS,
                              l_imp_obj.CUSTOM_CSS,
                              l_imp_obj.C1,
                              l_imp_obj.C2,
                              l_imp_obj.C3,
                              l_imp_obj.C4,
                              l_imp_obj.C5,
                              l_imp_obj.C6,
                              l_imp_obj.C7,
                              l_imp_obj.C8,
                              l_imp_obj.C9,
                              l_imp_obj.C10
                           );

                         $(this).dialog( "close" );
                      },
                    }
                  ],

        position: { 'my': 'center', 'at': 'center' }
    });

    $('textarea#ORATRONIK_XPLUG_TXTAREA_JSON')
       .on('change click keydown mouseout', function() { verifyJSON($(this).val()); });

}; // window.pageDesigner.importStyleDialog



/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: customizeStyleDialog
 ***************************************************************************/
window.pageDesigner.customizeStyleDialog = function(p_style_name, p_title, p_LOV_title)
{
    'use strict';

    //
    // Exit if not in APEX Page Designer
    //
    if (typeof(window.pageDesigner) != 'object') {
       return 0;
    }

    var l_dialog$;
    var l_dialogPE$;
    var l_settings_obj, l_imp_obj;
    var l_properties1     = [], l_properties2 = [], l_properties3 = [];
    var l_out             = apex.util.htmlBuilder();
    var l_style_name_curr = xplug.getStorage('CURRENT_STYLE','NONE',true);
    var l_style_name      = 'STYLE_' + p_style_name;
    var l_style_name_orig = l_style_name;
    var l_style_applied   = false;
    var l_style_saved     = false;


    function is_protected() {
      try {
         var l_protected_obj = JSON.parse(xplug.getStorage(l_style_name,null,true));

         return l_protected_obj.PROTECTED == 'YES';
      } catch(e) {}

      return false;
    } // is_protected


    function is_default() {
      var l_style1  = xplug.getStorage('DEFAULT_STYLE1',null,true);
      var l_style2  = xplug.getStorage('DEFAULT_STYLE2',null,true);
      var l_current = xplug.getStorage('CURRENT_STYLE',null,true);

      if ((p_style_name == l_style1) || (p_style_name == l_style2) || (p_style_name == l_current)) {
         return true;
      }

      return false;
    } // is_default


    function apply_style(p_save_mode) {
      //
      // Process new/updated values
      //
      var l_style_name = $('input[data-property-id=style_name]').val();

      var l_c = [];
      for (var l=1;l<=10;l++) {
          l_c[l] = $('input[data-property-id=col_' + l + ']').val();
      }

      window.pageDesigner.setStyle
        (
           l_style_name,
           p_save_mode,
           $('input[name=ColorDlgPE_2_name]:checked').val(),
           $('input[name=ColorDlgPE_3_name]:checked').val(),
           $('input[name=ColorDlgPE_14_name]:checked').val(),
           $('textarea[data-property-id="custom_css"').val(),
           l_c[1],l_c[2],l_c[3],l_c[4],l_c[5],
           l_c[6],l_c[7],l_c[8],l_c[9],l_c[10]
        );

      l_style_applied = true;
    } // apply_style


    l_out.markup('<div')
         .attr('id','ORATRONIK_XPLUG_COLOR_DIALOG')
         .markup('>')
         .markup('<div')
         .attr('id','ColorDlgPE')
         .markup('>');


    l_dialog$ = $(l_out.html)
        .dialog(
                { modal   : false,
                  title   : p_title,
                  width   : 400,

                  close   : function(pEvent) {
                               // Hide any remaining notifications
                               pageDesigner.hideNotification();

                               $('#ORATRONIK_XPLUG_COLOR_DIALOG').remove();

                               // Remove all colorpicker DIVs and associated quick-picks
                               // Why isn't this automatically handled by APEX, could this be a bug ?
                               //
                               // The problem is that the many DIV's start accumulating which can result in a slow reponse
                               // as the DOM gets bloated with way too many DIV's.
                               $('div.colorpicker').remove();
                               $('div[id^=ColorDlgPE_').remove();

                               // Reactivate current style if we didn't change anything
                               if ( (l_style_applied === true) && (l_style_saved === false) )  {
                                  window.pageDesigner.loadStyle(l_style_name_curr);
                               }

                               // Get rid of remaining draft style, always!
                               xplug.delStorage('STYLE_New custom style',true);

                               // Back to Style Gallery
                               window.pageDesigner.customizeStyle(p_LOV_title);
                            },

                  open    : function() {
                               l_dialogPE$ = $('#ColorDlgPE');

                               //
                               // Get settings
                               //
                               try {
                                  l_imp_obj = JSON.parse(xplug.getStorage(l_style_name,null,true));
                               } catch(e) {
                                  console.warn("XPLUG: can't fetch " + l_style_name + " from localStorage. Using defaults.");
                               }
                               l_settings_obj = { "STYLE_NAME"   : typeof(l_imp_obj.STYLE_NAME) == 'undefined' ? "Default" : l_imp_obj.STYLE_NAME,
                                                  "DARK_STYLE"   : typeof(l_imp_obj.DARK_STYLE) == 'undefined' ? "NO"      : l_imp_obj.DARK_STYLE,
                                                  "SHOW_GRID"    : typeof(l_imp_obj.SHOW_GRID)  == 'undefined' ? "NO"      : l_imp_obj.SHOW_GRID,
                                                  "C1"           : l_imp_obj.C1,
                                                  "C2"           : l_imp_obj.C2,
                                                  "C3"           : l_imp_obj.C3,
                                                  "C4"           : l_imp_obj.C4,
                                                  "C5"           : l_imp_obj.C5,
                                                  "C6"           : l_imp_obj.C6,
                                                  "C7"           : l_imp_obj.C7,
                                                  "C8"           : l_imp_obj.C8,
                                                  "C9"           : l_imp_obj.C9,
                                                  "C10"          : l_imp_obj.C10,
                                                  "OVERRIDE_CSS" : typeof(l_imp_obj.OVERRIDE_CSS) == 'undefined' ? "NO" : l_imp_obj.OVERRIDE_CSS,
                                                  "CUSTOM_CSS"   : typeof(l_imp_obj.CUSTOM_CSS)   == 'undefined' ? ""   : l_imp_obj.CUSTOM_CSS
                                             };


                               //
                               // Build properties for property group 1 (style options)
                               //
                               l_properties1[0] = {
                                   propertyName: "style_name",
                                   value:        l_settings_obj.STYLE_NAME,
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.TEXT,
                                       prompt:         get_label('LBL-NAME'),
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "style_id"
                                   },
                                   errors:   [],
                                   warnings: []
                               };

                               l_properties1[1] = {
                                   propertyName: "dark_style",
                                   value:        l_settings_obj.DARK_STYLE,
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.YES_NO,
                                       prompt:         get_label('LBL-DARK-STYLE'),
                                       noValue:        "NO",
                                       yesValue:       "YES",
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "style_id"
                                   },
                                   errors:   [],
                                   warnings: []
                               };

                               l_properties1[2] = {
                                   propertyName: "show_grid",
                                   value:        l_settings_obj.SHOW_GRID,
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.YES_NO,
                                       prompt:         get_label('LBL-SHOW-GRID'),
                                       noValue:        "NO",
                                       yesValue:       "YES",
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "advanced"
                                   },
                                   errors:   [],
                                   warnings: []
                               };


                               //
                               // Build Properties for property group 2 (Customize Colors)
                               //
                               for (var l=1; l<=10; l++) {
                                   l_properties2[ l - 1] = {
                                       propertyName: "col_" + l,
                                       value:        typeof(l_settings_obj["C"+l]) == 'undefined' ? '' : l_settings_obj["C"+l],
                                       metaData: {
                                           type:           $.apex.propertyEditor.PROP_TYPE.COLOR,
                                           prompt:         get_label('LBL-COLOR') + ' ' + l,
                                           isReadOnly:     false,
                                           isRequired:     true,
                                           displayGroupId: "cust_colors"
                                       },
                                       errors:   [],
                                       warnings: []
                                   };
                               }

                               //
                               // Build Properties for property group 3 (Advanced)
                               //
                               l_properties3[0] = {
                                   propertyName: "override_css",
                                   value:        l_settings_obj.OVERRIDE_CSS,
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.YES_NO,
                                       prompt:         get_label('LBL-OVERRIDE-CSS'),
                                       noValue:        "NO",
                                       yesValue:       "YES",
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "advanced"
                                   },
                                   errors:   [],
                                   warnings: []
                               };

                               l_properties3[1] = {
                                   propertyName: "custom_css",
                                   value:        l_settings_obj.CUSTOM_CSS,
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.TEXTAREA,
                                       prompt:         "Custom CSS",
                                       isReadOnly:     false,
                                       isRequired:     false,
                                       displayGroupId: "advanced"
                                   },
                                   errors:   [],
                                   warnings: []
                               };


                               //
                               // Create Property Editor
                               //
                               $('#ColorDlgPE').propertyEditor( {
                                 focusPropertyName: "style_name",
                                 data: {
                                   propertySet: [
                                     {
                                       displayGroupId    : "style_id",
                                       displayGroupTitle : get_label('LBL-IDENTIFICATION'),
                                       properties        : l_properties1
                                     },
                                     {
                                       displayGroupId    : "cust_colors",
                                       displayGroupTitle : get_label('LBL-CUST-COLORS'),
                                       properties        : l_properties2
                                     },
                                     {
                                       displayGroupId    : "advanced",
                                       displayGroupTitle : get_label('LBL-ADVANCED'),
                                       collapsed         : true,
                                       properties        : l_properties3
                                     }
                                   ] // propertySet
                                 }   // data
                               });   // propertyEditor

                               $( '#ORATRONIK_XPLUG_COLOR_DIALOG' ).dialog({
                                   position: { 'my': 'center', 'at': 'center' }
                               });

                               //
                               // Hack: Prevent colorpicker being hidden behind dialog.
                               // Is this a bug in APEX 5.0 ? Seems as if the APEX dev team
                               // did not expect a colorpicker to run from a property editor
                               // in a dialog ?
                               //
                               $("#ORATRONIK_XPLUG_COLOR_DIALOG button[id$='_picker']")
                                   .click(function()
                                     {
                                        $("div.colorpicker").filter(
                                              function ()
                                                  {
                                                    return $(this).css('display') == 'block';
                                                  }
                                        ).css('z-index',8000);
                                     }
                                   ); // click

                               // Set height of Custom CSS textarea AND turn off spell-checking
                               $('#ColorDlgPE_15').css('height','150px')
                                                  .attr('spellcheck','false');

                            }, // open
                  buttons : [
                              { text  : get_label('BTN-EXPORT'),
                                click : function() {
                                            window.pageDesigner.exportStyleDialog(l_style_name);
                                        }
                              },

                              { text  : get_label('BTN-DELETE'),
                                click : function() {
                                  xplug.delStorage(l_style_name_orig,true);
                                  console.debug('XPLUG - Page Designer Style "' + l_style_name_orig.substring(6) + '" deleted.');
                                  $(this).dialog("close");
                                },
                                disabled : is_protected() || is_default()
                              },


                              { text  : get_label('BTN-APPLY'),
                                click : function() {
                                  //
                                  // Apply style but don't save
                                  //
                                  apply_style('DO_NOT_SAVE');
                                },
                                disabled : is_protected()
                              },

                              { text  : get_label('BTN-CANCEL'),
                                click : function() {
                                    $( this ).dialog( "close" );
                                }
                              },


                              { text  : get_label('BTN-SAVE'),
                                class : 'a-Button--hot',
                                click : function() {

                                  // Prevent saving a draft template
                                  var l_new_name = $('input[data-property-id=style_name]').val();
                                  if (l_new_name == 'New custom style') {
                                     pageDesigner.showError(get_label('MSG-STYLE-IS-DRAFT'));
                                     return;
                                  }

                                  // Apply the new style and save in localStorage
                                  apply_style('SAVE');
                                  l_style_saved = true;

                                  $( this ).dialog( "close" );
                                },
                                disabled : is_protected()
                              }
                            ]
                }
       ); // customizeStyleDialog

    return 1;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_constructor.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */

var Xplug = function() {
   var C_version = 'Xplug v1.4.0.0';
   var C_author  = 'Filip van Vooren';

   this.version       = C_version;
   this.author        = C_author;
   this.arr_page_list = [];
   this.darkmode      = false;
   this.apex_version  = '?.?.?.?';


   // Exit if not in APEX Page Designer
   if (typeof(window.pageDesigner) != 'object') {
      return 0;
   }


  /****************************************************************************
   * Install XPLUG custom actions
   ***************************************************************************/
    function __install_actions()
    {
       apex.actions.add(
        [
         {
            name     : "pd-xplug-goto-previous-page",
            label    : get_label('PREVPAGE'),
            title    : get_label('PREVPAGE'),
            shortcut : "Alt+B",
            action   : function( event, focusElement )
                       {
                           window.pageDesigner.goToPrevPage();
                           return true;
                       }
          },

          {
            name     : "pd-xplug-goto-next-page",
            label    : get_label('NEXTPAGE'),
            title    : get_label('NEXTPAGE'),
            shortcut : "Alt+N",
            action   : function( event, focusElement )
                       {
                           window.pageDesigner.goToNextPage();
                           return true;
                       }
          },

          {
            name     : "pd-xplug-dock-grid-right",
            label    : get_label('DOCKRIGHT'),
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.dockGridRight();
                       }
          },

          {
            name     : "pd-xplug-dock-grid-middle",
            label    : get_label('DOCKMID'),
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.dockGridMiddle();
                       }
          },

          {
            name     : "pd-xplug-swap-grid-pane",
            label    : get_label('BTN-SWAP-GRID-PANE'),
            title    : get_label('BTN-SWAP-GRID-PANE'),
            shortcut : "Alt+M",
            action   : function( event, focusElement )
                       {
                         var l_switched = xplug.getStorage('PANES_SWITCHED','NO');
                         if (l_switched == 'NO') {
                            return window.pageDesigner.dockGridRight();
                         } else {
                            return window.pageDesigner.dockGridMiddle();
                         }
                       }
          },

          {
            name     : "pd-xplug-disable-tooltips",
            label    : get_label('NOTOOLTIPS'),
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.disableTooltips();
                       }
          },

          {
            name     : "pd-xplug-enable-tooltips",
            label    : get_label('TOOLTIPS'),
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.enableTooltips();
                       }
          },

          {
            name     : "pd-xplug-set-night-mode",
            label    : get_label('LBL-MOONLIGHT'),
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.setNightMode();
                       }
          },

          {
            name     : "pd-xplug-set-day-mode",
            label    : get_label('LBL-DAYLIGHT'),
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.setDayMode();
                       }
          },

          {
            name     : "pd-xplug-toggle-day-night-mode",
            label    : get_label('BTN-TGL-DAY-MOON'),
            shortcut : "Alt+F10",
            action   : function( event, focusElement )
                       {
                          var l_style2_is_on = $('button#ORATRONIK_XPLUG_moonsun_button span')
                                                     .attr('class').indexOf('icon-xplug-moon') >= 0;

                          if (l_style2_is_on === true) {
                             return  apex.actions.invoke('pd-xplug-set-day-mode');
                          } else {
                             return  apex.actions.invoke('pd-xplug-set-night-mode');
                          }
                       }
          },

          {
            name     : "pd-xplug-add-sidekick",
            label    : get_label('LBL-ADD-SIDEKICK'),
            shortcut : "????",
            action   : function( event, focusElement )
                       {
                          var l_factor = xplug.getStorage('SIDEKICK_FACTOR', 0.5);
                          if (l_factor === 0) l_factor = 0.5;
                          return xplug.installSidekick(l_factor);
                       }
          },

          {
            name     : "pd-xplug-remove-sidekick",
            label    : get_label('LBL-REMOVE-SIDEKICK'),
            shortcut : "????",
            action   : function( event, focusElement )
                       {
                          return xplug.deinstallSidekick();
                       }
          }

        ]
       );
    } // install_actions


   /****************************************************************************
    * Xplug initialization
    ***************************************************************************/
    function __init()
    {

      function add_css_to_page_header() {
        // Add custom CSS to page header
        $('head').append(
            + l_lf + '<style type="text/css">'
            + l_lf + '  button#ORATRONIK_XPLUG:hover            { background-color: #FFFFFF!important; }'
            + l_lf + '  .a-Icon.icon-xplug-previous::before     { content: "\\e029" }'
            + l_lf + '  .a-Icon.icon-xplug-next::before         { content: "\\e028" }'
            + l_lf + '  .a-Icon.icon-xplug-arrows-h '    + get_svg_icon('arrows_h',14,14,null,1)
            + l_lf + '  .a-Icon.icon-xplug-arrow-left '  + get_svg_icon('arrow_left',14,14,null,1)
            + l_lf + '  .a-Icon.icon-xplug-arrow-right ' + get_svg_icon('arrow_right',14,14,null,1)
            + l_lf + '  .a-Icon.icon-xplug-moon '        + get_svg_icon('moon',14,14,null,1)
            + l_lf + '  .a-Icon.icon-xplug-sun  '        + get_svg_icon('sun',14,14,null,1)
            + l_lf + '  .a-Icon.icon-xplug-forbidden '   + get_svg_icon('forbidden',16,16,null,1)
            + l_lf + '</style>'
        );
      }

       // SVG Lifebuoy icon definition
       var C_svg = '<path class="path1" d="M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512'
                 + ' 512-229.23 512-512-229.23-512-512-512zM320 512c0-106.040 85.96-192 192-192s192 85.96 192 192-85.96 192-192'
                 + ' 192-192-85.96-192-192zM925.98 683.476v0l-177.42-73.49c12.518-30.184 19.44-63.276 19.44-97.986s-6.922-67.802-19.44-97.986l177.42-73.49c21.908'
                 + ' 52.822 34.020 110.73 34.020 171.476s-12.114 118.654-34.020 171.476v0zM683.478 98.020v0 0l-73.49 177.42c-30.184-12.518-63.276-19.44-97.988-19.44s-67.802'
                 + ' 6.922-97.986 19.44l-73.49-177.422c52.822-21.904 110.732-34.018 171.476-34.018 60.746 0 118.654 12.114 171.478 34.020zM98.020 340.524l177.422'
                 + ' 73.49c-12.518 30.184-19.442 63.276-19.442 97.986s6.922 67.802 19.44 97.986l-177.42 73.49c-21.906-52.822-34.020-110.73-34.020-171.476s12.114-118.654'
                 + ' 34.020-171.476zM340.524 925.98l73.49-177.42c30.184 12.518 63.276 19.44 97.986 19.44s67.802-6.922 97.986-19.44l73.49 177.42c-52.822 21.904-110.73 34.020-171.476'
                 + ' 34.020-60.744 0-118.654-12.114-171.476-34.020z"></path>';

        // Definitions for Xplug button
        var l_class     = ' class="a-Button a-Button--noLabel a-Button--iconTextButton js-menuButton a-Button--gapRight" ';
        var l_style     = ' style="background-color:#C3ECE2; height: 32px" ';
        var l_label     = ' title="' + C_version + '" ';
        var l_data_menu = ' data-menu="ORATRONIK_XPLUG_PLUGIN_MENU"';
        var l_aria      = ' aria-haspopup="true" aria-expanded="false" aria-label ="' + C_version + '" ';
        var l_menu_icon = '<span class="a-Icon icon-menu-drop-down" aria-hidden="true"></span>';
        var l_lf        = "\n";


        add_css_to_page_header();


        // Inject the Xplug button in Page Designer (next to Shared Components)
        $('button#menu-shared-components')
                .after('<button id="ORATRONIK_XPLUG" type="button"'
                       + l_class
                       + l_style
                       + l_label
                       + l_data_menu
                       + l_aria
                       + ' onClick="void(0); return false;"'
                       + '>'
                       + '<svg viewBox="0 0 1024 1024" width="16px" preserveAspectRatio="xMidYMin">' + C_svg + '</svg>'
                       + l_menu_icon
                       + '</button>');

        __install_actions();

        if (localStorage === null) {
           $('#ORATRONIK_XPLUG')
               .on('click', function()
                 { pageDesigner.showError( get_label('MSG-ERR-STORAGE-NOK') ); }
               );
        }



   } // __init

   __init();
}; // constructor Xplug

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_util.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */

function get_svg_icon(p_icon,p_width,p_height,p_color,p_is_css_background) {
   var C_icon = {};
   var l_svg  = '';

   p_width  = p_width  || 16;
   p_height = p_height || 16;
   p_color  = p_color  || '#000000';


   // Moon
   C_icon.moon =   '<svg width="%%" height="%%" viewBox="0 0 1792 1792"'
               + ' xmlns="http://www.w3.org/2000/svg"><path fill="%%" d="M1390 1303q-54 9-110 9-182'
               + ' 0-337-90t-245-245-90-337q0-192 104-357-201 60-328.5 229t-127.5 384q0 130 51'
               + ' 248.5t136.5 204 204 136.5 248.5 51q144 0 273.5-61.5t220.5-171.5zm203-85q-94'
               + ' 203-283.5 324.5t-413.5 121.5q-156 0-298-61t-245-164-164-245-61-298q0-153'
               + ' 57.5-292.5t156-241.5 235.5-164.5 290-68.5q44-2 61 39 18 41-15 72-86 78-131.5'
               + ' 181.5t-45.5 218.5q0 148 73 273t198 198 273 73q118 0 228-51 41-18 72 13 14 14'
               + ' 17.5 34t-4.5 38z"/></svg>';

   // Sun
   C_icon.sun  = '<svg width="%%" height="%%" viewBox="0 0 1792 1792"'
               + ' xmlns="http://www.w3.org/2000/svg"><path fill="%%" d="M1472'
               + ' 896q0-117-45.5-223.5t-123-184-184-123-223.5-45.5-223.5 45.5-184 123-123 184-45.5'
               + ' 223.5 45.5 223.5 123 184 184 123 223.5 45.5 223.5-45.5 184-123 123-184'
               + ' 45.5-223.5zm276 277q-4 15-20 20l-292 96v306q0 16-13 26-15 10-29 4l-292-94-180'
               + ' 248q-10 13-26 13t-26-13l-180-248-292 94q-14'
               + ' 6-29-4-13-10-13-26v-306l-292-96q-16-5-20-20-5-17 4-29l180-248-180-248q-9-13-4-29'
               + ' 4-15 20-20l292-96v-306q0-16 13-26 15-10 29-4l292 94 180-248q9-12 26-12t26 12l180'
               + ' 248 292-94q14-6 29 4 13 10 13 26v306l292 96q16 5 20 20 5 16-4 29l-180 248 180'
               + ' 248q9 12 4 29z"/></svg>';

   // Horizontal arrows
   C_icon.arrows_h
               = '<svg version="1.1" viewBox="0 0 477.427 477.427" style="enable-background:new 0 0 477.427 477.427;"'
               + ' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"'
               + ' xml:space="preserve">'
               + '<g>'
               + '<polygon points="101.82,187.52 57.673,143.372 476.213,143.372 476.213,113.372 57.181,113.372 101.82,68.733 80.607,47.519 '
               + '0,128.126 80.607,208.733 	"/>'
               + '<polygon points="396.82,268.694 375.607,289.907 420,334.301 1.213,334.301 1.213,364.301 420,364.301 375.607,408.694 '
               + ' 396.82,429.907 477.427,349.301 	"/>'
               + '</g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>'
               + '</svg>';

   // Forbidden icons
   C_icon.forbidden
               = ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="%%" height="%%"> '
               + ' <path fill="#FFF" stroke-width="45" stroke="#F00" d="M86,88a230,230 0 1,0 1-1zL412,412"/> '
               +  ' </svg>';

   // Arrow left
   C_icon.arrow_left
               = '<svg width="%%" height="%%" viewBox="0 0 792 792"'
               + ' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"'
               + ' style="enable-background:new 0 0 792 792;" xml:space="preserve"><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none"/>'
               + '<g class="currentLayer">'
               + '<g id="svg_1" class="" transform="rotate(90,396,396) ">'
               + '<g id="svg_2">'
               + ' <path d="M371.671,649.763c6.019,6.849,14.499,11.316,24.29,11.316c0.081,0,0.188-0.08,0.294-0.08c0.08,0,0.187,0.08,0.294,0.08 '
               + '   c8.373,0,16.746-3.184,23.14-9.577l270.537-270.563c12.787-12.76,12.787-33.493,0-46.253c-12.787-12.787-33.467-12.787-46.254,0 '
               + '   L428.679,550.008V32.69c0-18.083-14.634-32.69-32.717-32.69c-18.084,0-32.717,14.606-32.717,32.69v516.408L147.977,334.686 '
               + '   c-12.814-12.787-33.52-12.573-46.28,0.134c-12.76,12.787-12.68,33.466,0.107,46.253L371.671,649.763z" id="svg_3"/>'
               + ' <path d="M667.086,726.593H124.89c-18.084,0-32.717,14.553-32.717,32.69c0,18.004,14.633,32.717,32.717,32.717h542.223 '
               + '   c18.084,0,32.717-14.713,32.717-32.717C699.803,741.146,685.17,726.593,667.086,726.593z" id="svg_4"/>'
               + '</g></g></g>'
               + '</svg>';



   // Arrow right
   C_icon.arrow_right = C_icon.arrow_left;
   C_icon.arrow_right = C_icon.arrow_right.replace('rotate(90','rotate(270');


   // Determine width, height & color
   l_svg = C_icon[p_icon] || '';
   l_svg = l_svg.replace('%%',p_width);
   l_svg = l_svg.replace('%%',p_height);
   l_svg = l_svg.replace('%%',p_color);

   if (p_is_css_background) return '{ background : url(data:image/svg+xml;base64,' + btoa(l_svg) + ') no-repeat; }';

   return l_svg;
}  // get_svg_icon

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_model.js
// 2016-09-20 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */



/***************************************************************************
* Add custom method to Xplug
* METHOD: getComponentProperties
***************************************************************************/
Xplug.prototype.getComponentProperties = function (pPropTypeEnum) {
   'use strict';

   var oProp, oCompProp, oComp_arr, oCompRef_arr, oCompProp_arr;
   var oResultProp_arr = [];                        // Our resultset array

   try {
        oProp = pe.getProperty(pPropTypeEnum);      // Get property
   } catch(e) {
        return;
   }
   oCompRef_arr = oProp.refByComponentTypes;        // Get component types that reference specified property

   // Loop over result set
   for (var i=0; i < oCompRef_arr.length; i++) {

        // Get all components on page that match the component type
        oComp_arr = pe.getComponents(oCompRef_arr[i]);

        // Loop over the components result set
        for (var j=0; j < oComp_arr.length; j++) {

            // Get all properties of component
            oCompProp_arr = oComp_arr[j]._properties;

            // Get our matching property
            oCompProp = oCompProp_arr[pPropTypeEnum];

            // Save in our resultset array
            oResultProp_arr.push(oCompProp);
        }
   }
   return oResultProp_arr;
}; // getComponentProperties



/***************************************************************************
* Add custom method to Xplug
* METHOD: getFilterComponentProperties
***************************************************************************/
Xplug.prototype.getFilteredComponentProperties = function (pPropTypeEnum, pParentId) {
  'use strict';

  var oAllProp_arr    = this.getComponentProperties(pPropTypeEnum);
  var oResultProp_arr = [];                        // Our resultset array

  // Loop over propteries
  for (var idx in oAllProp_arr) {

      // Check if attribute _value has a value set
      if (    oAllProp_arr[idx].hasOwnProperty('_value')
           && oAllProp_arr[idx]._value.length > 0) {

           if ( (typeof(pParentid) !== undefined) && (pParentId !== undefined) ) {
             // ParentId specified, so only save if it matches
             if (    oAllProp_arr[idx].hasOwnProperty('component')
                  && oAllProp_arr[idx].component.hasOwnProperty('parentId')
                  && oAllProp_arr[idx].component.parentId == pParentId) {

                  oResultProp_arr.push(oAllProp_arr[idx]);
             }
           } else {
             // No parentId specified, so save
             oResultProp_arr.push(oAllProp_arr[idx]);
           }    // if
      }         // if
  }             // for
  return oResultProp_arr;
}; // getFilteredComponentProperties

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_feature_prevnext_page.js
// 2016-07-28 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */
/* jshint -W083 */


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: Go to previous page
 ***************************************************************************/
window.pageDesigner.goToPrevPage = function () {
  var l_page  = pe.getCurrentPageId();   // get Currrent page from PageDesigner model
  var l_index = -1;
  var l_prev  = -1;

  //
  // Look for index of page in array
  //
  for (var i=0; l_index == -1 && i<xplug.arr_page_list.length; i++) {
      if (xplug.arr_page_list[i].id == l_page) l_index = i;
  }

  //
  // Found previous page, now goto page
  //
  if (l_index > -1) {
    l_prev = xplug.arr_page_list[l_index > 0 ? l_index - 1
                                             : l_index].id;
  } else {
    return;
  }

  if (l_prev != l_page) {
    //
    // Temporary disable actions until new page has loaded completely
    //
    apex.actions.disable('pd-xplug-goto-previous-page');
    apex.actions.disable('pd-xplug-goto-next-page');

    //
    // Get page and re-enable buttons/actions
    //
    var l_deferred = window.pageDesigner.goToPage( l_prev );
    $.when( l_deferred )
            .done( function()
                   {
                      apex.actions.enable('pd-xplug-goto-previous-page');
                      apex.actions.enable('pd-xplug-goto-next-page');
                   })
            .fail( function(reason)
                   {
                      apex.actions.enable('pd-xplug-goto-previous-page');
                      apex.actions.enable('pd-xplug-goto-next-page');
                   });

    return;
  }
}; //  window.pageDesigner.goToPrevPage



/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: Go to next page
 ***************************************************************************/
window.pageDesigner.goToNextPage = function () {
  var l_page  = pe.getCurrentPageId();   // get Currrent page from PageDesigner model
  var l_index = -1;
  var l_next  = -1;

  //
  // Look for index of page in array
  //
  for (var i=0; l_index == -1 && i<xplug.arr_page_list.length; i++) {
      if (xplug.arr_page_list[i].id == l_page) l_index = i;
  }

  //
  // Found next page, now goto page
  //
  if (l_index > -1) {
     l_next = xplug.arr_page_list[l_index < xplug.arr_page_list.length - 1 ? l_index + 1
                                                                           : l_index].id;
  } else {
    return;
  }

  if (l_next != l_page) {
    //
    // Temporary disable actions until new page has loaded completely
    //
    apex.actions.disable('pd-xplug-goto-previous-page');
    apex.actions.disable('pd-xplug-goto-next-page');

    //
    // Get page and re-enable buttons/actions
    //
    var l_deferred = window.pageDesigner.goToPage( l_next );
    $.when( l_deferred )
            .done( function()
                   {
                      apex.actions.enable('pd-xplug-goto-previous-page');
                      apex.actions.enable('pd-xplug-goto-next-page');
                   })
            .fail( function(reason)
                   {
                      apex.actions.enable('pd-xplug-goto-previous-page');
                      apex.actions.enable('pd-xplug-goto-next-page');
                   });

    return;
  }
}; // window.pageDesigner.goToNextPage


/****************************************************************************
 * Private helper function
 * Get page list
 ***************************************************************************/
Xplug.prototype._get_page_list = function(pCallback)
{
  'use strict';

  // Get list of pages in JSON format and store result in array.
  // Code based on getPagesLov() in images/apex_ui/js/pe.model.js
  apex.server.process
     (
        "getPages", {
                      x01:  "Y" ,
                      x02:  "userInterfaceId" ,
                      x03:  ""
                    },
        {
          success : function(pPageList)
                    {
                       xplug.arr_page_list = pPageList;

                       if (typeof(pCallback) === 'function') {
                          pCallback.call();
                       }
                    }
        }
     );
}; // _get_page_list


/****************************************************************************
 * Private helper function
 * Set attribute 'title' of prev/next buttons
 ***************************************************************************/
Xplug.prototype._set_button_tooltip_prevnext_page = function()
{
  var l_shortcut_prev_page = apex.actions.lookup('pd-xplug-goto-previous-page').shortcut;
  var l_shortcut_next_page = apex.actions.lookup('pd-xplug-goto-next-page').shortcut;

  $("button#ORATRONIK_XPLUG_prev_page_button")
     .attr('title', '[' + l_shortcut_prev_page + '] ' + get_label('PREVPAGE') );

  $("button#ORATRONIK_XPLUG_next_page_button")
     .attr('title', '[' + l_shortcut_next_page + '] ' + get_label('NEXTPAGE') );
}; // _set_button_tooltip_prevnext_page



/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: Go to previous page
 ***************************************************************************/
window.pageDesigner.goToPrevPage = function () {
  var l_page  = pe.getCurrentPageId();   // get Currrent page from PageDesigner model
  var l_index = -1;
  var l_prev  = -1;


  function _enable_buttons() {
      apex.actions.enable('pd-xplug-goto-previous-page');
      apex.actions.enable('pd-xplug-goto-next-page');
      xplug._set_button_tooltip_prevnext_page();
  } // _enable_buttons



  //
  // Look for index of page in array
  //
  for (var i=0; l_index == -1 && i<xplug.arr_page_list.length; i++) {
      if (xplug.arr_page_list[i].id == l_page) l_index = i;
  }

  //
  // Found previous page, now goto page
  //
  if (l_index > -1) {
    l_prev = xplug.arr_page_list[l_index > 0
                                    ? l_index - 1
                                    : l_index].id;
  } else {
    //
    // We did not find the poage
    //
    //
    // We did not find the poage
    //
    console.debug('XPLUG - Did not find page ' + l_page + ', will retry.');
    xplug._get_page_list(function () { window.pageDesigner.goToPrevPage(); } );

    return;
  }

  if (l_prev != l_page) {
    //
    // Temporary disable actions until new page has loaded completely
    //
    apex.actions.disable('pd-xplug-goto-previous-page');
    apex.actions.disable('pd-xplug-goto-next-page');


    //
    // Get page and re-enable buttons/actions
    //
    var l_deferred = window.pageDesigner.goToPage( l_prev );
    $.when( l_deferred )
            .done( function()        { _enable_buttons(); })
            .fail( function(reason)  { _enable_buttons(); });

    return;
  }
}; //  window.pageDesigner.goToPrevPage



/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: Go to next page
 ***************************************************************************/
window.pageDesigner.goToNextPage = function () {

  'use strict';

  var l_page  = pe.getCurrentPageId();   // get Currrent page from PageDesigner model
  var l_index = -1;
  var l_next  = -1;


  function _enable_buttons() {
      apex.actions.enable('pd-xplug-goto-previous-page');
      apex.actions.enable('pd-xplug-goto-next-page');
      xplug._set_button_tooltip_prevnext_page();
  } // _enable_buttons



  //
  // Look for index of page in array
  //
  for (var i=0; l_index == -1 && i<xplug.arr_page_list.length; i++) {
      if (xplug.arr_page_list[i].id == l_page) l_index = i;
  }

  //
  // Found next page, now goto page
  //
  if (l_index > -1) {
     l_next = xplug.arr_page_list[l_index < xplug.arr_page_list.length - 1
                                          ? l_index + 1
                                          : l_index].id;

  } else {
    //
    // We did not find the poage
    //
    console.debug('XPLUG - Did not find page ' + l_page + ', will retry.');
    xplug._get_page_list(function () { window.pageDesigner.goToNextPage(); } );

    return;
  }

  if (l_next != l_page) {
    //
    // Temporary disable actions until new page has loaded completely
    //
    apex.actions.disable('pd-xplug-goto-previous-page');
    apex.actions.disable('pd-xplug-goto-next-page');

    //
    // Get page and re-enable buttons/actions
    //
    var l_deferred2 = window.pageDesigner.goToPage( l_next );
    $.when( l_deferred2 )
            .done( function()        { _enable_buttons(); })
            .fail( function(reason)  { _enable_buttons(); });

    return;
  }
}; // window.pageDesigner.goToNextPage


/****************************************************************************
 * Install buttons for going to previous / next page
 ***************************************************************************/
Xplug.prototype.installPageButtons = function ()
{
  if  ( $('button#ORATRONIK_XPLUG_prev_page_button').length == 1 ) return;

  var l_node = $('button#ORATRONIK_XPLUG_moonsun_button').length == 1
                   ? 'button#ORATRONIK_XPLUG_moonsun_button'
                   : 'div.a-PageSelect';

  var l_class_btn_left, l_class_btn_right;

  if (xplug.apex_version.substring(0,4) === '5.1.') {
    l_class_btn_left  = ' class="a-Button a-Button--noLabel a-Button--withIcon js-actionButton a-Button--gapLeft a-Button--simple"';
    l_class_btn_right = ' class="a-Button a-Button--noLabel a-Button--withIcon js-actionButton a-Button--gapRight a-Button--simple"';
  } else {
    l_class_btn_left  = ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillStart js-actionButton"';
    l_class_btn_right = ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillEnd js-actionButton"';
  }

  $(l_node)
      .before( '<button'
             + ' type="button"'
             + ' ID="ORATRONIK_XPLUG_prev_page_button"'
             + l_class_btn_left
             + ' data-action="pd-xplug-goto-previous-page"'
             + '>'
             + ' <span class="a-Icon icon-xplug-previous" aria-hidden="true"></span>'
             + '</button>'

             + '<button'
             + ' type="button"'
             + ' ID="ORATRONIK_XPLUG_next_page_button"'
             + l_class_btn_right
             + ' data-action="pd-xplug-goto-next-page"'
             + '>'
             + ' <span class="a-Icon icon-xplug-next" aria-hidden="true"></span>'
             + '</button>'
           );

   xplug._set_button_tooltip_prevnext_page();
   xplug._get_page_list();
   xplug.setStorage('BTN-PRVNEXT-PAGE','YES');
}; // installPageButtons



/****************************************************************************
 * Deinstall buttons for going to previous / next page
 ***************************************************************************/
Xplug.prototype.deinstallPageButtons = function ()
{
  $('button#ORATRONIK_XPLUG_prev_page_button,button#ORATRONIK_XPLUG_next_page_button')
      .remove();

  xplug.setStorage('BTN-PRVNEXT-PAGE','NO');
}; // deinstallPageButtons

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
 * Add custom method to pageDesigner Object
 * METHOD: Dock grid to the right
 ***************************************************************************/
window.pageDesigner.dockGridRight = function()
{
    'use strict';

    //
    // Exit if not in APEX Page Designer
    //
    if (typeof(window.pageDesigner) != 'object') {
       return 0;
    }

    // Remove splitter classes before swapping panes.
    var sClass = $('div#xplug_pb_splitter').attr('class');
    $('div#xplug_pb_splitter').removeAttr('class');



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // We have the following setup in the DOM tree:
    //
    //  <DIV id="sp_right_content" class="a-Splitter">
    //      <DIV id="top_col" class="a-PageColumn">...</DIV> <DIV class="a-Splitter-barH">...</DIV> <DIV id="right_col" class="a-PageColumn">...</DIV>
    //  </DIV>
    //
    // Remarks:
    // * Positioning of child DIV's of <DIV id="sp_right_content"> is absolute.
    // * In the splitter widget, the private property before$ points to the DIV before <DIV class="a-Splitter-barH"></DIV>
    // * In the splitter widget, the private property after$ points to the DIV following <DIV class="a-Splitter-barH"></DIV>
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var C_MIDDLE_PANE      = 'div#a_PageDesigner div#top_col',                                 // Page Builder: middle pane (Grid Layout/Messages/Page Search/...)
        C_PROP_PANE        = 'div#a_PageDesigner div#right_col',                               // Page Builder: right pane  (Properties Editor)
        C_SPLIT_HANDLE     = 'div#a_PageDesigner div.a-Splitter-barH:eq(1)',                   // Page Builder: 2nd splitter handle/separator
        C_SP_RIGHT_CONTENT = 'div#sp_right_content';                                           // Page Builder: right pane parent DIV element

    //
    // Step 1: Swap the middle pane and properties pane in the DOM tree.
    //
    $(C_PROP_PANE).insertBefore(C_SPLIT_HANDLE);
    $(C_MIDDLE_PANE).insertAfter(C_SPLIT_HANDLE);

    //
    // Step 2: Recreate the splitter
    //
    // Recreating the splitter is required due to multiple reasons:
    // 1. We can't change the "positionedFrom" property after the splitter is initialized.
    // 2. We can't manipulate the "before$" and "after$" private properties in the splitter widget.
    //
    // See APEX splitter widget for details: /images/libraries/apex/widget.splitter.js
    //
    var l_width_visual    = $(C_MIDDLE_PANE).width();
    var l_width_props     = $(C_PROP_PANE).width();
    var l_width_separator = $(C_SPLIT_HANDLE).width();                                         // Get width of splitter separator (normally 8px)
    var l_split_options   = $(C_SP_RIGHT_CONTENT).splitter('option');                          // Get splitter widget options

    l_split_options.positionedFrom = "begin";                                                  // We change this from "end" to "begin"
    l_split_options.position       = l_width_props;                                            // Re-position splitter separator
    $(C_SP_RIGHT_CONTENT).splitter('destroy');                                                 // Remove existing splitter JS object & DOM object
    apex.jQuery(C_SP_RIGHT_CONTENT).splitter(l_split_options);                                 // Create new splitter JS object & DOM object using our stored options

    xplug.setStorage('PANES_SWITCHED','YES');                                                  // Save option in local database

    // Recover splitter classes after switching panes
    $('div#xplug_pb_splitter').attr('class',sClass);

    return 1;
}; // window.pageDesigner.dockGridRight



/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: Dock grid in the middle
 ***************************************************************************/
window.pageDesigner.dockGridMiddle = function()
{
    'use strict';

    //
    // Exit if not in APEX Page Designer
    //
    if (typeof(window.pageDesigner) != 'object') {
       return 0;
    }


    // Remove splitter classes before swapping panes.
    var sClass = $('div#xplug_pb_splitter').attr('class');
    $('div#xplug_pb_splitter').removeAttr('class');

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // We have the following setup in the DOM tree:
    //
    //  <DIV id="sp_right_content" class="a-Splitter">
    //      <DIV id="right_col" class="a-PageColumn">...</DIV> <DIV class="a-Splitter-barH">...</DIV> <DIV id="top_col" class="a-PageColumn">...</DIV>
    //  </DIV>
    //
    // Remarks:
    // * Positioning of child DIV's of <DIV id="sp_right_content"> is absolute.
    // * In the splitter widget, the private property before$ points to the DIV before <DIV class="a-Splitter-barH"></DIV>
    // * In the splitter widget, the private property after$ points to the DIV following <DIV class="a-Splitter-barH"></DIV>
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var C_MIDDLE_PANE      = 'div#a_PageDesigner div#top_col',                                 // Page Builder: middle pane (Grid Layout/Messages/Page Search/...)
        C_PROP_PANE        = 'div#a_PageDesigner div#right_col',                               // Page Builder: right pane  (Properties Editor)
        C_SPLIT_HANDLE     = 'div#a_PageDesigner div.a-Splitter-barH:eq(1)',                   // Page Builder: 2nd splitter handle/separator
        C_SP_RIGHT_CONTENT = 'div#sp_right_content';                                           // Page Builder: right pane parent DIV element

    //
    // Step 1: Swap the middle pane and properties pane in the DOM tree.
    //
    $(C_PROP_PANE).insertAfter(C_SPLIT_HANDLE);
    $(C_MIDDLE_PANE).insertBefore(C_SPLIT_HANDLE);

    //
    // Step 2: Recreate the splitter
    //
    // Recreating the splitter is required due to multiple reasons:
    // 1. We can't change the "positionedFrom" property after the splitter is initialized.
    // 2. We can't manipulate the "before$" and "after$" private properties in the splitter widget.
    //
    // See APEX splitter widget for details: /images/libraries/apex/widget.splitter.js
    //
    var l_width_visual    = $(C_MIDDLE_PANE).width();
    var l_width_props     = $(C_PROP_PANE).width();
    var l_width_separator = $(C_SPLIT_HANDLE).width();                                         // Get width of splitter separator (normally 8px)
    var l_split_options   = $(C_SP_RIGHT_CONTENT).splitter('option');                          // Get splitter widget options

    l_split_options.positionedFrom = "end";                                                    // We change this from "begin" to "end
    l_split_options.position       = l_width_props;                                            // Re-position splitter separator
    $(C_SP_RIGHT_CONTENT).splitter('destroy');                                                 // Remove existing splitter JS object & DOM object
    apex.jQuery(C_SP_RIGHT_CONTENT).splitter(l_split_options);                                 // Create new splitter JS object & DOM object using our stored options

    xplug.setStorage('PANES_SWITCHED','NO');                                                   // Save option in local database

    // Recover splitter classes after switching panes
    $('div#xplug_pb_splitter').attr('class',sClass);

    return 1;
}; // window.pageDesigner.dockGridMiddle




/****************************************************************************
 * Set attribute 'title' of swap panes button
 ***************************************************************************/
 Xplug.prototype._set_button_tooltip_swap_grid = function()
{
  var l_shortcut = apex.actions.lookup('pd-xplug-swap-grid-pane').shortcut;

  $("button#ORATRONIK_XPLUG_swap_panes_button")
     .attr('title', '[' + l_shortcut + '] ' + get_label('BTN-SWAP-GRID-PANE') );

}; // _set_button_tooltip_swap_grid





/****************************************************************************
 * Install swap grid pane button
 ***************************************************************************/
 Xplug.prototype.installSwapGrid = function ()
 {
   'use strict';

   if  ( $('button#ORATRONIK_XPLUG_swap_panes_button').length == 1 ) return;

   var l_class_btn;

   if (xplug.apex_version.substring(0,4) === '5.1.') {
     l_class_btn = ' class="a-Button a-Button--noLabel a-Button--withIcon js-actionButton a-Button--simple"';
   } else {
     l_class_btn = ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillStart js-actionButton"';
   }


   $('button#glvExpandRestoreBtn')
            .after( '<button'
                  + ' type="button"'
                  + ' ID="ORATRONIK_XPLUG_swap_panes_button"'
                  + l_class_btn
                  + ' data-action="pd-xplug-swap-grid-pane"'
                  + '>'
                  + ' <span class="a-Icon icon-xplug-arrows-h" aria-hidden="true"></span>'
                  + '</button>'
            );

   xplug._set_button_tooltip_swap_grid();

   xplug.setStorage('BTN-SWAP-GRID-PANE','YES');

 }; // installSwapGrid



/****************************************************************************
 * Deinstall swap grid pane button
 ***************************************************************************/
 Xplug.prototype.deinstallSwapGrid = function ()
 {
   $('button#ORATRONIK_XPLUG_swap_panes_button').remove();

   xplug.setStorage('BTN-SWAP-GRID-PANE','NO');
 }; // DeinstallSwapGrid

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_feature_sidekick.js
// 2016-02-07 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Initialisation code
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#ORATRONIK_XPLUG_SIDEKICK_MENU').remove();

var l_menu$ = $("<div id='ORATRONIK_XPLUG_SIDEKICK_MENU'></div>");
$("body").append(l_menu$);

l_menu$.menu(
{
  items : [
    {
      type     : "toggle",
      label    : get_label('LBL-HIDE'),
      get      : function()
                 {
                    return 0;
                 },
      set      : function()
                 {
                    apex.actions.invoke('pd-xplug-remove-sidekick');
                 },
      disabled : function()
                 {
                   return false;
                 }
    },
    { type     : "separator" },
    { type     : "toggle",
    label    : get_label('LBL-ENABLE-MARKDOWN'),
    get      : function()
               {
                  return xplug.getStorage('MARKDOWN_ENABLED','NO',true) == 'YES';
               },
    set      : function()
               {
                  var sMode = xplug.getStorage('MARKDOWN_ENABLED','NO',true) == 'YES'
                            ? 'NO'
                            : 'YES';

                  xplug.setStorage('MARKDOWN_ENABLED',sMode,true);
                  xplug.showDocumentation();
               },
    disabled : function()
               {
                 return false;
               }
  },


  ]
});


/***************************************************************************
* Add custom method to Xplug
* METHOD: installSidekick
***************************************************************************/
Xplug.prototype.resizeSidekick = function(p_factor)
{
  'use strict';

  var c_min_factor = 0.25;
  var c_max_factor = 0.50;
  var l_factor     = c_max_factor;

  if ( !isNaN(p_factor) && (p_factor >= 0)
                        && (p_factor <= 0.75) ) {
     xplug.setStorage('SIDEKICK_FACTOR', p_factor);
     l_factor = p_factor;
  } else {
     l_factor = xplug.getStorage('SIDEKICK_FACTOR', c_max_factor);
  }

   var l_maxwidth = $('#glv-viewport').width();
   var l_width    = l_maxwidth * l_factor;
   var l_height   = $('div#cg-regions').height();                               // DIV Gallery icons
   var l_display;

   // Resize gallery
   console.debug("resizeSidekick: Request for setting gallery width to: " + l_width + ' px');

   if (l_width < 350) {
     // Collapse Gallery if too small
     l_width   = 0;
     l_display = 'none';
     $('div#xplug_pb_splitter').addClass('is-collapsed');
   } else {
     // Show Gallery
     l_display = 'block';
     $('div#xplug_pb_splitter').removeClass('is-collapsed');
   }
   $('#gallery-tabs')
     .css(
           { width   : l_width + 'px',
             display : l_display
           }
         )
     .trigger('resize');

    // simulated vertical splitter at left of SIDEKICK
    $('div#xplug_pb_splitter').css(
        { 'position'          : 'absolute',
          'top'               : '0px',
          'left'              :  l_width + 'px',
          'width'             : '8px',
          'height'            : '100%',
          'background-color'  : $('.a-Splitter-barH').css('background-color'),
          'border-left'       : '1px solid #c0c0c0',
          'border-right'      : '1px solid #c0c0c0',
          'vertical-align'    : 'middle'
        }
    );

    // SIDEKICK container DIV
    $('div#xplug_pb_container').css(
          { 'position'   : 'absolute',
            'top'        : '0px',
            'padding'    : '1px',
            'left'       : (l_width + 8) + 'px',
            'width'      : (l_maxwidth - l_width - 8) + 'px',
            'height'     : l_height + 'px',
            'display'    : 'block'
          });

    $('div#xplug_pb_tabs').css(
          { 'height' : $('div#R1157688004078338241 div.a-Tabs-toolbar').height() + 'px'
        });

    $('div#xplug_pb_msgview').css(
          {  'overflow-y' : 'scroll',
             'height'     : l_height + 'px',

        });
}; // Xplug.prototype.resizeSidekick





/***************************************************************************
* Add custom method to Xplug
* METHOD: installSidekick
***************************************************************************/
Xplug.prototype.installSidekick = function(p_factor)
{
    'use strict';

    var sEnablePageDetTab = xplug.getStorage('SIDEKICK-TAB-PAGEDET','NO');
    var sPageDetailsLI    = '';
    var sPageDetailsDIV   = '';

    function installTabPowersearch() {
        $('#xplug_pb_search').html(
            '<label for="xplug_search_field" class="a-Form-label" style="margin-right: 5px;">Search</label>'
          + '<input type="text" size=40 maxlength=255 ID=xplug_search_field>'

          + '<div'
                 + ' ID="ORATRONIK_XPLUG_clear_search_button"'
                 + ' style="padding: 3px; display: inline-block;">'
                 + ' <span class="a-Icon icon-xplug-forbidden" aria-hidden="true"></span>'
          + '</div>'
          + '<div ID="xplug_search_results"></div>'
        ).css('padding','3px');

        $('#xplug_search_field').keypress(
           function() {
               var l_search = $('#xplug_search_field').val();
               if (l_search.length > 0) {
                  $('#xplug_search_results').peSearch('search',l_search);
               } else {
                  clearPowersearch();
               }
           }
        );

        $('#xplug_search_results').peSearch();
        $('#ORATRONIK_XPLUG_clear_search_button').click(clearPowersearch);

        $( document ).on( "modelCleared", function(){
          clearPowersearch();
        });
    } // installTabPowersearch


    function clearPowersearch() {
      $('#xplug_search_field').val('');
      $('#xplug_search_results').peSearch('clear');
      $('#xplug_pb_search').css('height','100%');
    }


  // Sidekick tab "Page Details"
  if (sEnablePageDetTab == 'YES') {
     sPageDetailsLI  = '<li><a href="#xplug_pb_docu">' + get_label('TAB-PB-DOCU') + '</a></li>';
     sPageDetailsDIV = '<div ID="xplug_pb_docu"   style="overflow-y: scroll; height: 100%;"></div>';

  }


  // Add (simulated) vertical splitter bar and SIDEKICK DIV to DOM
  $('#R1157688004078338241').append(
         '<div ID="xplug_pb_splitter" class="a-Splitter-barH">'
       +     '<button ID="xplug_pb_splitter_btn" role="separator" class="a-Splitter-thumb" type="button" aria-expanded="true" title="Collapse"></button>'
       + '</div>'
       + '<div ID="xplug_pb_container" class="a-TabsContainer ui-tabs--subTabButtons">'
       +   '<div ID="xplug_pb_tabs" class="a-Tabs-toolbar a-Toolbar">'
       +     '<ul>'
       +       sPageDetailsLI
       +       '<li><a href="#xplug_pb_msgview">'  + get_label('TAB-PB-MESSAGES')    + '</a></li>'
       +       '<li><a href="#xplug_pb_search">'   + get_label('TAB-PB-SEARCH')      + '</a></li>'
       +     '</ul>'
       +    '<div style="text-align: right">'
       +     '<span id="xplug_pb_badge" class="a-AlertBadge" style="margin-top: 10px; cursor: pointer;  "></span>'
       +    '</div>'
       +   '<div ID="xplug_pb_right" class="a-Toolbar-items a-Toolbar-items--right"> '
       +   '</div>'
       +   '</div>'
       +   sPageDetailsDIV
       +   '<div ID="xplug_pb_msgview"></div>'
       +   '<div ID="xplug_pb_search" style="overflow-y: scroll; height: 100%;"></div>'
       + '</div>'
  );


  // Add hamburger menu
  $('div#xplug_pb_right')
            .append( '<button'
                   + ' type="button"'
                   + ' ID="ORATRONIK_XPLUG_powercontrol_button2"'
                   + ' data-menu="ORATRONIK_XPLUG_SIDEKICK_MENU"'
                   + ' class="a-Button a-Button--noLabel a-Button--withIcon js-menuButton">'
                   + ' <span class="a-Icon icon-menu" aria-hidden="true"></span>'
                   + ' <span class="a-Icon icon-menu-drop-down" aria-hidden="true"></span>'
                   + '</button>'
                 )
            .css('width','48px');


  // Create new tabs
  $('div#xplug_pb_container').tabs();   // jQuery UI tabs
  this.resizeSidekick(p_factor);        // Show SIDEKICK


  // Activate standard "Messages" tab if our own badge is clicked.
  $('#xplug_pb_badge').on('click', function () { $('div#editor_tabs').tabs( "option", "active", 1); });


  //
  // Turn our fake splitter into a draggable
  //
  $('div#xplug_pb_splitter').draggable(
       { axis : "x",
         stop : function () {
                  var l_factor = parseInt( $('div#xplug_pb_splitter').css('left').replace('px','') ) / $('#R1157688004078338241').width();
                  console.log("Done dragging. Factor = " + l_factor);
                  xplug.resizeSidekick(l_factor);
                }
       }
  );

  // Collapse or expand our fake splitter if button clicked
  $('button#xplug_pb_splitter_btn').on('click',
    function()
      {
        var l_factor = $('div#xplug_pb_splitter').hasClass('is-collapsed') ? 0.5 : 0;
        xplug.resizeSidekick(l_factor);
      }
  );

  // Install "Search" tab
  installTabPowersearch();

  // Resize-redraw SIDEKICK when splitter(s) are moved/created
  $( "body" ).on( "splitterchange.xplug_namespace splittercreate.xplug_namespace", xplug.resizeSidekick);
   // ???????????????????????
   // STIL VALID ?
   // ???????????????????????




  // Resize-redraw SIDEKICK when switching tabs (Grid Layout, Messages, ...)
  // See jQuery UI tabs for details on 'activate' attribute
  $( "div#editor_tabs, div#R1157688004078338241" )
    .tabs(
           { activate: xplug.resizeSidekick }
         );

  //
  // Webkit and others continously fire resize events while resizing, which
  // is a browser performance killer. Should basically only be fired when
  // resizing has stopped.
  //
  // As a workaround only call our event handler if there were no resize events
  // in the last 300 miliseconds.
  //
  // Also added our namespace to the resize event, because later on we only
  // want to kill our own resize handler, not the original one from Page Designer.
  //
  var l_timeout_handler;
  $(window).on('resize.xplug_namespace',
                function()
                      {
                         clearTimeout(l_timeout_handler);
                         l_timeout_handler = setTimeout(
                           function() {
                              xplug.resizeSidekick();
                         } , 300);
                      }
  );

  $('div#xplug_pb_msgview').peMessagesView({ badge : '#xplug_pb_badge' });
  $('div#gallery-tabs').trigger('resize');

  xplug.setStorage('SHOW_SIDEKICK_PANE','YES');

  //
  // We need to register our own observer, because the original observer in
  // the peMessagesView widget gets setup the next time when the modelReady event
  // is fired, which has already happened by the time we get here.
  //
  // Due to this the logic would only start working if we navigate to another page
  // (=new modelReady event as JSON page is loaded and processed)
  // Take a look at /images/apex_ui/js/widget.peMessagesView.js for Details.
  //
  //
  // Nice benefit of having an own observer is that we can also automatically
  // switch to our "Messages"-tab if an error is detected
  //
  // We interact with the running widget instance.
  // See http://stackoverflow.com/questions/8506621/accessing-widget-instance-from-outside-widget
  var l_widget = $('div#xplug_pb_msgview').data('apex-peMessagesView');

  // Listen for all events which have an impact on displayed error or warning messages
  pe.observer(
      "messages_" + l_widget.uuid, {
          events: [
              pe.EVENT.ERRORS,
              pe.EVENT.NO_ERRORS,
              pe.EVENT.WARNINGS,
              pe.EVENT.NO_WARNINGS,
              pe.EVENT.DELETE,
              pe.EVENT.REMOVE_PROP ]
      },
      function( pNotifications ) {
          $('div#xplug_pb_container')
            .tabs( "option",
                   "active",
                   xplug.getStorage('SIDEKICK-TAB-PAGEDET','NO') == 'YES' ? 1 : 0);
          l_widget._update( pNotifications );
      }
   ); // pe.observer

   if (xplug.getStorage('SIDEKICK-TAB-PAGEDET','NO') == 'YES') {
     $(document).on('modelReady', this.showDocumentation);

     //
     // Show page details if page was saved
     //
     // NOTE: Did not yet find an elegant way to detect when a page was saved
     //       This fires too often, but bRefresh checks if it's ok to show
     //       page details.
     //
     $( document ).on("commandHistoryChange", function() {
       if  (pe.hasChanged() === false) {
           // Page is clean, it is ok to show page Details (if enabled)
           var bRefresh =    (xplug.getStorage('SHOW_SIDEKICK_PANE','NO')   == 'YES')
                          && (xplug.getStorage('SIDEKICK-TAB-PAGEDET','NO') == 'YES');

           if (bRefresh === true) {
              xplug.showDocumentation();
           }
       }  // if
     });  // commandHistoryChange

     this.showDocumentation();
   }
}; // Xplug.prototype.installSidekick


/***************************************************************************
* Add custom method to Xplug
* METHOD: deinstallSIDEKICK
***************************************************************************/
Xplug.prototype.deinstallSidekick = function()
{
  'use strict';

  // Detach our own resize handler
  $(window).off('resize.xplug_namespace');
  $('body').off('splitterchange.xplug_namespace splittercreate.xplug_namespace');
  $( "div#editor_tabs, div#R1157688004078338241" ).tabs( { activate: null } );

  // Remove Sidekick
  $('div#xplug_pb_splitter,div#xplug_pb_container').remove();

  // Restore original gallery width and trigger redrawing/reposition of icons
  $('div#gallery-tabs')
      .css( {
             width   : $('div#glv-viewport').css('width'),
             display : 'block'
            } )
      .trigger('resize');

  this.setStorage('SHOW_SIDEKICK_PANE','NO');

  $(document).off('modelReady', this.showDocumentation);
}; // Xplug.prototype.deinstallSidekick

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_feature_sidekick_markdown.js
// 2016-02-07 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */



Xplug.prototype.showDocumentation = function ()
{
  'use strict';

  var oProp, sAppId, sChangedBy, sChangedOn, sPageComment, sHTML, sFragment, oRenderer;

  // Get Page details
  sAppId       = pe.getCurrentAppId();                                     // Appp-ID
  oProp        = xplug.getFilteredComponentProperties(381,sAppId)[0];      // 381=Changed By
  sChangedBy   = typeof(oProp) == 'object' ? oProp.getDisplayValue()
                                           : 'none';

  oProp        = xplug.getFilteredComponentProperties(382,sAppId)[0];      // 382=Changed On
  sChangedOn   = typeof(oProp) == 'object' ? oProp.getDisplayValue()
                                           : '-';

  oProp        = xplug.getFilteredComponentProperties(4,sAppId)[0];        // 4=Comment
  sPageComment = typeof(oProp) == 'object' ? oProp.getDisplayValue()
                                           : '';


  // Setup custom markdown link renderer
  // Is required, because links always need to be opened in a new tab/window.
  // Otherwise we would leave Page Designer
  oRenderer = new marked.Renderer();
  oRenderer.link  = function(shref, sTitle, sText) {
                      var sURL =  '<a href="' + shref + '" target="_blank">' + sText + '</a>';
                      return sURL;
                    };

  marked.setOptions({ sanitize : true,
                      gfm      : true,                                     // Github markdown mode
                      breaks   : true,                                     // GFM line break mode
                      renderer : oRenderer });


  // Render markdown if enabled, but always sanitize output for avoiding XSS
  if (xplug.getStorage('MARKDOWN_ENABLED','NO',true) == 'YES') {
    sFragment = marked(sPageComment);                                      // Using marked.js
  } else {
    sFragment = '<pre>' + sPageComment + '</pre><br>';
  }
  sFragment = filterXSS(sFragment);                                        // Using xss.js


  // Build page details
  if (sFragment.length > 0) sFragment += '<br>';
  sHTML = sFragment
        + '<h2>Page history</h2>'
        + 'Latest change by ' + sChangedBy + ' on ' + sChangedOn;

  $('div#xplug_pb_docu').html(sHTML).css('padding','5px');
  $('div#xplug_pb_docu pre').css('display','inline');
}; // showDocumentation


// TODO
// To change a visible comment
// $("textarea[data-property-id='4']").val('blabla').trigger('change')

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_storage.js
// 2016-01-03 * Initial version
// 2016-01-03 * Possibility to set/retrieve global keys (meaning not dependant on host url)
// 2016-01-04 * Added getStorageKeys method for retrieving all Xplug keys in localStorage
// 2016-01-07 * Added delStorage method for deleting entries
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */

Xplug.prototype.setStorage = function(p_key, p_value, p_is_global)
    {
      p_is_global = typeof(p_is_global) == 'undefined' ? false
                                                       : p_is_global === true;

      if (typeof(localStorage) == 'object') {
         var l_key = p_is_global ? 'APEX_XPLUG#GLOBAL#' + p_key
                                 : 'APEX_XPLUG#' + location.host + location.pathname + '#' + p_key;

         if (localStorage === null) {
            console.error('XPLUG - Your browser has localStorage disabled. Cannot save ' + p_key);
            return false;
         }
         localStorage.setItem(l_key, p_value);
         return true;
      } else {
         console.error('XPLUG - Your browser does not support localStorage. Cannot save ' + p_key);
         return false;
      }
    }; // Xplug.prototype.setStorage


Xplug.prototype.getStorage = function(p_key, p_default, p_is_global)
    {
      p_is_global = typeof(p_is_global) == 'undefined' ? false
                                                       : p_is_global === true;

      if (typeof(localStorage) == 'object') {
         var l_key = p_is_global ? 'APEX_XPLUG#GLOBAL#' + p_key
                                 : 'APEX_XPLUG#' + location.host + location.pathname + '#' + p_key;

         if (localStorage === null) {
            console.error('XPLUG - Your browser has localStorage disabled. Cannot retrieve ' + p_key);
            return p_default;
         }
         return localStorage.getItem(l_key) || p_default;
      } else {
         console.error('XPLUG - Your browser does not support localStorage. Cannot retrieve ' + p_key);
         return p_default;
      }
    }; // Xplug.prototype.getStorage


    Xplug.prototype.getStorageKeys = function(p_is_global)
    {
      var l_arr_keys = [];

      p_is_global = typeof(p_is_global) == 'undefined' ? false
                                                       : p_is_global === true;

      if (typeof(localStorage) == 'object') {

         var l_prefix = p_is_global ? 'APEX_XPLUG#GLOBAL#'
                                    : 'APEX_XPLUG#' + location.host + location.pathname + '#';

         for ( var i = 0, len = localStorage.length; i < len; ++i ) {
             var l_key = localStorage.key(i);

             if (l_key.substr(0,l_prefix.length) == l_prefix) {
                l_arr_keys.push(l_key.substr(l_prefix.length));                 // Push key without Xplug prefix
             }
         }
         return l_arr_keys;
      }
    }; // Xplug.prototype.getStorageKeys


    Xplug.prototype.delStorage = function(p_key, p_is_global)
        {
          p_is_global = typeof(p_is_global) == 'undefined' ? false
                                                           : p_is_global === true;

          if (typeof(localStorage) == 'object') {
             var l_key = p_is_global ? 'APEX_XPLUG#GLOBAL#' + p_key
                                     : 'APEX_XPLUG#' + location.host + location.pathname + '#' + p_key;

             if (localStorage === null) {
                console.error('XPLUG - Your browser has localStorage disabled. Cannot delete ' + p_key);
                return false;
             }

             localStorage.removeItem(l_key);
             return true;
          } else {
             console.error('XPLUG - Your browser does not support localStorage. Cannot delete ' + p_key);
             return p_default;
          }
        }; // Xplug.prototype.delStorage

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_menu.js
// 2016-01-03 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */
/* jshint -W083 */

Xplug.prototype.install_menu = function() {

    function __install_SubmenuPickStyles() {
       var l_arr_menu_items = [];
       var l_arr_keys       = [];

       if (xplug.getStorage('STYLE_Moonlight','NOT_EXIST',true) == 'NOT_EXIST') {
          window.pageDesigner.setStyle('Moonlight','SAVE_ONLY');
       }

       l_arr_keys = xplug.getStorageKeys(true);

       for (var i = 0, l_length = l_arr_keys.length; i < l_length; ++i ) {
           var l_key = l_arr_keys[i];

           if (l_key.substr(0,6) == 'STYLE_') {
              var l_style = JSON.parse(xplug.getStorage(l_key,null,true));

              if (l_style !== null) {
                var l_label = l_style.STYLE_NAME.substr(0,25);

                l_arr_menu_items.push(
                  { type        : "toggle",
                    label       : l_label,
                    xplug_style : l_style.STYLE_NAME,
                    get         : function()
                                  {
                                    return xplug.getStorage('CURRENT_STYLE',null,true) == this.xplug_style;
                                  },
                    set         : function()
                                  {
                                    window.pageDesigner.loadStyle(this.xplug_style);
                                  }
                  }
                );
             } // if l_style
           }   // if l_key
       }       // for

       l_arr_menu_items.push(
         {
            type  : "toggle",
            label : "Original (none)",
            get   : function()
                    {
                     return xplug.getStorage('CURRENT_STYLE','NONE',true) == 'NONE';
                    },
            set   : function()
                    {
                      apex.actions.invoke('pd-xplug-set-day-mode');
                    }
         }
       );

       l_arr_menu_items.push(

         { type   : "separator" },

         {
           type     : "action",
           label    : get_label('LBL-STYLE-GALLERY'),
           icon    : "icon-theme-roller",
           action   : function()
                      {
                         window.pageDesigner.customizeStyle(get_label('LBL-STYLE-CUSTOM'));
                      },
           disabled : function()
                      {
                        return $('#ORATRONIK_XPLUG_DIALOG_STYLE_LOV').length > 0;
                      }
         }
       );

       return l_arr_menu_items;
    } // install_SubmenuPickStyles


    function install_SubmenuDockGrid() {
       var l_arr_menu_items = [];

       l_arr_menu_items.push(
         {
            type  : "radioGroup",

            get : function () {
                    return $('div#top_col').prevAll('div#right_col').length == 1
                              ? "RIGHT"
                              : "MIDDLE";
                  },

            set : function(l_radio_value) {
                      switch(l_radio_value) {
                          case "LEFT"   : apex.actions.invoke('pd-xplug-dock-grid-left');
                                          break;
                          case "MIDDLE" : apex.actions.invoke('pd-xplug-dock-grid-middle');
                                          break;
                          case "RIGHT"  : apex.actions.invoke('pd-xplug-dock-grid-right');
                                          break;
                      }
                   },

            choices : [
                {   label : get_label('LBL-LEFT'),   value : "LEFT",   disabled : true  },
                {   label : get_label('LBL-MIDDLE'), value : "MIDDLE", disabled : false },
                {   label : get_label('LBL-RIGHT'),  value : "RIGHT",  disabled : false }
            ]
         }
       );

       return l_arr_menu_items;
    } // install_SubmenuDockGrid


    function install_SubmenuQuickControls() {
       var l_arr_menu_items = [];

       l_arr_menu_items.push(
         {
           type     : "toggle",
           label    : get_label('NOTOOLTIPS'),
           get      : function()
                      {
                         return xplug.getStorage('TOOLTIPS_DISABLED','NO') == 'YES';
                      },

           set      : function()
                      {
                        if (xplug.getStorage('TOOLTIPS_DISABLED','NO') == 'YES') {

                           apex.actions.invoke('pd-xplug-enable-tooltips')
                              ? pageDesigner.showSuccess(get_label('MSG-TT-ENABLE-OK'))
                              : pageDesigner.showError(get_label('MSG-TT-ENABLE-NOK'));

                        } else {

                            apex.actions.invoke('pd-xplug-disable-tooltips')
                            ? pageDesigner.showSuccess(get_label('MSG-TT-DISABLE-OK'))
                            : pageDesigner.showError(get_label('MSG-TT-DISABLE-NOK'));
                        }

                        // Remove notification afer 1.5 seconds
                        window.setTimeout( function() {
                                             pageDesigner.hideNotification();
                                           },
                                           1500
                                         );
                      },

           disabled : function() { return false; }
         },

         {
           type     : "toggle",
           label    : get_label('LBL-ADD-SIDEKICK'),
           get      : function()
                      {
                         return xplug.getStorage('SHOW_SIDEKICK_PANE','NO') == 'YES';
                      },

           set      : function()
                      {
                        if (xplug.getStorage('SHOW_SIDEKICK_PANE','NO') == 'YES') {
                           apex.actions.invoke('pd-xplug-remove-sidekick');
                        } else {
                           apex.actions.invoke('pd-xplug-add-sidekick');
                        }
                      },

           disabled : function()
                      {
                        return xplug.getStorage('SHOW_SIDEKICK_PANE','NO') == 'NO' && window.pe.hasChanged() === true;
                      }
         }
       );

       return l_arr_menu_items;
    } // install_SubmenuQuickControls



    // Inject Xplug popup menu into DOM and create jQuery UI custom menu object
    // For details on the APEX popup menu functionality refer to /images/libraries/apex/widget.menu.js
    $('#ORATRONIK_XPLUG_PLUGIN_MENU').remove();

    var l_menu$ = $("<div id='ORATRONIK_XPLUG_PLUGIN_MENU'></div>");
    $("body").append(l_menu$);

    l_menu$.menu(
    {
      items : [
        {
          type     : "subMenu",
          label    : get_label('DOCK-GRID'),
          icon     : "icon-region-native-sql-report",
          menu     : { items : install_SubmenuDockGrid() },
          disabled : function() {
                        return false;
                     },
        },

        { type   : "separator" },

        { type     : "subMenu",
          label    : get_label('QUICK-CTRL'),
          menu     : { items : install_SubmenuQuickControls() },
          disabled : function()
                     {
                       return false;
                     }

        },

        { type     : "separator" },

        { type     : "subMenu",
          label    : get_label('LBL-STYLE'),
          menu     : { items : __install_SubmenuPickStyles() },
          disabled : function()
                     {
                       return $('#ORATRONIK_XPLUG_DIALOG_STYLE_LOV').length > 0;
                     }

        },

        { type     : "separator" },

        { type    : "action",
          label   : get_label('CONFIGURE'),
          icon    : "icon-tools",
          action   : xplug.configureDialog,
          disabled : function()
                     {
                       return 0;
                     }
        },

        { type     : "separator"
        },
        {
          type     : "action",
          label    : xplug.getVersion(),
          disabled : function() {
                         return true;
                     }
        }
      ]
    });
}; // install_menu

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_configure.js
// 2016-05-02 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: configureDialog
 ***************************************************************************/
Xplug.prototype.configureDialog = function()
{
    'use strict';

    //
    // Exit if not in APEX Page Designer
    //
    if (typeof(window.pageDesigner) != 'object') {
       return 0;
    }

    var l_dialog$;
    var l_dialogPE$;
    var l_settings_obj, l_imp_obj;
    var l_properties1 = [];
    var l_properties2 = [];
    var l_properties3 = [];
    var l_properties4 = [];
    var l_out         = apex.util.htmlBuilder();

    l_out.markup('<div')
         .attr('id','ORATRONIK_XPLUG_CONFIG_DIALOG')
         .markup('>')
         .markup('<div')
         .attr('id','ConfigDlgPE')
         .markup('>');


    l_dialog$ = $(l_out.html)
        .dialog(
                { modal   : false,
                  title   : get_label('LBL-XPLUG-SETTINGS'),
                  width   : 450,

                  close   : function(pEvent) {
                               // Hide any remaining notifications
                               pageDesigner.hideNotification();

                               $('#ORATRONIK_XPLUG_CONFIG_DIALOG').remove();
                            },

                  open    : function() {

                               function getStyleLOV(p_mode) {
                                  var l_arr_LOV    = [];
                                  var l_arr_styles = window.pageDesigner.getStyles();

                                  for (var l in l_arr_styles) {
                                      if (   (p_mode == 'DAYLIGHT'  && l_arr_styles[l].DARK_STYLE == 'NO')
                                          || (p_mode == 'MOONLIGHT' && l_arr_styles[l].DARK_STYLE == 'YES') ) {

                                          l_arr_LOV.push({ d: l_arr_styles[l].STYLE_NAME,
                                                           r: l_arr_styles[l].STYLE_NAME
                                                         });
                                      } // if
                                  }     // for

                                  if (p_mode == 'DAYLIGHT') {
                                     l_arr_LOV.push({ d: 'Original (none)', r: 'NONE'});
                                  }

                                  return l_arr_LOV;
                               }


                               l_dialogPE$ = $('#ConfigDlgPE');

                               l_properties1.push(
                                {
                                   propertyName: "show_moonlight_toggle",
                                   value:        xplug.getStorage('BTN-THEME-SWITCH','NO'),
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.YES_NO,
                                       prompt:         '',
                                       noValue:        "NO",
                                       yesValue:       "YES",
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "buttons"
                                   },
                                   errors:   [],
                                   warnings: []
                                });


                              l_properties1.push(
                                {
                                  propertyName: "show_prevnext_buttons",
                                  value:        xplug.getStorage('BTN-PRVNEXT-PAGE','NO'),
                                  metaData: {
                                      type:           $.apex.propertyEditor.PROP_TYPE.YES_NO,
                                      prompt:         '',
                                      noValue:        "NO",
                                      yesValue:       "YES",
                                      isReadOnly:     false,
                                      isRequired:     true,
                                      displayGroupId: "buttons"
                                  },
                                  errors:   [],
                                  warnings: []
                              });


                              if (xplug.apex_version.substring(0,3) == '5.0')  {
                                 l_properties1.push(
                                   {
                                     propertyName: "show_swap_gridpane",
                                     value:        xplug.getStorage('BTN-SWAP-GRID-PANE','NO'),
                                     metaData: {
                                         type:           $.apex.propertyEditor.PROP_TYPE.YES_NO,
                                         prompt:         '',
                                         noValue:        "NO",
                                         yesValue:       "YES",
                                         isReadOnly:     false,
                                         isRequired:     true,
                                         displayGroupId: "buttons"
                                     },
                                     errors:   [],
                                     warnings: []
                                });
                              }  // if


                               //
                               // Build properties for property group 2 (Default styles)
                               //
                               l_properties2.push(
                                  {
                                   propertyName: "default_daylight_style",
                                   value:        xplug.getStorage('DEFAULT_STYLE1','NONE',true),
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.SELECT_LIST,
                                       prompt:         get_label('LBL-DAYLIGHT'),
                                       lovValues:      getStyleLOV('DAYLIGHT'),
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "style_id"
                                   },
                                   errors:   [],
                                   warnings: []
                               });

                               l_properties2.push(
                                 {
                                   propertyName: "default_moonlight_style",
                                   value:        xplug.getStorage('DEFAULT_STYLE2','Moonlight',true),
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.SELECT_LIST,
                                       prompt:         get_label('LBL-MOONLIGHT'),
                                       lovValues:      getStyleLOV('MOONLIGHT'),
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "style_id"
                                   },
                                   errors:   [],
                                   warnings: []
                               });

                               //
                               // Build Properties for property group 3 (Advanced)
                               //
                               l_properties3.push(
                                 {
                                   propertyName: "enhance_pd_title",
                                   value:        xplug.getStorage('APP+ID-IN-PD-TITLE','NO'),
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.YES_NO,
                                       prompt:         get_label('LBL-SHOW-APPID'),
                                       noValue:        "NO",
                                       yesValue:       "YES",
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "advanced"
                                   },
                                   errors:   [],
                                   warnings: []
                               });


                               //
                               // Build Properties for property group 4 (Experimental)
                               //
                               l_properties4.push(
                                 {
                                   propertyName: "enable-tab-pagedet",
                                   value:        xplug.getStorage('SIDEKICK-TAB-PAGEDET','NO'),
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.YES_NO,
                                       prompt:         get_label('LBL-ENABLE-PAGEDET'),
                                       noValue:        "NO",
                                       yesValue:       "YES",
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "experimental"
                                   },
                                   errors:   [],
                                   warnings: []
                               });


                               //
                               // Create Property Editor
                               //
                               $('#ConfigDlgPE').propertyEditor( {
                                 focusPropertyName: "show_moonlight_toggle",
                                 data: {
                                   propertySet: [
                                     {
                                       displayGroupId    : "buttons",
                                       displayGroupTitle : get_label('LBL-SHOW-BUTTONS'),
                                       properties        : l_properties1
                                     },
                                     {
                                       displayGroupId    : "style_id",
                                       displayGroupTitle : get_label('LBL-DEFAULT-STYLES'),
                                       properties        : l_properties2
                                     },
                                     {
                                       displayGroupId    : "advanced",
                                       displayGroupTitle : get_label('LBL-ADVANCED'),
                                       properties        : l_properties3
                                     },
                                     {
                                       displayGroupId    : "experimental",
                                       displayGroupTitle : get_label('LBL-EXPERIMENTAL'),
                                       properties        : l_properties4
                                     }
                                   ] // propertySet
                                 }   // data
                               });   // propertyEditor

                               $( '#ORATRONIK_XPLUG_CONFIG_DIALOG' ).dialog({
                                   position: { 'my': 'center', 'at': 'center' }
                               });

                              $('#ConfigDlgPE_1_label')
                                      .append('&nbsp; <span class="a-Icon icon-xplug-moon"></span>'
                                            + '/'
                                            + '&nbsp; <span class="a-Icon icon-xplug-sun"></span>');

                              $('#ConfigDlgPE_2_label')
                                      .append('&nbsp; <span class="a-Icon icon-xplug-previous"></span>'
                                            + '&nbsp; <span class="a-Icon icon-xplug-next"></span>');


                              if (xplug.apex_version.substring(0,3) == '5.0')  {
                                  $('#ConfigDlgPE_3_label')
                                        .append('&nbsp; <span class="a-Icon icon-xplug-arrows-h"></span>');
                              }

                              $('div#ORATRONIK_XPLUG_CONFIG_DIALOG .a-Property-labelContainer')
                                 .css('min-width','300px');

                            }, // open
                  buttons : [
                              { text  : get_label('BTN-CANCEL'),
                                click : function() {
                                    $( this ).dialog( "close" );
                                }
                              },

                              { text  : get_label('BTN-APPLY'),
                                click : function() {
                                  var sThemeSwitch, sPageNav, sSwapGrid, sStyle1, sStyle2, sPDTitle, sTabPageDet;

                                  if (xplug.apex_version.substring(0,3) == '5.0') {
                                     sThemeSwitch = 'input[name=ConfigDlgPE_1_name]:checked';
                                     sPageNav     = 'input[name=ConfigDlgPE_2_name]:checked';
                                     sSwapGrid    = 'input[name=ConfigDlgPE_3_name]:checked';
                                     sStyle1      = '#ConfigDlgPE_4';
                                     sStyle2      = '#ConfigDlgPE_5';
                                     sPDTitle     = 'input[name=ConfigDlgPE_6_name]:checked';
                                     sTabPageDet  = 'input[name=ConfigDlgPE_7_name]:checked';
                                  } else {
                                     sThemeSwitch = 'input[name=ConfigDlgPE_1_name]:checked';
                                     sPageNav     = 'input[name=ConfigDlgPE_2_name]:checked';
                                     sSwapGrid    = '';
                                     sStyle1      = '#ConfigDlgPE_3';
                                     sStyle2      = '#ConfigDlgPE_4';
                                     sPDTitle     = 'input[name=ConfigDlgPE_5_name]:checked';
                                     sTabPageDet  = 'input[name=ConfigDlgPE_6_name]:checked';
                                  }

                                  if ($(sThemeSwitch).val() == 'YES') { xplug.installThemeSwitch();   }
                                                                else  { xplug.deinstallThemeSwitch(); }

                                  if ($(sPageNav).val() == 'YES') { xplug.installPageButtons();   }
                                                            else  { xplug.deinstallPageButtons(); }


                                  if (xplug.apex_version.substring(0,3) == '5.0')  {
                                      if ($(sSwapGrid).val() == 'YES') { xplug.installSwapGrid();   }
                                                                 else  { xplug.deinstallSwapGrid(); }
                                  }

                                  if ($(sPDTitle).val() == 'YES') { xplug.installPDTitle();   }
                                                            else  { xplug.deinstallPDTitle(); }


                                  xplug.setStorage('SIDEKICK-TAB-PAGEDET',$(sTabPageDet).val());

                                  if (xplug.getStorage('SHOW_SIDEKICK_PANE','NO') == 'YES')   {
                                      xplug.deinstallSidekick();
                                      xplug.installSidekick();
                                  }

                                  var l_style1 = $(sStyle1).val();
                                  var l_style2 = $(sStyle2).val();
                                  var l_class  = $('button#ORATRONIK_XPLUG_moonsun_button span').attr('class');

                                  xplug.setStorage('DEFAULT_STYLE1',l_style1,true);
                                  xplug.setStorage('DEFAULT_STYLE2',l_style2,true);

                                  if (typeof(l_class) != 'undefined') {
                                    window.pageDesigner.loadStyle(
                                        l_class.indexOf('icon-xplug-moon') > -1 ? l_style2
                                                                                : l_style1
                                    );
                                  }

                                  $( this ).dialog( "close" );
                                },
                                disabled : false
                              }
                            ]
                }
       ); // configureDialog

    return 1;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_prototypes.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */





/*****************************************************************************
 * Load Xplug settings from localStorage
 ****************************************************************************/
 Xplug.prototype.loadSettings = function ()
 {
   window.pageDesigner.loadStyle(xplug.getStorage('CURRENT_STYLE','NONE',true));

   xplug.getStorage('PANES_SWITCHED','NO')     == 'YES' && apex.actions.invoke('pd-xplug-dock-grid-right');
   xplug.getStorage('TOOLTIPS_DISABLED','NO')  == 'YES' && apex.actions.invoke('pd-xplug-disable-tooltips');
   xplug.getStorage('SHOW_SIDEKICK_PANE','NO') == 'YES' && apex.actions.invoke('pd-xplug-add-sidekick');

   xplug.setStorage('orig.a-PageSelect', $('.a-PageSelect').css('border-left'));
   xplug.getStorage('BTN-PRVNEXT-PAGE','NO')   == 'YES' && xplug.installPageButtons();
   xplug.getStorage('BTN-THEME-SWITCH','NO')   == 'YES' && xplug.installThemeSwitch();
   xplug.getStorage('BTN-SWAP-GRID-PANE','NO') == 'YES' && xplug.installSwapGrid();
   xplug.getStorage('APP+ID-IN-PD-TITLE','NO') == 'YES' && xplug.installPDTitle();
 }; // Xplug.prototype.loadSettings



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

   console.info('XPLUG - Detected APEX version: ' + xplug.probeAPEXVersion() );

   xplug.install_menu();
   xplug.loadSettings();
}
