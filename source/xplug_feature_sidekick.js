//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_SIDEKICK.js
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
    }
  ]
});



/***************************************************************************
* Add custom method to Xplug
* METHOD: installSidekick
***************************************************************************/
Xplug.prototype.installSidekick = function()
{
    'use strict';

    var c_min_factor = 0.25;
    var c_max_factor = 0.50;
    var l_factor     = c_max_factor;                                                // Scaling factor


    function xplug_pb_resize_handler() {
       var l_maxwidth = $('#glv-viewport').width();
       var l_width    = l_maxwidth * l_factor;
       var l_height   = $('div#cg-regions').height();                               // DIV Gallery icons

       $('#gallery-tabs')
         .css(
               { width : l_width + 'px' }
             )
         .trigger('resize');

        // simulated vertical splitter at left of SIDEKICK
        $('#xplug_pb_splitter').css(
            { 'position'          : 'absolute',
              'top'               : '0px',
              'left'              :  l_width + 'px',
              'width'             : '8px',
              'height'            : '100%',
              'background-color'  : $('.a-Splitter-barH').css('background-color'),
              'border-left'       : '1px solid #c0c0c0',
              'border-right'      : '1px solid #c0c0c0'
            }
        );

        // SIDEKICK container DIV
        $('#xplug_pb_container').css(
              { 'position'   : 'absolute',
                'top'        : '0px',
                'padding'    : '1px',
                'left'       : (l_width + 8) + 'px',
                'width'      : (l_maxwidth - l_width - 8) + 'px',
                'height'     : l_height + 'px',
                'display'    : 'block'
              });

        $('#xplug_pb_tabs').css(
              { 'height' : $('div#R1157688004078338241 div.a-Tabs-toolbar').height() + 'px'
            });

        $('#xplug_pb_msgview').css(
              {  'overflow-y' : 'scroll',
                 'height'     : l_height + 'px',

            });
    } // xplug_pb_resize_handler



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
  var sEnablePageDetTab = xplug.getStorage('SIDEKICK-TAB-PAGEDET','NO');
  var sPageDetailsLI    = '';
  var sPageDetailsDIV   = '';
  if (sEnablePageDetTab == 'YES') {
     sPageDetailsLI  = '<li><a href="#xplug_pb_docu">' + get_label('TAB-PB-DOCU') + '</a></li>';
     sPageDetailsDIV = '<div ID="xplug_pb_docu"   style="overflow-y: scroll; height: 100%;"></div>';
  }


  // Add (simulated) vertical splitter bar and SIDEKICK DIV to DOM
  $('#R1157688004078338241').append(
         '<div ID="xplug_pb_splitter"></div>'
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
  xplug_pb_resize_handler();            // Show SIDEKICK


  // Activate standard "Messages" tab if our own badge is clicked.
  $('#xplug_pb_badge').on('click', function () { $('div#editor_tabs').tabs( "option", "active", 1); });


  // Install "Search" tab
  installTabPowersearch();

  // Resize-redraw SIDEKICK when splitter(s) are moved/created
  $( "body" ).on( "splitterchange.xplug_namespace splittercreate.xplug_namespace", xplug_pb_resize_handler);


  // Resize-redraw SIDEKICK when switching tabs (Grid Layout, Messages, ...)
  // See jQuery UI tabs for details on 'activate' attribute
  $( "div#editor_tabs, div#R1157688004078338241" )
    .tabs(
           { activate: xplug_pb_resize_handler }
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
                           function() { xplug_pb_resize_handler; } , 300);
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
      .css('width', $('div#glv-viewport').css('width') )
      .trigger('resize');

  this.setStorage('SHOW_SIDEKICK_PANE','NO');

  $(document).off('modelReady', this.showDocumentation);
}; // Xplug.prototype.deinstallSidekick




Xplug.prototype.showDocumentation = function ()
{
  'use strict';

  var oProp, l_app_id, sChangedBy, sChangedOn, sPageComment, sHTML;

  l_app_id     = pe.getCurrentAppId();                                     // Appp-ID


  // Get Page changed By
  oProp        = xplug.getFilteredComponentProperties(381,l_app_id)[0];    // 381=Changed By
  sChangedBy   = typeof(oProp) == 'object' ? oProp.getDisplayValue()
                                           : 'none';

  // Get Page changed on
  oProp        = xplug.getFilteredComponentProperties(382,l_app_id)[0];    // 382=Changed On
  sChangedOn   = typeof(oProp) == 'object' ? oProp.getDisplayValue()
                                           : 'none';

  // Get Page Comment
  //
  oProp        = xplug.getFilteredComponentProperties(4,l_app_id)[0];      // 4=Comment
  sPageComment = typeof(oProp) == 'object' ? oProp.getDisplayValue()
                                            : '** NONE **';


  // Build page details
  sHTML = '<h2>Audit Information</h2>'
        + 'Latest change by ' + sChangedBy + ' on ' + sChangedOn
        + '<br><br>'
        + '<h2>Page Comments</h2>'
        +  '<pre>'
        +  sPageComment
        + '</pre>';

  $('div#xplug_pb_docu').html(sHTML).css('padding','5px');
  $('div#xplug_pb_docu pre').css('display','inline');
}; // showDocumentation
