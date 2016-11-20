//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// page_designer_methods.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: setWinTitle
 ***************************************************************************/
 window.pageDesigner.setWinTitle = function()
  {
    var l_appid   = pe.getCurrentAppId();                                       // get current appid from PageDesigner model
    var l_page_id = pe.getCurrentPageId();                                      // get Currrent page from PageDesigner model
    var l_title   = $(document).attr('title');

    l_title  = l_title.replace(/\s\[.*$/,'');                                   // Remnove old [xxx:xxx] value

    if ((typeof(l_appid) == 'string') && (typeof(l_page_id) == 'string')) {
      l_title += ' [' + l_appid + ':' + l_page_id + ']';
    }
    $(document).attr('title',l_title);

    return 1;
  }; // window.pageDesigner.setWinTitle


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
     console.info('XPLUG - Tooltips disabled');

     return 1;
   } else {
      console.error("XPLUG - Tooltips can't be disabled");
      return 0;
   }
}; // window.pageDesigner.disableTooltips


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
     console.info('XPLUG - Tooltips enabled');

     return 1;
  } else {
     console.error("XPLUG - Tooltips can't be enabled");
     return 0;
  }
}; // window.pageDesigner.enableTooltips


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: setDayMode
 ***************************************************************************/
window.pageDesigner.setDayMode = function() {

  var l_style = xplug.getStorage('DEFAULT_STYLE1','NONE',true);
  window.pageDesigner.loadStyle(l_style);

  $('#ORATRONIK_XPLUG_moonsun_button span')
       .removeClass('icon-xplug-moon')
       .addClass('icon-xplug-sun');
}; // window.pageDesigner.setDayMode



/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: setNightMode
 ***************************************************************************/
window.pageDesigner.setNightMode = function() {

  var l_style = xplug.getStorage('DEFAULT_STYLE2','Moonlight',true);
  window.pageDesigner.loadStyle(l_style);

  $('#ORATRONIK_XPLUG_moonsun_button span')
        .removeClass('icon-xplug-sun')
        .addClass('icon-xplug-moon');
}; // window.pageDesigner.setNightMode



/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: prettfyGrid
 ***************************************************************************/
window.pageDesigner.prettyGrid = function()
{
  document.getElementById("glv-viewport").style.backgroundImage = "url('" + $('div[xplug-background]').attr('xplug-background') + "')";
  xplug.setStorage('PRETTY_GRID','YES');

  return 1;
}; // window.pageDesigner.prettyGrid


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: noPrettyGrid
 ***************************************************************************/
window.pageDesigner.noPrettyGrid = function()
{
  $('#glv-viewport').css('background-image','none');
  xplug.setStorage('PRETTY_GRID','NO');

  return 1;
}; // window.pageDesigner.noPrettyGrid




/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: customizeShortcuts
 ***************************************************************************/
window.pageDesigner.customizeShortcuts = function(p_title)
{
    'use strict';

    //
    // Exit if not in APEX Page Designer
    //
    if (typeof(window.pageDesigner) != 'object') {
       return 0;
    }

    $('#ORATRONIK_XPLUG_DIALOG_SHORTCUTS').length === 0
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

                                         var l_arr = apex.actions.list().sort();
                                         for (var i=0; i<l_arr.length; i++) {
                                             l_arr[i].shortcut =  apex.actions.lookup(l_arr[i].name).shortcut;
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
}; // window.pageDesigner.customizeShortcuts
