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
//                      - Redefine scrollbars on Webkit
//                      - Bug-fixing CSS colors of page elements
//
// REMARKS
//
// This file contains the actual Xplug functionality. The goal is to have as much browser independent stuff in here.
// That allows us to build small browser specific extensions (Chrome, Firefox, ...)
//
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
    l_prev = xplug.arr_page_list[l_index > 0
                                         ? l_index - 1
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
     l_next = xplug.arr_page_list[l_index < xplug.arr_page_list.length - 1
                                          ? l_index + 1
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
    var l_c1 = '#3f3f3f';       // Dark-Grey
    var l_c2 = '#505050';       // Light-Grey shade 3
    var l_c3 = '#246396';       // Blue
    var l_c4 = '#3c424f';       // Dark-Grey 2
    var l_c5 = '#909090';       // Light grey

    var l_txt_c1 = '#a0a0a0';   // Text-color 1
    var l_txt_c2 = '#ffffff';   // Text-color 2
    var l_txt_c3 = '#cfe6fa';   // Text-color 3
    var l_txt_c4 = '#ac761b';   // Text-color 4

    var l_lf     = "\n";

    var p1 = l_c2;


    //==========================================================================
    // Custom icon for Page Designer select element. Needed due to colours
    //==========================================================================
    var l_icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24">'
               + '<path fill="' + l_c1     + '" d="M0 0h24v24h-24z"/>'                                  // Background color
               + '<path fill="' + l_c2     + '" d="M0 0h1v24h-1z"/>'                                    // Left vertical line
               + '<path fill="' + l_txt_c3 + '" d="M16.5 14.293c0 .128-.049.256-.146.354l-4.354 4.353-4.354-4.354c-.195-.195-.195-.512 0-.707s.512-.195.707 0l3.647 3.647 3.646-3.646c.195-.195.512-.195.707 0 .098.097.147.225.147.353zM7.5 9.707c0-.128.049-.256.146-.354l4.354-4.353 4.354 4.354c.195.195.195.512 0 .707s-.512.195-.707 0l-3.647-3.647-3.646 3.646c-.195.195-.512.195-.707 0-.098-.097-.147-.225-.147-.353z"/>'
               + '</svg>';

    //==========================================================================
    // Toolbar, Widgets, tabs, buttons, input fields, messages, etc.
    //==========================================================================
    l_css = ' body                          { background-color: ' + l_c2     + '; }' + l_lf
          + ' div.a-Toolbar-items           { background-color: ' + l_c2     + '; }' + l_lf   // Toolbar items
          + ' a.ui-tabs-anchor              { background-color: ' + l_c2     + '; }' + l_lf
          + ' .ui-tabs-anchor > span        { color: '            + l_txt_c2 + '; }' + l_lf   // Icon color tabs (Rendering, ...)
          + ' .a-PageDesigner-treeTitle     { color: '            + l_txt_c2 + '; }' + l_lf   // Tab Tree title color (Rendering, ...)
          + ' a.ui-tabs-anchor              { color: '            + l_txt_c2 + '; }' + l_lf   // Tab label color (Grid Layout, ...)
          + ' .ui-tabs--simpleInset>.a-Tabs-toolbar>.ui-tabs-nav .ui-tabs-anchor { color: ' + l_txt_c1 + '; }' + l_lf; // Tab label color (Grid Layout, ...)
          + l_lf;

    l_css +='.body,'
          + '.ui-widget-content,'
          + '.a-Toolbar-pageColumn,'
          + '.a-Property, '
          + '.a-PropertyEditor-propertyGroup, '
          + '.a-PropertyEditor-propertyGroup-body, '
          + '.a-PropertyEditor-propertyGroup-header, '
          + '.ui-dialog .a-Property    { border-color: ' + l_c4 + '; }' + l_lf  // Border-color between elements
          + l_lf;


    l_css += ' .ui-tabs-nav .ui-tabs-anchor     { border-right-color : ' + l_c4 + '; }' + l_lf
          +  ' div#sp_main button.a-Button      { background-color   : ' + l_c5 + '; }' + l_lf  // Buttons
          + ' .a-Button.is-active, .a-Button.is-active:active, .a-MenuButton.is-active,'
          + ' .fc-button.ui-state-active, .ui-buttonset .ui-button.ui-state-active,'
          + ' .ui-buttonset .ui-button.ui-state-active.ui-state-hover:active { background-color: ' + l_txt_c3 + ' !important; }' // Active Buttons
          +  ' div#sp_main input,select,textarea '                                       + l_lf
          +  '     { color             : ' + l_txt_c2  + ';'   + l_lf
          +  '       background-color  : ' + l_c4      + '; }' + l_lf           // Input fields
          +  l_lf;

     l_css += 'div#sp_main select { background-image : url(data:image/svg+xml;base64,' + btoa(l_icon) + '); }' + l_lf

    //==========================================================================
    // Left pane (Tree)
    //==========================================================================
    l_css += ' .a-PageDesigner-treeWrap           { background-color : ' + l_c1 + '; }' + l_lf   // Space between tree and surroundings (tab1-tab4)
          +  ' div#PDrenderingTree.a-TreeView     { background-color : ' + l_c1 + '; }' + l_lf   // Rendering - Tree (=tab1)
          +  ' div#PDdynamicActionTree.a-TreeView { background-color : ' + l_c1 + '; }' + l_lf   // Dynamic Actions - Tree (=tab2)
          +  ' div#PDprocessingTree.a-TreeView    { background-color : ' + l_c1 + '; }' + l_lf   // Processing - Tree (=tab3)
          +  ' div#PDsharedCompTree.a-TreeView    { background-color : ' + l_c1 + '; }' + l_lf   // Processing - Tree (=tab4)
          +  ' span.a-TreeView-label              { color       : ' + l_txt_c1  + '; }' + l_lf   // Node label text color
          +  ' span.a-TreeView-toggle             { color       : ' + l_txt_c1  + '; }' + l_lf   // Node collapse/expand icon color
          +  l_lf;

    //==========================================================================
    // Properties Editor
    //==========================================================================
    l_css += ' .a-PropertyEditor-propertyGroup-header { background-color : ' + l_c3     + '; }' + l_lf  // Group header
          +  ' .a-PropertyEditor-propertyGroup-title  { color            : ' + l_txt_c2 + '; }' + l_lf  // Group header title
          +  ' div.a-Property-fieldContainer          { background-color : ' + l_c2     + '; }' + l_lf  // Fieldcontainer
          +  ' div.a-Property-labelContainer          { background-color : ' + l_c2     + '; }' + l_lf  // Labelcontainer
          +  ' div.a-Property, div.a-Property:hover, div.a-Property:focus, div.a-Property:active { background-color : ' + l_c2     + '; }' + l_lf  // Property button
          +  ' div.a-Property                         { border-color     : ' + l_c1     + ' !important; }' + l_lf  // Property border color
          +  ' .a-Property-field:hover,.a-Property-field:focus  { background-color : ' + l_c2 + '; }'      + l_lf  // Property input field (active)
          +  ' .a-Property-field                      { background-color : ' + l_c2     + '; }' + l_lf  // Property input field
          +  ' .a-Property-field                      { color            : ' + l_txt_c3 + '; }' + l_lf  // Property input field
          +  ' .a-Property-label             { color : ' + l_txt_c1 + '; text-shadow : none; }' + l_lf  // Property label
          +  ' .a-PropertyEditor-messageText { color: '  + l_txt_c4 + '; }'                     + l_lf  // Properties editor message

          +  l_lf;

    //==========================================================================
    // Gallery
    //==========================================================================
    l_css += ' div#gallery-tabs div           { background-color : ' + l_c2 + '; }' + l_lf
          +  ' div#gallery-tabs .aTabs-Toolbar { }'
          +  ' ul.a-Gallery                   { background-color : ' + l_c2 + '; }' + l_lf
          +  ' ul.ui-widget-header            { background-color : ' + l_c2 + '; }' + l_lf
          +  ' div.resize.u-ScrollingViewport { background-color : ' + l_c2 + '; }' + l_lf  // Gallery overlay
          +  l_lf;


    //==========================================================================
    // Scrollbars
    //==========================================================================
    // Webkit scrollbar generator
    // http://mikethedj4.github.io/Webkit-Scrollbar-Generator/
    //
    var l_scroll =        '::-webkit-scrollbar              { width: 10px; height: 10px; }'
                 + l_lf + '::-webkit-scrollbar-button       { width: 0px;  height: 0px;  }'
                 + l_lf + '::-webkit-scrollbar-thumb        { background: ' + l_c5 + ';  border: 0px solid #ffffff; border-radius: 50px; }'
                 + l_lf + '::-webkit-scrollbar-thumb:hover  { background: #ffffff;      }'
                 + l_lf + '::-webkit-scrollbar-thumb:active { background: ' + l_c3 + '; }'
                 + l_lf + '::-webkit-scrollbar-track        { background: #666666; border: 90px none #ffffff; border-radius: 45px; }'
                 + l_lf + '::-webkit-scrollbar-track:hover  { background: #666666;     }'
                 + l_lf + '::-webkit-scrollbar-track:active { background: #333333;     }'
                 + l_lf + '::-webkit-scrollbar-corner       { background: transparent; }'
                 + l_lf;

    // TODO
    // Add CSS style for the below
    // $('.ui-tabs--simpleInset>.a-Tabs-toolbar>.ui-tabs-nav .ui-tabs-anchor').css('background-color','#1E90FF')


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




//
// Constructor for the Xplug object
//
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
                             , "PREVPAGE"    : "Goto previous page"
                             , "NEXTPAGE"    : "Goto next page"
                             , "SHORTCUTS"   : "Customize shortcuts"
                             , "NOTOOLTIPS"  : "Disable tooltips"
                             , "TOOLTIPS"    : "Enable tooltips"
                             , "PRETTYGRID"  : "Background image"
                             , "RESTOREGRID" : "Restore grid"
                             , "GRIDLAYOUT"  : "Grid layout"

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
            shortcut : "???",
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

        // Add custom CSS to page header
        $('head').append(
              '<style type="text/css">'
            + '  button#ORATRONIK_XPLUG:hover        { background-color: #1EE2B3!important; }'
            + '  .a-Icon.icon-xplug-previous::before { content: "\\e029" }'
            + '  .a-Icon.icon-xplug-next::before     { content: "\\e028" }'
            + '</style>'
        );

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
                                              ? window.pageDesigner.removeStyle()
                                              : window.pageDesigner.setStyle()
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
       xplug.getStorage('STYLE','NO')             == 'YES' && window.pageDesigner.setStyle();
       xplug.getStorage('PANES_SWITCHED','NO')    == 'YES' && apex.actions.invoke('pd-xplug-dock-grid-right');
       xplug.getStorage('PRETTY_GRID','NO')       == 'YES' && apex.actions.invoke('pd-xplug-pretty-grid');
       xplug.getStorage('TOOLTIPS_DISABLED','NO') == 'YES' && apex.actions.invoke('pd-xplug-disable-tooltips');


       window.pageDesigner.setWidthOnGrid(xplug.getStorage('SPACE_ON_GRID',100));
    } // Xplug.prototype.loadSettings


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// main
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.xplug = (typeof(window.pageDesigner) == 'object') && new Xplug();
(typeof(window.xplug) == 'object') && xplug.loadSettings();
