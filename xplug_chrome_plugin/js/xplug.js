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
//
// v.1.2 - 2015-11-06 * Tweaked Xplug button color so that it doesn't stand out that much 
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


//
// Constructor for the Xplug object
//
var Xplug = function() {
   var C_version = 'Xplug v1.1 (www.oratronik.de)';
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

                             , "MSG-TT-ENABLE-OK"   : "Tooltips are enabled."
                             , "MSG-TT-DISABLE-OK"  : "Tooltips are disabled."
                             , "MSG-TT-ENABLE-NOK"  : "Could not enable tooltips."
                             , "MSG-TT-DISABLE-NOK" : "Could not disable tooltips."
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

                             , "MSG-TT-ENABLE-OK"   : "Tooltips sind aktiviert."
                             , "MSG-TT-DISABLE-OK"  : "Tooltips sind deaktiviert."
                             , "MSG-TT-ENABLE-NOK"  : "Konnte Tooltips nicht aktivieren."
                             , "MSG-TT-DISABLE-NOK" : "Konnte Tooltips nicht deaktivieren."
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
   } // __init

   __init();
} // constructor Xplug


    Xplug.prototype.setStorage = function(p_key, p_value)
        {
            if (typeof(localStorage) == 'object') {
               var l_key = 'APEX_XPLUG#' + location.host + location.pathname + '#' + p_key;
               localStorage.setItem(l_key, p_value);
               return true;
            } else {
               return false;
            }
        } // Xplug.prototype.setStorage


    Xplug.prototype.getStorage = function(p_key, p_default)
        {
            if (typeof(localStorage) == 'object') {
               var l_key = 'APEX_XPLUG#' + location.host + location.pathname + '#' + p_key;
               return localStorage.getItem(l_key) || p_default;
            }
        } // Xplug.prototype.getStorage


    Xplug.prototype.loadSettings = function ()
    {
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
