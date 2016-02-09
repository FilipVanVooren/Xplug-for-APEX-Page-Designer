//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_powerbox.js
// 2016-02-07 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */


/***************************************************************************
* Add custom method to Xplug
* METHOD: addPowerbox
***************************************************************************/
Xplug.prototype.addPowerbox = function()
{
    function xplug_pb_resize_handler() {
       var C_factor   = 0.70;
       var l_maxwidth = $('#glv-viewport').width();
       var l_width    = l_maxwidth * C_factor;
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

        console.log("got here....");
    } // xplug_pb_resize_handler

  'use strict';

  // Add (simulated) vertical splitter bar and powerbox DIV to DOM
  $('#R1157688004078338241').append(
         '<div ID="xplug_pb_splitter"></div>'
       + '<div ID="xplug_pb_container" class="a-TabsContainer ui-tabs--subTabButtons">'
       +   '<div ID="xplug_pb_tabs" class="a-Tabs-toolbar a-Toolbar">'
       +    '<ul>'
       +     '<li><a href="#xplug_pb_msgview">Errors</a></li>'
       +     '<li><a href="#xplug_pb_advisor">Advisor</a></li>'
       +    '</ul>'
       +    '<span id="xplug_pb_badge" class="a-AlertBadge" style="margin-top: 10px"></span>'
       +   '</div>'
       +   '<div ID="xplug_pb_msgview"></div>'
       +   '<div ID="xplug_pb_advisor">HALLOLE</div>'
       + '</div>'
  );

  $('div#xplug_pb_tabs').tabs();  // jQuery UI tabs
  xplug_pb_resize_handler();      // Show powerbox

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
  $('body').off( "splitterchange.xplug_namespace splittercreate.xplug_namespace");
  $( "div#editor_tabs, div#R1157688004078338241" ).tabs( { activate: null } );

  // Remove powerbox
  $('div#xplug_pb_splitter,div#xplug_pb_container').remove();

  // Restore original gallery width and trigger redrawing/reposition of icons
  $('div#gallery-tabs')
      .css('width', $('div#glv-viewport').css('width') )
      .trigger('resize');

}; // Xplug.prototype.removePowerbox
