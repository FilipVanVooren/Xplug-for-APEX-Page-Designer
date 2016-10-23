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
