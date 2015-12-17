// Built using Gulp. Built date: Fri Dec 18 2015 00:14:30
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// util.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function get_svg_icon(p_icon,p_width,p_height,p_color,p_is_css_background) {
   var C_icon = {};
   var l_svg  = '';

   p_width  = p_width  || 16;
   p_height = p_height || 16;
   p_color  = p_color  || '#000000';

   C_icon.moon =   '<svg width="%%" height="%%" viewBox="0 0 1792 1792"'
               + ' xmlns="http://www.w3.org/2000/svg"><path fill="%%" d="M1390 1303q-54 9-110 9-182'
               + ' 0-337-90t-245-245-90-337q0-192 104-357-201 60-328.5 229t-127.5 384q0 130 51'
               + ' 248.5t136.5 204 204 136.5 248.5 51q144 0 273.5-61.5t220.5-171.5zm203-85q-94'
               + ' 203-283.5 324.5t-413.5 121.5q-156 0-298-61t-245-164-164-245-61-298q0-153'
               + ' 57.5-292.5t156-241.5 235.5-164.5 290-68.5q44-2 61 39 18 41-15 72-86 78-131.5'
               + ' 181.5t-45.5 218.5q0 148 73 273t198 198 273 73q118 0 228-51 41-18 72 13 14 14'
               + ' 17.5 34t-4.5 38z"/></svg>';

   C_icon['sun']   = '<svg width="%%" height="%%" viewBox="0 0 1792 1792"'
                   + ' xmlns="http://www.w3.org/2000/svg"><path fill="%%" d="M1472'
                   + ' 896q0-117-45.5-223.5t-123-184-184-123-223.5-45.5-223.5 45.5-184 123-123 184-45.5'
                   + ' 223.5 45.5 223.5 123 184 184 123 223.5 45.5 223.5-45.5 184-123 123-184'
                   + ' 45.5-223.5zm276 277q-4 15-20 20l-292 96v306q0 16-13 26-15 10-29 4l-292-94-180'
                   + ' 248q-10 13-26 13t-26-13l-180-248-292 94q-14'
                   + ' 6-29-4-13-10-13-26v-306l-292-96q-16-5-20-20-5-17 4-29l180-248-180-248q-9-13-4-29'
                   + ' 4-15 20-20l292-96v-306q0-16 13-26 15-10 29-4l292 94 180-248q9-12 26-12t26 12l180'
                   + ' 248 292-94q14-6 29 4 13 10 13 26v306l292 96q16 5 20 20 5 16-4 29l-180 248 180'
                   + ' 248q9 12 4 29z"/></svg>';

   l_svg = C_icon[p_icon] || '';
   l_svg = l_svg.replace('%%',p_width);
   l_svg = l_svg.replace('%%',p_height);
   l_svg = l_svg.replace('%%',p_color);

   if (p_is_css_background) return '{ background : url(data:image/svg+xml;base64,' + btoa(l_svg) + ') no-repeat; }';

   return l_svg;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// page_designer_methods.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    $(document).on('modelReady',
      function () {
        console.debug("model is ready");
        window.setTimeout(
           function() {
              apex.actions.enable('pd-xplug-goto-previous-page');
              apex.actions.enable('pd-xplug-goto-next-page');
           }
           ,500    // Is this a good value?
        );
      }
    );

    window.pageDesigner.goToPage(l_prev);
  }
} // window.pageDesigner.goToPrevPage



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
     $(document).on('modelReady',
       function () {
         console.debug("model is ready");
         window.setTimeout(
            function() {
               apex.actions.enable('pd-xplug-goto-previous-page');
               apex.actions.enable('pd-xplug-goto-next-page');
            }
            ,500    // Is this a good value?
         );
       }
     );

     window.pageDesigner.goToPage(l_next);
  }
} // window.pageDesigner.goToNextPage



/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: Dock grid to the right
 ***************************************************************************/
