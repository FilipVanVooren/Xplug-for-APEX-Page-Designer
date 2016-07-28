//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_prevnext_page.js
// 2016-07-28 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */
/* jshint -W083 */


/****************************************************************************
 * Private helper function
 * Set attribute 'title' of prev/next buttons
 ***************************************************************************/
function _set_button_tooltips() {
  var l_shortcut_prev_page = apex.actions.lookup('pd-xplug-goto-previous-page').shortcut;
  var l_shortcut_next_page = apex.actions.lookup('pd-xplug-goto-next-page').shortcut;

  $("button#ORATRONIK_XPLUG_prev_page_button")
     .attr('title', '[' + l_shortcut_prev_page + '] ' + get_label('PREVPAGE') );

  $("button#ORATRONIK_XPLUG_next_page_button")
     .attr('title', '[' + l_shortcut_next_page + '] ' + get_label('NEXTPAGE') );
} // _button_tooltips



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
      _set_button_tooltips();
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
  var l_page  = pe.getCurrentPageId();   // get Currrent page from PageDesigner model
  var l_index = -1;
  var l_next  = -1;


  function _enable_buttons() {
      apex.actions.enable('pd-xplug-goto-previous-page');
      apex.actions.enable('pd-xplug-goto-next-page');
      _set_button_tooltips();
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

  $(l_node)
      .before( '<button'
             + ' type="button"'
             + ' ID="ORATRONIK_XPLUG_prev_page_button"'
             + ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillStart js-actionButton"'
             + ' data-action="pd-xplug-goto-previous-page"'
             + '>'
             + ' <span class="a-Icon icon-xplug-previous" aria-hidden="true"></span>'
             + '</button>'

             + '<button'
             + ' type="button"'
             + ' ID="ORATRONIK_XPLUG_next_page_button"'
             + ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillEnd js-actionButton"'
             + ' data-action="pd-xplug-goto-next-page"'
             + '>'
             + ' <span class="a-Icon icon-xplug-next" aria-hidden="true"></span>'
             + '</button>'
           );

  _set_button_tooltips();

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
