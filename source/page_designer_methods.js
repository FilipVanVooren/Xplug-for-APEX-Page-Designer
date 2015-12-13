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
    var l_c1 = '#3f3f3f';       // Dark-Grey
    var l_c2 = '#505050';       // Light-Grey shade 3
    var l_c3 = '#246396';       // Light-blue
    var l_c4 = '#3c424f';       // Dark-Grey 2
    var l_c5 = '#909090';       // Light-Grey

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
    // Toolbar, Widgets, tabs
    //==========================================================================
    l_css =        ' body                          { background-color: ' + l_c2     + '; }'
          + l_lf + ' div.a-Toolbar-items           { background-color: ' + l_c2     + '; }'   // Toolbar items
          + l_lf + ' #sp_main a.ui-tabs-anchor     { background-color: ' + l_c5     + '; }'
          + l_lf + ' .ui-tabs-anchor > span        { color: '            + l_txt_c4 + '; }'   // Icon color tabs (Rendering, ...)
          + l_lf + ' .a-PageDesigner-treeTitle     { color: '            + l_txt_c2 + '; }'   // Tab Tree title color (Rendering, Dynamic Actions, ....)
          + l_lf + ' a.ui-tabs-anchor              { color: '            + l_txt_c2 + '; }'   // Tab label color (Grid Layout, ...)
          + l_lf + ' .ui-tabs--simpleInset>.a-Tabs-toolbar>.ui-tabs-nav'
                 + ' .ui-tabs-anchor               { color: ' + l_txt_c1 + '; }'              // Tab label color (Grid Layout, ...)
          + l_lf;


    l_css +='.body,'
          + '.ui-widget-content,'
          + '.a-Toolbar-pageColumn,'
          + '.a-Property, '
          + '.a-PropertyEditor-propertyGroup, '
          + '.a-PropertyEditor-propertyGroup-body, '
          + '.a-PropertyEditor-propertyGroup-header, '
          + '.ui-dialog .a-Property    { border-color: ' + l_c4 + '; }'         // Border-color between elements
          + l_lf;


    //==========================================================================
    //Buttons
    //==========================================================================
    l_css += ' .ui-tabs-nav .ui-tabs-anchor            { border-right-color : ' + l_c4 + '; }'
          +  l_lf + ' div#sp_main button.a-Button      { background-color   : ' + l_c5 + '; }'            // Buttons
          +  l_lf + ' .a-Button.is-active, .a-Button.is-active:active, .a-MenuButton.is-active,'
          +  l_lf + ' .fc-button.ui-state-active, .ui-buttonset .ui-button.ui-state-active,'
                  + ' .ui-buttonset .ui-button.ui-state-active.ui-state-hover:active '
                  + '    { background-color: ' + l_txt_c3 + ' !important; }'                              // Active Buttons

    l_css += ' div#sp_main .a-Button:hover,'
           + ' div#sp_main .fc-button.ui-state-hover { background-color: ' + l_txt_c2 + '!important; }';  // Hover Buttons
           + l_lf;

    //==========================================================================
    // Input fields, select, textarea
    //==========================================================================
    l_css += 'div#sp_main input,select,textarea '
          +  l_lf + '     { color             : ' + l_txt_c2  + ';'
          +  l_lf + '       background-color  : ' + l_c4      + '; }'   // Input fields
          +  l_lf;

    //==========================================================================
    // Redefine select icon
    //==========================================================================
     l_css += 'div#sp_main select { background-image : url(data:image/svg+xml;base64,' + btoa(l_icon) + '); }' + l_lf;

     l_css += l_lf;

    //==========================================================================
    // Left pane (Tree)
    //==========================================================================
    l_css +=      + ' .a-PageDesigner-treeWrap           { background-color : ' + l_c1 + '; }'          // Space between tree and surroundings (tab1-tab4)
          +  l_lf + ' div#PDrenderingTree.a-TreeView     { background-color : ' + l_c1 + '; }'          // Rendering - Tree (=tab1)
          +  l_lf + ' div#PDdynamicActionTree.a-TreeView { background-color : ' + l_c1 + '; }'          // Dynamic Actions - Tree (=tab2)
          +  l_lf + ' div#PDprocessingTree.a-TreeView    { background-color : ' + l_c1 + '; }'          // Processing - Tree (=tab3)
          +  l_lf + ' div#PDsharedCompTree.a-TreeView    { background-color : ' + l_c1 + '; }'          // Processing - Tree (=tab4)
          +  l_lf + ' span.a-TreeView-label              { color       : ' + l_txt_c1  + '; }'          // Node label text color
          +  l_lf + ' span.a-TreeView-toggle             { color       : ' + l_txt_c1  + '; }'          // Node collapse/expand icon color
          +  l_lf;

    //==========================================================================
    // Properties Editor
    //==========================================================================
    l_css +=        ' .a-PropertyEditor-propertyGroup-header { background-color : ' + l_c3     + '; }'  // Group header
          +  l_lf + ' .a-PropertyEditor-propertyGroup-title  { color            : ' + l_txt_c2 + '; }'  // Group header title
          +  l_lf + ' div.a-Property-fieldContainer          { background-color : ' + l_c2     + '; }'  // Fieldcontainer
          +  l_lf + ' div.a-Property-labelContainer          { background-color : ' + l_c2     + '; }'  // Labelcontainer
          +  l_lf + ' div.a-Property, div.a-Property:hover,'
                  + ' div.a-Property:focus,'
                  + ' div.a-Property:active                  { background-color : ' + l_c2     + '; }'  // Property button
          +  l_lf + ' div.a-Property                         { border-color     : ' + l_c1     + ' !important; }'  // Property border color
          +  l_lf + ' .a-Property-field:hover,'
                  +  '.a-Property-field:focus                { background-color : ' + l_c2     + '; }'  // Property input field (active)
          +  l_lf + ' .a-Property-field                      { background-color : ' + l_c2     + '; }'  // Property input field
          +  l_lf + ' .a-Property-field                      { color            : ' + l_txt_c3 + '; }'  // Property input field
          +  l_lf + ' .a-Property-label             { color : ' + l_txt_c1 + '; text-shadow : none; }'  // Property label
          +  l_lf + ' .a-PropertyEditor-messageText { color: '  + l_txt_c4 + '; }'                      // Properties editor message
          +  l_lf;

    //==========================================================================
    // Gallery
    //==========================================================================

    l_css +=       ' div#gallery-tabs div             { background-color : ' + l_c2 + '; }'      // Gallery background
          + l_lf + ' div#gallery-tabs .aTabs-Toolbar  { }'                                       // Gallery tab row reset
          + l_lf + ' div#gallery-tabs .ui-tabs-anchor { color            : ' + l_txt_c2 + '; }'  // Gallery tab button color
          + l_lf + ' div#gallery-tabs .ui-tabs-anchor { background-color : ' + l_txt_c4 + '; }'  // Gallery tab background color
          + l_lf + ' ul.a-Gallery                     { background-color : ' + l_c2 + '; }'
          + l_lf + ' ul.ui-widget-header              { background-color : ' + l_c2 + '; }'
          + l_lf + ' div.resize.u-ScrollingViewport   { background-color : ' + l_c2 + '; }'      // Gallery overlay
          + l_lf;


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