window.pageDesigner.dockGridRight = function()
{
    'use strict'

    //
    // Exit if not in APEX Page Designer
    //
    if (typeof(window.pageDesigner) != 'object') {
       return 0;
    }

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

    return 1;
} // window.pageDesigner.dockGridRight



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

    return 1;
} // window.pageDesigner.dockGridMiddle


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
     console.debug('XPLUG - Tooltips disabled');

     return 1;
   } else {
      console.error("XPLUG - Tooltips can't be disabled");
      return 0;
   }
} // window.pageDesigner.disableTooltips


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
     console.debug('XPLUG - Tooltips enabled');

     return 1;
  } else {
     console.error("XPLUG - Tooltips can't be enabled");
     return 0;
  }
} // window.pageDesigner.enableTooltips



/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: prettfyGrid
 ***************************************************************************/
window.pageDesigner.prettyGrid = function()
{
  document.getElementById("glv-viewport").style.backgroundImage = "url('" + $('div[xplug-background]').attr('xplug-background') + "')";
  xplug.setStorage('PRETTY_GRID','YES');

  return 1;
} // window.pageDesigner.prettyGrid


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: noPrettyGrid
 ***************************************************************************/
window.pageDesigner.noPrettyGrid = function()
{
  $('#glv-viewport').css('background-image','none');
  xplug.setStorage('PRETTY_GRID','NO');

  return 1;
} // window.pageDesigner.noPrettyGrid


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: setWidthOnGrid
 ***************************************************************************/
window.pageDesigner.setWidthOnGrid = function(pSize)
{
  if ((pSize >= 0) && (pSize <= 100))
     $('.a-GridLayout--z100').css('width',pSize + '%');
     xplug.setStorage('SPACE_ON_GRID',pSize);

     return 1;
} // window.pageDesigner.setWidthOnGrid


