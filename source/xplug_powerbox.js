//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_powerbox.js
// 2016-02-07 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Initialisation code
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#ORATRONIK_XPLUG_POWERBOX_MENU').remove();

var l_menu$ = $("<div id='ORATRONIK_XPLUG_POWERBOX_MENU'></div>");
$("body").append(l_menu$);

l_menu$.menu(
{
  items : [
    {
      type     : "toggle",
      label    : get_label('LBL-CLOSE'),
      get      : function()
                 {
                    return 0;
                 },
      set      : function()
                 {
                    apex.actions.invoke('pd-xplug-remove-powerbox');
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
* METHOD: addPowerbox
***************************************************************************/
Xplug.prototype.addPowerbox = function()
{
    'use strict';

    var l_factor = 0.65;                                                            // Scaling factor

    function xplug_pb_resize_handler() {
       var l_maxwidth = $('#glv-viewport').width();
       var l_width    = l_maxwidth * l_factor;
       var l_height   = $('div#cg-regions').height();                               // DIV Gallery icons

       $('#gallery-tabs')
         .css(
               { width : l_width + 'px' }
             )
         .trigger('resize');

        // simulated vertical splitter at left of powerbox
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

        // Powerbox container DIV
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



  // Add (simulated) vertical splitter bar and powerbox DIV to DOM
  $('#R1157688004078338241').append(
         '<div ID="xplug_pb_splitter"></div>'
       + '<div ID="xplug_pb_container" class="a-TabsContainer ui-tabs--subTabButtons">'
       +   '<div ID="xplug_pb_tabs" class="a-Tabs-toolbar a-Toolbar">'
       +   '<div ID="xplug_pb_resize" class="a-Toolbar-items a-Toolbar-items--left"></div>'
       +     '<ul>'
       +       '<li><a href="#xplug_pb_console">' + get_label('TAB-PB-CONSOLE') + '</a></li>'
       +       '<li><a href="#xplug_pb_msgview">' + get_label('TAB-PB-ERRORS')  + '</a></li>'
//     +       '<li><a href="#xplug_pb_advisor">' + get_label('TAB-PB-ADVISOR') + '</a></li>'
       +     '</ul>'
       +     '<span id="xplug_pb_badge" class="a-AlertBadge" style="margin-top: 10px; cursor: pointer;  "></span>'
       +   '<div ID="xplug_pb_right" class="a-Toolbar-items a-Toolbar-items--right"> '
       +   '</div>'
       +   '</div>'
       +   '<div ID="xplug_pb_console">This is the Console pane.</div>'
       +   '<div ID="xplug_pb_msgview"></div>'
//     +   '<div ID="xplug_pb_advisor">This is the Advisor pane. No functionality yet</div>'
       + '</div>'
  );

  // Add pane resize button
  $('div#xplug_pb_resize')
            .html( '<button'
                   + ' type="button"'
                   + ' ID="ORATRONIK_XPLUG_powercontrol_button"'
                   + ' class="a-Button a-Button--noLabel a-Button--withIcon">'
                   + ' <span class="a-Icon icon-xplug-arrow-left" aria-hidden="true"></span>'
                   + '</button>'
                 )
            .css('width','48px');


  // Add button handler for resizing pane
  $('#ORATRONIK_XPLUG_powercontrol_button').on('click',
         function()
          {
            if (l_factor == 0.65) {
               l_factor = 0.3;
               $('button#ORATRONIK_XPLUG_powercontrol_button span').switchClass('icon-xplug-arrow-left','icon-xplug-arrow-right');
            } else{
               l_factor = 0.65;
               $('button#ORATRONIK_XPLUG_powercontrol_button span').switchClass('icon-xplug-arrow-right','icon-xplug-arrow-left');
            }
            xplug_pb_resize_handler();
          }
  );

  // Add hamburger menu
  $('div#xplug_pb_right')
            .append( '<button'
                   + ' type="button"'
                   + ' ID="ORATRONIK_XPLUG_powercontrol_button2"'
                   + ' data-menu="ORATRONIK_XPLUG_POWERBOX_MENU"'
                   + ' class="a-Button a-Button--noLabel a-Button--withIcon js-menuButton">'
                   + ' <span class="a-Icon icon-menu" aria-hidden="true"></span>'
                   + ' <span class="a-Icon icon-menu-drop-down" aria-hidden="true"></span>'
                   + '</button>'
                 )
            .css('width','48px');


  // Create new tabs
  $('div#xplug_pb_container').tabs();   // jQuery UI tabs
  xplug_pb_resize_handler();            // Show powerbox


  // Activate standard "Messages" tab if our own badge is clicked.
  $('#xplug_pb_badge').on('click', function () { $('div#editor_tabs').tabs( "option", "active", 1); });


  // Resize-redraw powerbox when splitter(s) are moved/created
  $( "body" ).on( "splitterchange.xplug_namespace splittercreate.xplug_namespace", xplug_pb_resize_handler);


  // Resize-redraw powerbox when switching tabs (Grid Layout, Messages, ...)
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
                         l_timeout_handler = setTimeout(xplug_pb_resize_handler, 300);
                      }
  );

  $('div#xplug_pb_msgview').peMessagesView({ badge : '#xplug_pb_badge' });
  $('div#gallery-tabs').trigger('resize');

  xplug.setStorage('SHOW_POWERBOX_PANE','YES');

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
  // switch to our "Errors"-tab if an error is detected
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
          $('div#xplug_pb_container').tabs( "option", "active", 1);
          l_widget._update( pNotifications );
      });
}; // Xplug.prototype.addPowerbox


/***************************************************************************
* Add custom method to Xplug
* METHOD: removePowerbox
***************************************************************************/
Xplug.prototype.removePowerbox = function()
{
  'use strict';

  // Detach our own resize handler
  $(window).off('resize.xplug_namespace');
  $('body').off('splitterchange.xplug_namespace splittercreate.xplug_namespace');
  $( "div#editor_tabs, div#R1157688004078338241" ).tabs( { activate: null } );

  // Remove powerbox
  $('div#xplug_pb_splitter,div#xplug_pb_container').remove();

  // Restore original gallery width and trigger redrawing/reposition of icons
  $('div#gallery-tabs')
      .css('width', $('div#glv-viewport').css('width') )
      .trigger('resize');

  xplug.setStorage('SHOW_POWERBOX_PANE','NO');
}; // Xplug.prototype.removePowerbox
