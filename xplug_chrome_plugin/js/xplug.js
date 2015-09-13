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
//                           an onclick event on my XPLUG menu button. That's apparently a normal (and weird) browser behaviour.
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
//
// REMARKS
// Not for production use! For educational purposes only.
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
  var l_page = $('#go_to_page').val() || 0;

  l_page = l_page > 0 ? l_page-1 : 0;  
  $('button#ORATRONIK_XPLUG_prev_page_button').attr('disabled','true');
  window.pageDesigner.goToPage(l_page);  
} // window.pageDesigner.goToPrevPage



/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: Go to next page 
 ***************************************************************************/
window.pageDesigner.goToNextPage = function () {
  var l_page = $('#go_to_page').val() || 0;

  l_page++;
  $('button#ORATRONIK_XPLUG_next_page_button').attr('disabled','true');
  window.pageDesigner.goToPage(l_page);
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
 * METHOD: customizeShortcuts
 ***************************************************************************/
window.pageDesigner.customizeShortcuts = function(p_title) 
{   
    'use strict'

    //
    // Exit if not in APEX Page Designer
    // 
    if (typeof(window.pageDesigner) != 'object') {
       return 0;    
    }   
        
    $('#ORATRONIK_XPLUG_DIALOG_SHORTCUTS').length == 0
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

                                         var l_arr = apex.actions.list();
                                         for (var i=0; i<l_arr.length; i++) {
                                             l_arr[i]["shortcut"] =  apex.actions.lookup(l_arr[i]["name"])["shortcut"];
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
} // window.pageDesigner.customizeShortcuts




//
// Constructor for the Xplug object
//
var Xplug = function() {
   var C_version = 'Xplug v1.1 (www.oratronik.de)'; 
   var C_author  = 'Filip van Vooren';
    
   this.version  = C_version;
   this.author   = C_author;         
        
   // Exit if not in APEX Page Designer
   if (typeof(window.pageDesigner) != 'object') {
      return 0;    
   }       
                   
   var C_LAB_DOCK_RIGHT = 0,
       C_LAB_SHORTCUTS  = 1;       

   var C_menulabel = { 'en' : [ 'Dock grid to the right',
                                'Customize shortcuts'
                              ],
                       'de' : [ 'Grid außen rechts positionieren',
                                'Tastaturkürzel anpassen'
                              ]
                     };                   
                   
                   
    function get_label(p_index) {
        return C_menulabel[gBuilderLang][p_index] || C_menulabel['en'][p_index];
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
                 + ' class="a-Button a-Button--pillStart js-actionButton"'
                 + ' data-action="pd-xplug-goto-previous-page">'
                 + '</button>'                 
                 + '<button'
                 + ' type="button"'
                 + ' ID="ORATRONIK_XPLUG_next_page_button"'                 
                 + ' class="a-Button a-Button--pillEnd js-actionButton"'
                 + ' data-action="pd-xplug-goto-next-page">'
                 + '</button>');
                 
       $('.a-PageSelect').css('border-left','0px');

       // (Re-)enable buttons after page is loaded into Page Designer
       $(document).on('modelReady', function () {
            $('button#ORATRONIK_XPLUG_prev_page_button').removeAttr('disabled');     
            $('button#ORATRONIK_XPLUG_next_page_button').removeAttr('disabled');          
       });
  } //install_goto_page            

   
  /****************************************************************************
   * Install XPLUG custom actions
   ***************************************************************************/
    function __install_actions() 
    {
       apex.actions.add(
        [
         {
            name     : "pd-xplug-goto-previous-page",
            label    : "<<",
            title    : "Previous page",
            shortcut : "???",
            action   : function( event, focusElement ) {
                           window.pageDesigner.goToPrevPage();
                           return true;
                       }
          },
          {
            name     : "pd-xplug-goto-next-page",
            label    : ">>",
            title    : "Next page",
            shortcut : "Alt+N",
            action   : function( event, focusElement ) {
                           window.pageDesigner.goToNextPage();
                           return true;
                       }
          },                
          {
            name     : "pd-xplug-dock-grid-right",
            label    : "Dock grid to the right",
            shortcut : "Alt+R",
            action   : function( event, focusElement ) {
                           window.pageDesigner.dockGridRight();
                           return true;
                       }
          },
          {
            name     : "pd-xplug-dock-grid-middle",
            label    : "Dock grid in the middle",
            shortcut : "Alt+M",            
            action   : function( event, focusElement ) {
                           window.pageDesigner.dockGridMiddle();
                           return true;
                       }
          },
          {
            name     : "pd-xplug-customize-shortcuts",
            label    : "Customize Page Designer shortcuts",
            shortcut : "???",
            action   : function( event, focusElement ) {
                           window.pageDesigner.customizeShortcuts(get_label(C_LAB_SHORTCUTS));
                           return true;
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
        var l_class     = ' class="a-Button a-Button--nolabel a-Button--iconTextButton js-menuButton a-Button--gapRight" ';
        var l_style     = ' style="background-color:#A0E6D5; height: 32px" ';
        var l_label     = ' title="' + C_version + '" ';
        var l_data_menu = ' data-menu="XplugMenu"';
        var l_aria      = ' aria-haspopup="true" aria-expanded="false" aria-label ="' + C_version + '" '; 
        var l_menu_icon = '<span class="a-Icon icon-menu-drop-down" aria-hidden="true"></span>';

                    
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

        // Add hover effect to Xplug button
        $('head').append('<style type="text/css">button#ORATRONIK_XPLUG:hover { background-color : #1EE2B3!important; }</style>');

        // Inject Xplug popup menu into DOM and create jQuery UI custom menu object
        // For details on the APEX popup menu functionality refer to /images/libraries/widget.menu.js 
        var l_menu$ = $("<div id='XplugMenu'></div>");
        $("body").append(l_menu$);

        l_menu$.menu(
        {      
          items : [
            {         
              type     : "toggle",
              label    : get_label(C_LAB_DOCK_RIGHT),
              get      : function()
                         {
                            return $('div#top_col').prevAll('div#right_col').length == 1;
                         },
              set      : function()
                         {
                            if ($('div#top_col').prevAll('div#right_col').length == 0) apex.actions.invoke('pd-xplug-dock-grid-right') 
                            else                                                       apex.actions.invoke('pd-xplug-dock-grid-middle');
                         },
              disabled : function() 
                         {
                           return false;
                         }
            },
            
            {         
              type     : "action",
              label    : get_label(C_LAB_SHORTCUTS),
              action   : function() {
                           apex.actions.invoke('pd-xplug-customize-shortcuts');      
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
        } // Xplug.prototype.getStorage */     


    Xplug.prototype.loadSettings = function () 
    {
       xplug.getStorage('PANES_SWITCHED','NO') == 'YES' && apex.actions.invoke('pd-xplug-dock-grid-right');	    
        
    } // Xplug.prototype.loadSettings 
    
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// main
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
window.xplug = (typeof(window.pageDesigner) == 'object') && new Xplug();
(typeof(window.xplug) == 'object') && xplug.loadSettings();