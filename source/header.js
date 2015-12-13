///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
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
// v.1.1 - 2015-10-10 * Multiple changes
//                      - Removed shortcut code for now. Will be included in a later version.
//
// v.1.2 - 2015-11-06 * Tweaked Xplug button color so that it doesn't stand out that much.
//
// v.1.2 - 2015-11-14 * Bug-fix: Handle unavailability of HTML5 localStorage.
//                      - Fixes problem where Xplug button doesn't appear if localStorage is unavailable.
//                      - Show error message when clicking on Xplug button if localStorage is unavailable.
//
// v.1.2 - 2015-12-04 * Implementation of custom midnight style
//
// v.1.2 - 2015-12-06 * More work on custom midnight style
//         2015-12-06   - Redefine scrollbars on Webkit
//         2015-12-08   - Bug-fixing CSS colors of page elements
//
// REMARKS
//
// This file contains the actual Xplug functionality. The goal is to have as much browser independent stuff in here.
// That allows us to build small browser specific extensions (Chrome, Firefox, ...)
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