window.pageDesigner.setStyle = function() {
    var l_c1   = '#3f3f3f';       // Dark-Grey
    var l_c2   = '#505050';       // Light-Grey shade 3
    var l_c3   = '#246396';       // Light-blue
    var l_c4   = '#3c424f';       // Dark-Grey 2
    var l_c5   = '#909090';       // Light-Grey
    var l_c6   = '#ac761b';       // Orange
    var l_c7   = '#ffffff';       // White
    var l_c8   = '#000000';       // Black
    var l_c9   = '#cfe6fa';       // light-Cyan

    var l_cerr = '#FFC3C3';       // Error background color
    var l_lf   = "\n";


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
    l_css = l_lf + ' body                                    { background-color: ' + l_c2 + '; }'

    // Tabs at the top of page designer (active)
    l_css +=  l_lf + ' .ui-tabs-active .ui-tabs-anchor       { background-color: ' + l_c1 + ' !important; }'
          +   l_lf + ' .ui-tabs-active .ui-tabs-anchor span  { color: '            + l_c7 +  '!important; }'
          +   l_lf + ' .ui-tabs-active .ui-tabs-anchor       { color: '            + l_c7 +  '!important; }';
          +   l_lf + ' #sp_main a.ui-tabs-anchor             { background-color:'  + l_c6 + '; }';

    // Tabs at the top of page designer (inactive)
    l_css += l_lf + ' .ui-tabs-anchor > span        { color: ' + l_c6 + '; }'   // Icon color tabs (Rendering, ...)
          + l_lf  + ' .a-PageDesigner-treeTitle     { color: ' + l_c7 + '; }'   // Tab Tree title color (Rendering, Dynamic Actions, ....)
          + l_lf  + ' .ui-tabs--simpleInset>.a-Tabs-toolbar>.ui-tabs-nav'
                  + ' .ui-tabs-anchor { color: ' + l_c1 + '; border-right-color: ' + l_c4 + '; }'
          + l_lf  + ' .ui-tabs--simpleInset>.a-Tabs-toolbar>.ui-tabs-nav .ui-state-default { background-color: ' + l_c6 + '; }';

    // Toolbar below tabs
    l_css += l_lf  + ' div.a-Toolbar-items           { background-color: ' + l_c1     + '; }';   // Toolbar items


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
    l_css += ' .ui-tabs-nav .ui-tabs-anchor            { border-right-color : ' + l_c4 + '; }'
          +  l_lf + ' div#sp_main button.a-Button      { background-color   : ' + l_c5 + '; }'
          +  l_lf + ' .a-Button.is-active, .a-Button.is-active:active, .a-MenuButton.is-active,'
          +  l_lf + ' .fc-button.ui-state-active, .ui-buttonset .ui-button.ui-state-active,'
                  + ' .ui-buttonset .ui-button.ui-state-active.ui-state-hover:active '
                  + '    { background-color: ' + l_c9 + ' !important; }'                              // Active Buttons

    l_css += ' div#sp_main .a-Button:hover,'
           + ' div#sp_main .fc-button.ui-state-hover { background-color: ' + l_c7 + '!important; }';  // Hover Buttons
           + l_lf;


    //==========================================================================
    // Left pane (Tree)
    //==========================================================================
    l_css +=      + ' .a-PageDesigner-treeWrap           { background-color : ' + l_c1 + '; }'          // Space between tree and surroundings (tab1-tab4)
          +  l_lf + ' div#PDrenderingTree.a-TreeView     { background-color : ' + l_c1 + '; }'          // Rendering - Tree (=tab1)
          +  l_lf + ' div#PDdynamicActionTree.a-TreeView { background-color : ' + l_c1 + '; }'          // Dynamic Actions - Tree (=tab2)
          +  l_lf + ' div#PDprocessingTree.a-TreeView    { background-color : ' + l_c1 + '; }'          // Processing - Tree (=tab3)
          +  l_lf + ' div#PDsharedCompTree.a-TreeView    { background-color : ' + l_c1 + '; }'          // Processing - Tree (=tab4)
          +  l_lf + ' span.a-TreeView-label              { color            : ' + l_c5 + '; }'          // Node label text color
          +  l_lf + ' span.a-TreeView-toggle             { color            : ' + l_c5 + '; }'          // Node collapse/expand icon color
          +  l_lf + ' div.resize.u-ScrollingViewport     { background-color : ' + l_c1 + '; }'          // Background color empty space
          +  l_lf + ' ul.ui-widget-header                { background-color : ' + l_c1 + '; }'          // Background color empty space
          +  l_lf;

    //==========================================================================
    // Properties Editor
    //==========================================================================
    l_css +=        ' div#sp_right .a-PropertyEditor-propertyGroup-header { background-color : ' + l_c3  + '; }'  // Group header
          +  l_lf + ' div#sp_right .a-PropertyEditor-propertyGroup-title  { color            : ' + l_c7  + '; }'  // Group header title
          +  l_lf + ' div#sp_right div.a-Property-fieldContainer          { background-color : ' + l_c2  + '; }'  // Fieldcontainer
          +  l_lf + ' div#sp_right div.a-Property-labelContainer          { background-color : ' + l_c2  + '; }'  // Labelcontainer

          +  l_lf + ' div.a-Property.is-error div.a-Property-labelContainer,'                         // Labelcontainer in error
          +  l_lf + ' div.a-Property.is-error div.a-Property-fieldContainer,'                         // Fieldcontainer in error
          +  l_lf + ' .a-Property.is-error { background-color: ' + l_cerr + '!important; }'

          +  l_lf + ' div#sp_right div.a-Property,'
                  + ' div#sp_right div.a-Property:hover,'
                  + ' div#sp_right div.a-Property:focus,'
                  + ' div#sp_right div.a-Property:active                  { background-color : ' + l_c2     + '; }'            // Property button
          +  l_lf + ' div#sp_right div.a-Property                         { border-color     : ' + l_c1     + ' !important; }' // Property border color
          +  l_lf + ' div#sp_right .a-Property-field:hover,'
                  + ' div#sp_right .a-Property-field:focus                { background-color : ' + l_c1    + '; }'             // Property input field (active)
          +  l_lf + ' div#sp_right .a-Property-field                      { background-color : ' + l_c2     + '; }'            // Property input field
          +  l_lf + ' div#sp_right .a-Property-field                      { color            : ' + l_c9     + '; }'            // Property input field
          +  l_lf + ' div#sp_right .a-Property-label                      { color : ' + l_c5 + '; text-shadow : none; }'       // Property label
          +  l_lf + ' div#sp_right .a-PropertyEditor-messageText          { color : ' + l_c6 + '; }'                           // Properties editor message
          +  l_lf +  'div#sp_right select { background-image : url(data:image/svg+xml;base64,' + btoa(l_icon) + '); }'         // Redefine select icon

          +  l_lf + ' .a-Property-checkbox-label, .a-Property-radio, .a-Property-unit { text-shadow :  none; }'
          +  l_lf;

    //==========================================================================
    // Grid Layout - Gallery
    //==========================================================================
    l_css +=       ' div#gallery-tabs div             { background-color : ' + l_c2 + '; }'              // Gallery background
          + l_lf + ' div#gallery-tabs .aTabs-Toolbar  { }'                                               // Gallery tab row reset
          + l_lf + ' div#gallery-tabs .ui-tabs-anchor { background-color : ' + l_c6 + '; border: 0px solid ' + l_c2 + '; border-radius: 2px;}'
                                                                                                         // Gallery tab background color
          + l_lf + ' div#R1157688004078338241 li.ui-state-default { background-color : ' + l_c2 + '; } ' // Hack for border-radius
          //+ l_lf + ' ul.a-Gallery                     { background-color : ' + l_c2 + '; }'
          + l_lf;



    //==========================================================================
    // Messages, Page Search, Help, Alert Badge
    //==========================================================================
    l_css +=       ' div#messages, div#search, div#help { background-color  : ' + l_c1 + '; }';

    // Messages
    l_css +=       ' .a-AlertMessages-message {  color: ' + l_c6 + '; }';
          + l_lf + ' .a-AlertMessages-message.is-error:hover,'
                 + ' .a-AlertMessages-message.is-error:focus {  background-color : #ff0000 !important; }';

    // Page Search
    l_css +=       ' div.a-Form-labelContainer .a-Form-label,'
          + l_lf + ' .a-Form-checkboxLabel, .a-Form-inputContainer .checkbox_group label, .a-Form-inputContainer .radio_group label, .a-Form-radioLabel'
          + l_lf + ' { color: ' + l_c7 + '; }';

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
    // Add CSS style to HTML page head
    //==========================================================================
    var l_style = '<style type="text/css" ID="XPLUG_THEME">'                    + l_lf
                + l_css
                + l_scroll
                + '</style>'                                                    + l_lf;
    console.log(l_style)

    $("link[href*='/css/Theme-Standard']").after(l_style);

    xplug.setStorage('STYLE','YES');                                            // Save option in local database


    return 1;
} // window.pageDesigner.setStyle


window.pageDesigner.removeStyle = function() {
   $('style#XPLUG_THEME').remove();

   xplug.setStorage('STYLE','NO');                                              // Save option in local database

   return 1;
} // window.pageDesigner.removeStyle


window.pageDesigner.setMoonlightStyle = function() {
   window.pageDesigner.setStyle();
   document.getElementById("glv-viewport").style.backgroundImage = "url('" + $('div[xplug-background]').attr('xplug-background') + "')";
   $('#ORATRONIK_XPLUG_moonsun_button span')
        .removeClass('icon-xplug-sun')
        .addClass('icon-xplug-moon');
}



window.pageDesigner.setDaylightStyle = function() {
  window.pageDesigner.removeStyle();
  $('#glv-viewport').css('background-image','none');
  $('#ORATRONIK_XPLUG_moonsun_button span')
       .removeClass('icon-xplug-moon')
       .addClass('icon-xplug-sun');
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_constructor.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Xplug = function() {
   var C_version = 'Xplug v1.2 (www.oratronik.de)';
   var C_author  = 'Filip van Vooren';

   this.version       = C_version;
   this.author        = C_author;
   this.arr_page_list = [];


   // Exit if not in APEX Page Designer
   if (typeof(window.pageDesigner) != 'object') {
      return 0;
   }

   var C_lang  = gBuilderLang ? gBuilderLang : 'en';

   var C_label =  { 'en' : {   "DOCKRIGHT"   : "Dock grid on right side"
                             , "DOCKMID"     : "Dock grid in middle"
                             , "PREVPAGE"    : "Go to previous page"
                             , "NEXTPAGE"    : "Go to next page"
                             , "SHORTCUTS"   : "Customize shortcuts"
                             , "NOTOOLTIPS"  : "Disable tooltips"
                             , "TOOLTIPS"    : "Enable tooltips"
                             , "PRETTYGRID"  : "Background image"
                             , "RESTOREGRID" : "Restore grid"
                             , "GRIDLAYOUT"  : "Grid layout"
                             , "TOGGLELIGHT" : "Toggle daylight/moonlight mode."

                             , "MSG-TT-ENABLE-OK"    : "Tooltips are enabled."
                             , "MSG-TT-DISABLE-OK"   : "Tooltips are disabled."
                             , "MSG-TT-ENABLE-NOK"   : "Could not enable tooltips."
                             , "MSG-TT-DISABLE-NOK"  : "Could not disable tooltips."
                             , "MSG-ERR-STORAGE-NOK" : "localStorage not enabled in browser. Xplug preferences can't be saved/retrieved. Please check!"
                           },

                    'de' : {   "DOCKRIGHT"   : "Grid rechts außen positionieren"
                             , "DOCKMID"     : "Grid in der Mitte positionieren"
                             , "PREVPAGE"    : "Gehe zu vorherige Seite"
                             , "NEXTPAGE"    : "Gehe zu nächste Seite"
                             , "SHORTCUTS"   : "Tastenkürzel einrichten"
                             , "NOTOOLTIPS"  : "Tooltips deaktivieren"
                             , "TOOLTIPS"    : "Tooltips aktivieren"
                             , "PRETTYGRID"  : "Hintergrundbild"
                             , "RESTOREGRID" : "Grid Originalzustand wiederherstellen"
                             , "GRIDLAYOUT"  : "Grid Layout einstellen"
                             , "TOGGLELIGHT" : "Tageslicht- / Mondlicht Modus"

                             , "MSG-TT-ENABLE-OK"    : "Tooltips sind aktiviert."
                             , "MSG-TT-DISABLE-OK"   : "Tooltips sind deaktiviert."
                             , "MSG-TT-ENABLE-NOK"   : "Konnte Tooltips nicht aktivieren."
                             , "MSG-TT-DISABLE-NOK"  : "Konnte Tooltips nicht deaktivieren."
                             , "MSG-ERR-STORAGE-NOK" : "localStorage nicht aktiviert im Browser. Xplug Einstellungen können nicht gespeichert/geladen werden. Bitte prüfen!"
                           },
                  };

    function get_label(p_index) {
        return C_label[C_lang][p_index];
    }

  /****************************************************************************
   * Install buttons for going to previous / next page
   ***************************************************************************/
   function __install_goto_page()
   {
       $('div.a-PageSelect')

          .before( '<button'
                 + ' type="button"'
                 + ' ID="ORATRONIK_XPLUG_prev_page_button"'
                 + ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillStart js-actionButton"'
                 + ' data-action="pd-xplug-goto-previous-page">'
                 + ' <span class="a-Icon icon-xplug-previous" aria-hidden="true"></span>'
                 + '</button>'

                 + '<button'
                 + ' type="button"'
                 + ' ID="ORATRONIK_XPLUG_next_page_button"'
                 + ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillEnd js-actionButton"'
                 + ' data-action="pd-xplug-goto-next-page">'
                 + ' <span class="a-Icon icon-xplug-next" aria-hidden="true"></span>'
                 + '</button>'
               );

       $('.a-PageSelect').css('border-left','0px');


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
                         }
             }
          );

  } // install_goto_page


  /****************************************************************************
   * Install button for daylight / moonlight switch
   ***************************************************************************/
   function __install_moonsun_switch()
   {
     $('div.a-PageSelect')
               .before( '<button'
                      + ' type="button"'
                      + ' ID="ORATRONIK_XPLUG_moonsun_button"'
                      + ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillStart js-actionButton"'
                      + ' data-action="pd-xplug-toggle-moon-sun-style">'
                      + ' <span class="a-Icon icon-xplug-sun"></span>'
                      + '</button>'
                    );

  } // install_moonsun_switch





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
            action   : function( event, focusElement ) {
                           window.pageDesigner.goToPrevPage();
                           return true;
                       }
          },
          {
            name     : "pd-xplug-goto-next-page",
            label    : get_label('NEXTPAGE'),
            title    : get_label('NEXTPAGE'),
            shortcut : "Alt+N",
            action   : function( event, focusElement ) {
                           window.pageDesigner.goToNextPage();
                           return true;
                       }
          },
          {
            name     : "pd-xplug-dock-grid-right",
            label    : get_label('DOCKRIGHT'),
            shortcut : "Alt+R",
            action   : function( event, focusElement ) {
                           return window.pageDesigner.dockGridRight();
                       }
          },
          {
            name     : "pd-xplug-dock-grid-middle",
            label    : get_label('DOCKMID'),
            shortcut : "Alt+M",
            action   : function( event, focusElement ) {
                           return window.pageDesigner.dockGridMiddle();
                       }
          },
          {
            name     : "pd-xplug-disable-tooltips",
            label    : get_label('NOTOOLTIPS'),
            shortcut : "????",
            action   : function( event, focusElement ) {
                           return window.pageDesigner.disableTooltips();
                       }
          },
          {
            name     : "pd-xplug-enable-tooltips",
            label    : get_label('TOOLTIPS'),
            shortcut : "????",
            action   : function( event, focusElement ) {
                           return window.pageDesigner.enableTooltips();
                       }
          },
          {
            name     : "pd-xplug-set-moonlight-mode",
            label    : get_label('TOGGLEMOON'),
            shortcut : "????",
            action   : function( event, focusElement ) {
                           return window.pageDesigner.setMoonlightStyle();
                       }
          },
          {
            name     : "pd-xplug-set-daylight-mode",
            label    : get_label('TOGGLEDAY'),
            shortcut : "????",
            action   : function( event, focusElement ) {
                           return window.pageDesigner.setDaylightStyle();
                       }
          },
          {
            name     : "pd-xplug-toggle-moon-sun-style",
            label    : get_label('TOGGLELIGHT'),
            shortcut : "alt+9",
            action   : function( event, focusElement ) {
                          if (xplug.getStorage('STYLE','NO') == 'YES')
                             return  apex.actions.invoke('pd-xplug-set-daylight-mode');

                          return apex.actions.invoke('pd-xplug-set-moonlight-mode');
                       }
          },
          {
            name     : "pd-xplug-pretty-grid",
            label    : get_label('PRETTYGRID'),
            shortcut : "????",
            action   : function( event, focusElement ) {
                           return window.pageDesigner.prettyGrid();
                       }
          },
          {
            name     : "pd-xplug-no-pretty-grid",
            label    : get_label('NOPRETTYGRID'),
            shortcut : "????",
            action   : function( event, focusElement ) {
                           return window.pageDesigner.noPrettyGrid();
                       }
          },

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
            + l_lf + '  button#ORATRONIK_XPLUG:hover        { background-color: #1EE2B3!important; }'
            + l_lf + '  .a-Icon.icon-xplug-previous::before { content: "\\e029" }'
            + l_lf + '  .a-Icon.icon-xplug-next::before     { content: "\\e028" }'
            + l_lf + '  .a-Icon.icon-xplug-moon ' + get_svg_icon('moon',14,14,null,1)
            + l_lf + '  .a-Icon.icon-xplug-sun  ' + get_svg_icon('sun',14,14,null,1)
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
        var l_data_menu = ' data-menu="XplugMenu"';
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



        // Inject Xplug popup menu into DOM and create jQuery UI custom menu object
        // For details on the APEX popup menu functionality refer to /images/libraries/widget.menu.js
        var l_menu$ = $("<div id='XplugMenu'></div>");
        $("body").append(l_menu$);

        l_menu$.menu(
        {
          items : [
            {
              type     : "toggle",
              label    : get_label('DOCKRIGHT'),
              get      : function()
                         {
                            return $('div#top_col').prevAll('div#right_col').length == 1;
                         },
              set      : function()
                         {
                            $('div#top_col').prevAll('div#right_col').length == 0
                               ? apex.actions.invoke('pd-xplug-dock-grid-right')
                               : apex.actions.invoke('pd-xplug-dock-grid-middle');
                         },
              disabled : function()
                         {
                           return false;
                         }
            },


            { type    : "subMenu",
              label   : get_label('GRIDLAYOUT'),
              menu    : { items :
                          [

                            {
                              type     : "toggle",
                              label    : 'Midnight Theme',
                              get      : function()
                                         {
                                            return xplug.getStorage('STYLE','NO') == 'YES';
                                         },
                              set      : function()
                                         {
                                           xplug.getStorage('STYLE','NO') == 'YES'
                                              ? apex.actions.invoke('pd-xplug-set-daylight-mode')
                                              : apex.actions.invoke('pd-xplug-set-moonlight-mode')
                                         },
                              disabled : function()
                                         {
                                           return false;
                                         }
                            },

                              {
                                type     : "toggle",
                                label    : get_label('PRETTYGRID'),
                                get      : function()
                                           {
                                              return xplug.getStorage('PRETTY_GRID','NO') == 'YES';
                                           },
                                set      : function()
                                           {
                                             xplug.getStorage('PRETTY_GRID','NO') == 'YES'
                                                ? apex.actions.invoke('pd-xplug-no-pretty-grid')
                                                : apex.actions.invoke('pd-xplug-pretty-grid');
                                           },
                                disabled : function()
                                           {
                                             return false;
                                           }
                              },

                              {  type     : "radioGroup",
                                 set      : function(pValue)
                                            {
                                              pageDesigner.setWidthOnGrid(pValue);
                                            },
                                 get      : function()
                                            {
                                              return parseInt(xplug.getStorage('SPACE_ON_GRID',100));
                                            },
                                 choices  : [ { label: '60%',  value : 60  },
                                              { label: '80%',  value : 80  },
                                              { label: '100%', value : 100 }
                                            ]
                              }
                        ] }
            },

            { type     : "separator" },

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

              disabled : function()
                         {
                           return false;
                         }
            },

            { type     : "separator"
            },
            {
              type     : "action",
              labelKey : C_version,
              disabled : function() {
                             return true;
                         }
            }
          ]
        });

        __install_goto_page();
        __install_moonsun_switch();
        __install_actions();

        if (localStorage === null) {
           $('#ORATRONIK_XPLUG')
               .on('click', function()
                 { pageDesigner.showError( get_label('MSG-ERR-STORAGE-NOK') ) }
               );
        }
   } // __init

   __init();
} // constructor Xplug


    Xplug.prototype.setStorage = function(p_key, p_value)
        {
            if (typeof(localStorage) == 'object') {
               var l_key = 'APEX_XPLUG#' + location.host + location.pathname + '#' + p_key;

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
        } // Xplug.prototype.setStorage


    Xplug.prototype.getStorage = function(p_key, p_default)
        {
            if (typeof(localStorage) == 'object') {
               var l_key = 'APEX_XPLUG#' + location.host + location.pathname + '#' + p_key;

               if (localStorage === null) {
                  console.error('XPLUG - Your browser has localStorage disabled. Cannot retrieve ' + p_key);
                  return p_default;
               }
               return localStorage.getItem(l_key) || p_default;
            } else {
               console.error('XPLUG - Your browser does not support localStorage. Cannot retrieve ' + p_key);
               return p_default;
           }
        } // Xplug.prototype.getStorage


    Xplug.prototype.loadSettings = function ()
    {
       xplug.getStorage('STYLE','NO')             == 'YES' && apex.actions.invoke('pd-xplug-set-moonlight-mode');
       xplug.getStorage('PANES_SWITCHED','NO')    == 'YES' && apex.actions.invoke('pd-xplug-dock-grid-right');
       xplug.getStorage('PRETTY_GRID','NO')       == 'YES' && apex.actions.invoke('pd-xplug-pretty-grid');
       xplug.getStorage('TOOLTIPS_DISABLED','NO') == 'YES' && apex.actions.invoke('pd-xplug-disable-tooltips');

       window.pageDesigner.setWidthOnGrid(xplug.getStorage('SPACE_ON_GRID',100));
    } // Xplug.prototype.loadSettings

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// main.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.xplug = (typeof(window.pageDesigner) == 'object') && new Xplug();
(typeof(window.xplug) == 'object') && xplug.loadSettings();
