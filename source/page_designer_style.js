//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// page_designer_style.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */

/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: setStyle
 ***************************************************************************/
window.pageDesigner.setStyle = function( p_style_name,
                                         p_save_style,
                                         p_is_dark_style,
                                         p_show_grid,
                                         p_custom_css,
                                         p1,p2,p3,p4,p5,p6,p7,p8,p9,p_err
                                       )
{
   'use strict';

    var l_c1   = p1    || '#3F3F3F';       // Dark-Grey
    var l_c2   = p2    || '#505050';       // Light-Grey shade 3
    var l_c3   = p3    || '#246396';       // Light-blue
    var l_c4   = p4    || '#3C424F';       // Dark-Grey 2
    var l_c5   = p5    || '#909090';       // Light-Grey
    var l_c6   = p6    || '#AC761B';       // Orange
    var l_c7   = p7    || '#FFFFFF';       // White
    var l_c8   = p8    || '#000000';       // Black
    var l_c9   = p9    || '#CFE6FA';       // light-Cyan
    var l_cerr = p_err || '#FFC3C3';       // Error background color
    var l_lf   = "\n";
    var l_css;


    function is_protected(p_style_name) {
      return (p_style_name.toUpperCase() == 'MOONLIGHT') ? 'YES' : 'NO';
    }


    //==========================================================================
    // Save style settings if required
    //==========================================================================
    var l_settings_obj = { "STYLE_NAME" : p_style_name,
                           "DARK_STYLE" : typeof(p_is_dark_style) == 'undefined' ? 'YES' : p_is_dark_style,
                           "SHOW_GRID"  : typeof(p_show_grid)     == 'undefined' ? 'YES' : p_show_grid,
                           "PROTECTED"  : is_protected(p_style_name),
                           "C1"         : l_c1,
                           "C2"         : l_c2,
                           "C3"         : l_c3,
                           "C4"         : l_c4,
                           "C5"         : l_c5,
                           "C6"         : l_c6,
                           "C7"         : l_c7,
                           "C8"         : l_c8,
                           "C9"         : l_c9,
                           "C10"        : l_cerr,
                           "CUSTOM_CSS" : p_custom_css
                      };

    if (p_save_style == 'SAVE' || p_save_style == 'SAVE_ONLY') {
       xplug.setStorage('STYLE_' + p_style_name, JSON.stringify(l_settings_obj), true);         // Save global option in local storage

       if (p_save_style == 'SAVE_ONLY') {
          return;
       }
    }

    window.pageDesigner.unsetStyle();

    //==========================================================================
    // Custom icon for Page Designer select element. Needed due to colours
    //==========================================================================
    var l_icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24">'
               + '<path fill="' + l_c1 + '" d="M0 0h24v24h-24z"/>'                                  // Background color
               + '<path fill="' + l_c2 + '" d="M0 0h1v24h-1z"/>'                                    // Left vertical line
               + '<path fill="' + l_c9 + '" d="M16.5 14.293c0 .128-.049.256-.146.354l-4.354 4.353-4.354-4.354c-.195-.195-.195-.512 0-.707s.512-.195.707 0l3.647 3.647 3.646-3.646c.195-.195.512-.195.707 0 .098.097.147.225.147.353zM7.5 9.707c0-.128.049-.256.146-.354l4.354-4.353 4.354 4.354c.195.195.195.512 0 .707s-.512.195-.707 0l-3.647-3.647-3.646 3.646c-.195.195-.512.195-.707 0-.098-.097-.147-.225-.147-.353z"/>'
               + '</svg>';


    //==========================================================================
    // Widgets, tabs
    //==========================================================================
    l_css = l_lf + ' body                                    { background-color: ' + l_c2 + '; }';

    // Tabs at the top of page designer (active)
    l_css +=  l_lf + ' .ui-tabs-active .ui-tabs-anchor       { background-color: ' + l_c1 + ' !important; }'
          +   l_lf + ' .ui-tabs-active .ui-tabs-anchor span  { color: '            + l_c7 +  '!important; }'
          +   l_lf + ' .ui-tabs-active .ui-tabs-anchor       { color: '            + l_c7 +  '!important; }'
          +   l_lf + ' #sp_main a.ui-tabs-anchor             { background-color:'  + l_c6 + '; }';

    // Tabs at the top of page designer (inactive)
    l_css += l_lf + ' .ui-tabs-anchor > span                 { color: ' + l_c6 + '; }'   // Icon color tabs (Rendering, ...)
          + l_lf  + ' .a-PageDesigner-treeTitle              { color: ' + l_c7 + '; }'   // Tab Tree title color (Rendering, Dynamic Actions, ....)
          + l_lf  + ' .ui-tabs--simpleInset>.a-Tabs-toolbar>.ui-tabs-nav'
                  + ' .ui-tabs-anchor { color: ' + l_c1 + '; border-right-color: ' + l_c4 + '; }'
          + l_lf  + ' .ui-tabs--simpleInset>.a-Tabs-toolbar>.ui-tabs-nav .ui-state-default { background-color: ' + l_c6 + '; }';

    // Toolbar below tabs
    l_css += l_lf  + ' div.a-Toolbar-items                   { background-color: ' + l_c1     + '; }';   // Toolbar items


    // Border-color between elements
    l_css +='.body,'
          + '.ui-widget-content,'
          + '.a-Toolbar-pageColumn,'
          + '.a-Property, '
          + '.a-PropertyEditor-propertyGroup, '
          + '.a-PropertyEditor-propertyGroup-body, '
          + '.a-PropertyEditor-propertyGroup-header, '
          + 'div#sp_right .ui-dialog .a-Property    { border-color: ' + l_c4 + '; }'
          + l_lf;

    // Buttons
    l_css += ' .ui-tabs-nav .ui-tabs-anchor                  { border-right-color : ' + l_c4 + '; }'
          +  l_lf + ' div#sp_main button.a-Button            { background-color   : ' + l_c5 + '; }'
          +  l_lf + ' .a-Button.is-active, .a-Button.is-active:active, .a-MenuButton.is-active,'
          +  l_lf + ' .fc-button.ui-state-active, .ui-buttonset .ui-button.ui-state-active,'
                  + ' .ui-buttonset .ui-button.ui-state-active.ui-state-hover:active '
                  + '    { background-color: ' + l_c9 + ' !important; }';                                   // Active Buttons

    l_css += ' div#sp_main .a-Button:hover,'
           + ' div#sp_main .fc-button.ui-state-hover         { background-color: ' + l_c7 + '!important; }' // Hover Buttons
           + l_lf;


    //==========================================================================
    // Left pane (Tree)
    //==========================================================================
    l_css +=        ' .a-PageDesigner-treeWrap               { background-color : ' + l_c1 + '; }'          // Space between tree and surroundings (tab1-tab4)
          +  l_lf + ' div#PDrenderingTree.a-TreeView         { background-color : ' + l_c1 + '; }'          // Rendering - Tree (=tab1)
          +  l_lf + ' div#PDdynamicActionTree.a-TreeView     { background-color : ' + l_c1 + '; }'          // Dynamic Actions - Tree (=tab2)
          +  l_lf + ' div#PDprocessingTree.a-TreeView        { background-color : ' + l_c1 + '; }'          // Processing - Tree (=tab3)
          +  l_lf + ' div#PDsharedCompTree.a-TreeView        { background-color : ' + l_c1 + '; }'          // Processing - Tree (=tab4)
          +  l_lf + ' span.a-TreeView-label                  { color            : ' + l_c5 + '; }'          // Node label text color
          +  l_lf + ' span.a-TreeView-toggle                 { color            : ' + l_c5 + '; }'          // Node collapse/expand icon color
          +  l_lf + ' div.resize.u-ScrollingViewport         { background-color : ' + l_c1 + '; }'          // Background color empty space
          +  l_lf + ' ul.ui-widget-header                    { background-color : ' + l_c1 + '; }'          // Background color empty space
          +  l_lf;

    //==========================================================================
    // Properties Editor
    //==========================================================================
    l_css +=        ' div#sp_right .a-PropertyEditor-propertyGroup-header { background-color : ' + l_c3  + '; }'  // Group header
          +  l_lf + ' div#sp_right .a-PropertyEditor-propertyGroup-title  { color            : ' + l_c7  + '; }'  // Group header title
          +  l_lf + ' div#sp_right div.a-Property-fieldContainer          { background-color : ' + l_c2  + '; }'  // Fieldcontainer
          +  l_lf + ' div#sp_right div.a-Property-labelContainer          { background-color : ' + l_c2  + '; }'  // Labelcontainer

          +  l_lf + ' div.a-Property.is-error div.a-Property-labelContainer,'                                     // Labelcontainer in error
          +  l_lf + ' div.a-Property.is-error div.a-Property-fieldContainer,'                                     // Fieldcontainer in error
          +  l_lf + ' .a-Property.is-error { background-color: ' + l_cerr + '!important; }'

          +  l_lf + ' div#sp_right div.a-Property,'
                  + ' div#sp_right div.a-Property:hover,'
                  + ' div#sp_right div.a-Property:focus,'
                  + ' div#sp_right div.a-Property:active                  { background-color : ' + l_c2 + '; }'            // Property button
          +  l_lf + ' div#sp_right div.a-Property                         { border-color     : ' + l_c1 + ' !important; }' // Property border color
          +  l_lf + ' div#sp_right .a-Property-field:hover,'
                  + ' div#sp_right .a-Property-field:focus                { background-color : ' + l_c1 + '; }'            // Property input field (active)
          +  l_lf + ' div#sp_right .a-Property-field                      { background-color : ' + l_c2 + '; }'            // Property input field
          +  l_lf + ' div#sp_right .a-Property-field                      { color            : ' + l_c9 + '; }'            // Property input field
          +  l_lf + ' div#sp_right .a-Property-label                      { color : ' + l_c5 + '; text-shadow : none; }'   // Property label
          +  l_lf + ' div#sp_right .a-PropertyEditor-messageText          { color : ' + l_c6 + '; }'                       // Properties editor message
          +  l_lf +  'div#sp_right select { background-image : url(data:image/svg+xml;base64,' + btoa(l_icon) + '); }'     // Redefine select icon

          +  l_lf + ' .a-Property-checkbox-label, .a-Property-radio, .a-Property-unit { text-shadow :  none; }'
          +  l_lf;

    //==========================================================================
    // Grid Layout - Gallery
    //==========================================================================
    l_css +=       ' div#gallery-tabs div             { background-color : ' + l_c2 + '; }'                       // Gallery background
          + l_lf + ' div#gallery-tabs .aTabs-Toolbar  { }'                                                        // Gallery tab row reset
          + l_lf + ' div#gallery-tabs .ui-tabs-anchor { background-color : ' + l_c6 + '; border: 0px solid ' + l_c2 + '; border-radius: 2px;}'
                                                                                                                  // Gallery tab background color
          + l_lf + ' div#R1157688004078338241 li.ui-state-default { background-color : ' + l_c2 + '; } '          // Hack for border-radius
          + l_lf;



    //==========================================================================
    // Messages, Page Search, Help, Alert Badge
    //==========================================================================
    l_css +=       ' div#messages, div#search, div#help               { background-color : ' + l_c1 + '; }'
          + l_lf + ' div#help-container                               { background-color : ' + l_c1 + '; }'
          + l_lf + ' .ui-tabs-helpTab.ui-state-active .ui-tabs-anchor { background-color : ' + l_c1 + ' !important; }'
          + l_lf + ' div#help-container h3, div#help-container h4     { color : '            + l_c7 + '; }'
          + l_lf + ' div#help-container dt                            { color : '            + l_c7 + '; }'
          + l_lf + ' div#help-container a                             { color : '            + l_c3 + '; }'
          + l_lf + ' div#help-container *                             { color : '            + l_c5 + '; }';

    // Messages
    l_css += l_lf + ' .a-AlertMessages-message                        {  color: '            + l_c6 + '; }'
          +  l_lf + ' .a-AlertMessages-message.is-error:hover,'
                  + ' .a-AlertMessages-message.is-error:focus         {  background-color : ' + l_c7 + ' !important; }';

    // Page Search
    l_css += l_lf + ' div.a-Form-labelContainer .a-Form-label,'
          +  l_lf + ' .a-Form-checkboxLabel, .a-Form-inputContainer .checkbox_group label, .a-Form-inputContainer .radio_group label, .a-Form-radioLabel'
          +  l_lf + ' { color: ' + l_c7 + '; }';

    // Alert Badge
    l_css += l_lf + ' span.a-AlertBadge { color : ' + l_c7 + '; }';



    //==========================================================================
    // Scrollbars
    //==========================================================================
    // Webkit scrollbar generator
    // http://mikethedj4.github.io/Webkit-Scrollbar-Generator/
    //
    var l_scroll =        '::-webkit-scrollbar              { width: 10px; height: 10px; }'
                 + l_lf + '::-webkit-scrollbar-button       { width: 0px;  height: 0px;  }'
                 + l_lf + '::-webkit-scrollbar-thumb        { background: ' + l_c5 + ';  border-radius: 50px; }'
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
                + l_css                                                         + l_lf
                + l_scroll                                                      + l_lf
                + ((typeof(p_custom_css) == 'undefined') ? l_lf : p_custom_css) + l_lf
                + '</style>'                                                    + l_lf;

    // console.log(l_style);

    $("link[href*='/css/Theme-Standard']").after(l_style);

    if (p_show_grid == 'YES') {
       window.pageDesigner.prettyGrid();
    } else {
       window.pageDesigner.noPrettyGrid();
    }

    $('#ORATRONIK_XPLUG_moonsun_button span')
         .removeClass( p_is_dark_style == 'YES' ? 'icon-xplug-sun' : 'icon-xplug-moon')
         .addClass(    p_is_dark_style == 'YES' ? 'icon-xplug-moon': 'icon-xplug-sun');

    console.debug('XPLUG - Page Designer Style ' + p_style_name + ' set.');

    xplug.setStorage('CURRENT_STYLE',p_style_name, true);

    return JSON.stringify(l_settings_obj);
}; // window.pageDesigner.setStyle


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: unsetStyle
 ***************************************************************************/
window.pageDesigner.unsetStyle = function() {
   $('style#XPLUG_THEME').remove();
   window.pageDesigner.noPrettyGrid();

   $('#ORATRONIK_XPLUG_moonsun_button span')
        .removeClass('icon-xplug-moon')
        .addClass('icon-xplug-sun');

   console.debug('XPLUG - Current page designer style unset.');

   xplug.setStorage('CURRENT_STYLE','NONE', true);

   return 1;
}; // window.pageDesigner.unsetStyle


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: loadStyle
 ***************************************************************************/
window.pageDesigner.loadStyle = function(p_style_name)
{
  var l_imp_obj;

  if (p_style_name == 'NONE') {
     window.pageDesigner.unsetStyle();
     return;
  }

  //
  // Get settings
  //
  try {
     l_imp_obj = JSON.parse(xplug.getStorage('STYLE_' + p_style_name,null,true));
  } catch(e) {
     console.warn("XPLUG: can't fetch " + p_style_name + " from localStorage.");
     return 0;
  }


  if (l_imp_obj === null) {
     console.error("XPLUG: could not retrieve Page Designer style. Reverting to NONE.");
     window.pageDesigner.loadStyle('NONE');
     return 0;
  }

  window.pageDesigner.setStyle
    (
       l_imp_obj.STYLE_NAME,
       'LOAD_STYLE',
       l_imp_obj.DARK_STYLE,
       l_imp_obj.SHOW_GRID,
       l_imp_obj.CUSTOM_CSS,
       l_imp_obj.C1,
       l_imp_obj.C2,
       l_imp_obj.C3,
       l_imp_obj.C4,
       l_imp_obj.C5,
       l_imp_obj.C6,
       l_imp_obj.C7,
       l_imp_obj.C8,
       l_imp_obj.C9,
       l_imp_obj.C10
    );
}; // window.pageDesigner.loadStyle


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: getStyles
 ***************************************************************************/
window.pageDesigner.getStyles = function() {
  var l_arr_styles = [];
  var l_arr_keys   = xplug.getStorageKeys(true);

  for (var i = 0, l_length = l_arr_keys.length; i < l_length; ++i ) {
      var l_key = l_arr_keys[i];

      var l_current = xplug.getStorage('CURRENT_STYLE','',true);

      if (l_key.substr(0,6) == 'STYLE_') {
         var l_style = JSON.parse(xplug.getStorage(l_key,null,true));

         if (l_style.STYLE_NAME == l_current) {
            l_style.IS_CURRENT = 'YES';
         }

         if (l_style !== null) {
            l_arr_styles.push(l_style);
         }
     }
  }

  return l_arr_styles;
}; // window.pageDesigner.getStyles



window.pageDesigner.customizeStyle = function(p_title)
{
    'use strict';

    //
    // Exit if not in APEX Page Designer
    //
    if (typeof(window.pageDesigner) != 'object') {
       return 0;
    }

    $('#ORATRONIK_XPLUG_DIALOG_STYLE_LOV').length === 0
        && $('body').append('<div ID="ORATRONIK_XPLUG_DIALOG_STYLE_LOV"></div');

    $('#ORATRONIK_XPLUG_DIALOG_STYLE_LOV')
        .lovDialog(
                { modal             : true,
                  title             : p_title,
                  resizable         : true,

                  columnDefinitions : [ { name  : "STYLE_NAME",  title : get_label('LBL-NAME')          },
                                        { name  : "DARK_STYLE",  title : get_label('LBL-DARK-STYLE')    },
                                        { name  : "IS_CURRENT",  title : get_label('LBL-CRNTLY-ACTIVE') },
                                        { name  : "PROTECTED",   title : get_label("LBL-PROTECTED")     },
                                       ],

                  filterLov         : function( pFilters, pRenderLovEntries ) {

                                         var l_arr = window.pageDesigner.getStyles();
                                         // pRenderLovEntries is a method function set by widget.lovDialog.js
                                         // For details see /images/apex_ui/js/widget.lovDioalog.js
                                         //
                                         // To render our LOV, all we need to do is call this function and pass
                                         // our LOV as an array.
                                         pRenderLovEntries(l_arr);
                                      },

                  width             : 600,
                  height            : 340,

                  close             : // called by widget.lovDialog.js close function
                                      function(pEvent) {
                                         $('#ORATRONIK_XPLUG_DIALOG_STYLE_LOV').remove();
                                      },

                  multiValue       : false,

                  valueSelected    : function( pEvent, pData ) {
                                         window.pageDesigner.customizeStyleDialog(
                                            pData.STYLE_NAME,
                                            get_label('LBL-STYLE-CUSTOM'),
                                            p_title
                                         );
                                     },

                   buttons : [
                               { text  : get_label('BTN-NEW'),
                                 click : function() {
                                   window.pageDesigner.setStyle('New custom style','SAVE_ONLY');
                                   window.pageDesigner.customizeStyleDialog(
                                      'New custom style',
                                      get_label('LBL-STYLE-CUSTOM'),
                                      p_title
                                   );
                                   $( this ).lovDialog("close");
                                 }
                               },

                               { text  : get_label('BTN-OK'),
                                 class : 'a-Button--hot',
                                 click : function() {
                                   $( this ).lovDialog("close");
                                 }
                               }
                             ]
                }
               );

    return 1;
}; // window.pageDesigner.customizeStyle







/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: customizeStyleDialog
 ***************************************************************************/
window.pageDesigner.customizeStyleDialog = function(p_style_name, p_title, p_LOV_title)
{
    'use strict';

    //
    // Exit if not in APEX Page Designer
    //
    if (typeof(window.pageDesigner) != 'object') {
       return 0;
    }

    var l_dialog$;
    var l_dialogPE$;
    var l_settings_obj, l_imp_obj;
    var l_properties1     = [], l_properties2 = [], l_properties3 = [];
    var l_out             = apex.util.htmlBuilder();
    var l_style_name_orig = p_style_name;
    var l_style_name      = 'STYLE_' + p_style_name;


    function is_protected() {
      try {
         var l_protected_obj = JSON.parse(xplug.getStorage(l_style_name,null,true));

         return l_protected_obj.PROTECTED == 'YES';
      } catch(e) {}
      return false;
    }


    l_out.markup('<div')
         .attr('id','ORATRONIK_XPLUG_COLOR_DIALOG')
         .markup('>')
         .markup('<div')
         .attr('id','ColorDlgPE')
         .markup('>');


    l_dialog$ = $(l_out.html)
        .dialog(
                { modal   : false,
                  title   : p_title,
                  width   : 400,

                  close   : function(pEvent) {
                               $('#ORATRONIK_XPLUG_COLOR_DIALOG').remove();
                            },
                  open    : function() {
                               l_dialogPE$ = $('#ColorDlgPE');

                               //
                               // Get settings
                               //
                               try {
                                  l_imp_obj = JSON.parse(xplug.getStorage(l_style_name,null,true));
                               } catch(e) {
                                  console.warn("XPLUG: can't fetch " + l_style_name + " from localStorage. Using defaults.");
                               }
                               l_settings_obj = { "STYLE_NAME" : typeof(l_imp_obj.STYLE_NAME) == 'undefined' ? "Default" : l_imp_obj.STYLE_NAME,
                                                  "DARK_STYLE" : typeof(l_imp_obj.DARK_STYLE) == 'undefined' ? "NO"      : l_imp_obj.DARK_STYLE,
                                                  "SHOW_GRID"  : typeof(l_imp_obj.SHOW_GRID)  == 'undefined' ? "NO"      : l_imp_obj.SHOW_GRID,
                                                  "C1"         : l_imp_obj.C1,
                                                  "C2"         : l_imp_obj.C2,
                                                  "C3"         : l_imp_obj.C3,
                                                  "C4"         : l_imp_obj.C4,
                                                  "C5"         : l_imp_obj.C5,
                                                  "C6"         : l_imp_obj.C6,
                                                  "C7"         : l_imp_obj.C7,
                                                  "C8"         : l_imp_obj.C8,
                                                  "C9"         : l_imp_obj.C9,
                                                  "C10"        : l_imp_obj.C10,
                                                  "CUSTOM_CSS" : typeof(l_imp_obj.CUSTOM_CSS) == 'undefined' ? ""        : l_imp_obj.CUSTOM_CSS
                                             };


                               //
                               // Build properties for property group 1 (style options)
                               //
                               l_properties1[0] = {
                                   propertyName: "style_name",
                                   value:        l_settings_obj.STYLE_NAME,
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.TEXT,
                                       prompt:         get_label('LBL-NAME'),
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "style_id"
                                   },
                                   errors:   [],
                                   warnings: []
                               };

                               l_properties1[1] = {
                                   propertyName: "dark_style",
                                   value:        l_settings_obj.DARK_STYLE,
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.YES_NO,
                                       prompt:         get_label('LBL-DARK-STYLE'),
                                       noValue:        "NO",
                                       yesValue:       "YES",
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "style_id"
                                   },
                                   errors:   [],
                                   warnings: []
                               };

                               l_properties1[2] = {
                                   propertyName: "show_grid",
                                   value:        l_settings_obj.SHOW_GRID,
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.YES_NO,
                                       prompt:         get_label('LBL-SHOW-GRID'),
                                       noValue:        "NO",
                                       yesValue:       "YES",
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "advanced"
                                   },
                                   errors:   [],
                                   warnings: []
                               };


                               //
                               // Build Properties for property group 2 (Customize Colors)
                               //
                               for (var l=1; l<=10; l++) {
                                   l_properties2[ l - 1] = {
                                       propertyName: "col_" + l,
                                       value:        typeof(l_settings_obj["C"+l]) == 'undefined' ? '' : l_settings_obj["C"+l],
                                       metaData: {
                                           type:           $.apex.propertyEditor.PROP_TYPE.COLOR,
                                           prompt:         get_label('LBL-COLOR') + ' ' + l,
                                           isReadOnly:     false,
                                           isRequired:     true,
                                           displayGroupId: "cust_colors"
                                       },
                                       errors:   [],
                                       warnings: []
                                   };
                               }

                               //
                               // Build Properties for property group 3 (Advanced)
                               //
                               l_properties3[0] = {
                                   propertyName: "custom_css",
                                   value:        l_settings_obj.CUSTOM_CSS,
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.TEXTAREA,
                                       prompt:         "Custom CSS",
                                       isReadOnly:     false,
                                       isRequired:     false,
                                       displayGroupId: "advanced"
                                   },
                                   errors:   [],
                                   warnings: []
                               };


                               //
                               // Create Property Editor
                               //
                               $('#ColorDlgPE').propertyEditor( {
                                 focusPropertyName: "style_name",
                                 data: {
                                   propertySet: [
                                     {
                                       displayGroupId    : "style_id",
                                       displayGroupTitle : get_label('LBL-IDENTIFICATION'),
                                       properties        : l_properties1
                                     },
                                     {
                                       displayGroupId    : "cust_colors",
                                       displayGroupTitle : get_label('LBL-CUST-COLORS'),
                                       properties        : l_properties2
                                     },
                                     {
                                       displayGroupId    : "advanced",
                                       displayGroupTitle : get_label('LBL-ADVANCED'),
                                       collapsed         : true,
                                       properties        : l_properties3
                                     }
                                   ] // propertySet
                                 }   // data
                               });   // propertyEditor

                               $( '#ORATRONIK_XPLUG_COLOR_DIALOG' ).dialog({
                                   position: { 'my': 'center', 'at': 'center' }
                               });

                               //
                               // Hack: Prevent colorpicker being hidden behind dialog.
                               // Is this a bug in APEX 5.0 ? Seems as if the APEX dev team
                               // did not expect a colorpicker to run from a property editor
                               // in a dialog ?
                               //
                               $("#ORATRONIK_XPLUG_COLOR_DIALOG button[id$='_picker']")
                                   .click(function()
                                     {
                                        $("div.colorpicker").filter(
                                              function ()
                                                  {
                                                    return $(this).css('display') == 'block';
                                                  }
                                        ).css('z-index',8000);
                                     }
                                   ); // click

                            }, // open
                  buttons : [
                              { text  : get_label('BTN-EXPORT'),
                                click : function() {
                                                      l_out = apex.util.htmlBuilder();
                                                      l_out.markup('<div')
                                                           .attr('id','ORATRONIK_XPLUG_EXPORT_DIALOG')
                                                           .markup('>')
                                                           .markup('<div><textarea width=80 height=20 style="width: 100%; height: 350px">')
                                                           .markup('</textarea></div>');

                                                      $(l_out.html).dialog({
                                                          modal   : true,
                                                          title   : get_label('LBL-STYLE-EXPORT'),
                                                          width   : 700,
                                                          height  : 400,
                                                          close   : function(pEvent) {
                                                                       $(this).dialog( "close" );
                                                                    },

                                                          buttons : [
                                                                      { text  : get_label('BTN-OK'),
                                                                        class : 'a-Button--hot',
                                                                        click : function() {
                                                                           $(this).dialog( "close" );
                                                                        },
                                                                      }
                                                                    ],

                                                          position: { 'my': 'center', 'at': 'center' }
                                                      });

                                                      var l_json = JSON.parse(xplug.getStorage('STYLE_' + l_style_name_orig,null,true));

                                                      $('div#ORATRONIK_XPLUG_EXPORT_DIALOG textarea').val(JSON.stringify(l_json,null,4));
                                                   } // click
                              },

                              { text  : get_label('BTN-DELETE'),
                                click : function() {
                                  xplug.delStorage('STYLE_' + l_style_name_orig,true);
                                  window.pageDesigner.customizeStyle(p_LOV_title);
                                  $(this).dialog("close");
                                },
                                disabled : is_protected()
                              },


                              { text  : get_label('BTN-APPLY'),
                                click : function() {
                                  var l_style_name = $('input[data-property-id=style_name]').val();

                                  var l_c = [];
                                  for (var l=1;l<=10;l++) {
                                      l_c[l] = $('input[data-property-id=col_' + l + ']').val();
                                  }

                                  window.pageDesigner.setStyle
                                    (
                                       l_style_name,
                                       'DO_NOT_SAVE',
                                       $('input[name=ColorDlgPE_2_name]:checked').val() == 'YES',
                                       $('input[name=ColorDlgPE_3_name]:checked').val() == 'YES',
                                       $('textarea[data-property-id="custom_css"').val(),
                                       l_c[1],l_c[2],l_c[3],l_c[4],l_c[5],
                                       l_c[6],l_c[7],l_c[8],l_c[9],l_c[10]
                                    );
                                },
                                disabled : is_protected()
                              },

                              { text  : get_label('BTN-CANCEL'),
                                click : function() {
                                  window.pageDesigner.loadStyle(l_style_name_orig);
                                  window.pageDesigner.customizeStyle(p_LOV_title);
                                  $( this ).dialog( "close" );
                                }
                              },


                              { text  : get_label('BTN-SAVE'),
                                class : 'a-Button--hot',
                                click : function() {
                                  //
                                  // Duplicate code!!! Put this in a function!!!!!
                                  //
                                  var l_style_name = $('input[data-property-id=style_name]').val();

                                  var l_c = [];
                                  for (var l=1;l<=10;l++) {
                                      l_c[l] = $('input[data-property-id=col_' + l + ']').val();
                                  }

                                  window.pageDesigner.setStyle
                                    (
                                       l_style_name,
                                       'SAVE',
                                       $('input[name=ColorDlgPE_2_name]:checked').val(),
                                       $('input[name=ColorDlgPE_3_name]:checked').val(),
                                       $('textarea[data-property-id="custom_css"').val(),
                                       l_c[1],l_c[2],l_c[3],l_c[4],l_c[5],
                                       l_c[6],l_c[7],l_c[8],l_c[9],l_c[10]
                                    );

                                  window.pageDesigner.customizeStyle(p_LOV_title);
                                  $( this ).dialog( "close" );
                                },
                                disabled : is_protected()
                              }
                            ]
                }
       ); // customizeStyleDialog

    return 1;
};


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: setDefaultStylesDialog
 ***************************************************************************/
window.pageDesigner.setDefaultStylesDialog = function(p_title, p_LOV_title)
{
    'use strict';

    //
    // Exit if not in APEX Page Designer
    //
    if (typeof(window.pageDesigner) != 'object') {
       return 0;
    }

    var l_dialog$;
    var l_dialogPE$;
    var l_properties1 = [];
    var l_out         = apex.util.htmlBuilder();


    l_out.markup('<div')
         .attr('id','ORATRONIK_XPLUG_STYLE_DEFAULTS_DIALOG')
         .markup('>')
         .markup('<div')
         .attr('id','StyleDefaultsDlgPE')
         .markup('>');


    l_dialog$ = $(l_out.html)
        .dialog(
                { modal   : true,
                  title   : p_title,
                  width   : 400,

                  close   : function(pEvent) {
                               $('#ORATRONIK_XPLUG_STYLE_DEFAULTS_DIALOG').remove();
                            },
                  open    : function() {

                              function getStyleLOV(p_mode) {
                                var l_arr_LOV    = [];
                                var l_arr_styles = window.pageDesigner.getStyles();

                                for (var l in l_arr_styles) {
                                    if (   (p_mode == 'DAYLIGHT'  && l_arr_styles[l].DARK_STYLE == 'NO')
                                        || (p_mode == 'MOONLIGHT' && l_arr_styles[l].DARK_STYLE == 'YES') ) {

                                        l_arr_LOV.push({ d: l_arr_styles[l].STYLE_NAME,
                                                         r: l_arr_styles[l].STYLE_NAME
                                                       });
                                    } // if
                                }     // for

                                if (p_mode == 'DAYLIGHT') {
                                   l_arr_LOV.push({ d: 'Original (none)', r: 'NONE'});
                                }

                                return l_arr_LOV;
                              }


                               l_dialogPE$ = $('#StyleDefaultsDlgPE');

                               //
                               // Build properties for property group 1 (style options)
                               //
                               l_properties1[0] = {
                                   propertyName: "default_daylight_style",
                                   value:        xplug.getStorage('DEFAULT_BRIGHT_STYLE','Original (none)'),
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.SELECT_LIST,
                                       prompt:         get_label('LBL-DAYLIGHT'),
                                       lovValues:      getStyleLOV('DAYLIGHT'),
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "style_id"
                                   },
                                   errors:   [],
                                   warnings: []
                               };

                               l_properties1[1] = {
                                   propertyName: "default_moonlight_style",
                                   value:        xplug.getStorage('DEFAULT_DARK_STYLE','Moonlight'),
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.SELECT_LIST,
                                       prompt:         get_label('LBL-MOONLIGHT'),
                                       lovValues:      getStyleLOV('MOONLIGHT'),
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "style_id"
                                   },
                                   errors:   [],
                                   warnings: []
                               };



                               //
                               // Create Property Editor
                               //
                               $('#StyleDefaultsDlgPE').propertyEditor( {
                                 focusPropertyName: "default_daylight_style",
                                 data: {
                                   propertySet: [
                                     {
                                       displayGroupId    : "style_id",
                                       displayGroupTitle : get_label('LBL-DEFAULT-STYLES'),
                                       properties        : l_properties1
                                     },
                                   ] // propertySet
                                 }   // data
                               });   // propertyEditor

                               $( '#ORATRONIK_XPLUG_STYLE_DEFAULTS_DIALOG' ).dialog({
                                   position: { 'my': 'center', 'at': 'center' }
                               });


                            }, // open

                  buttons : [
                              { text  : get_label('BTN-CANCEL'),
                                click : function() {
                                  $( this ).dialog( "close" );
                                }
                              },

                              { text  : get_label('BTN-SAVE'),
                                class : 'a-Button--hot',
                                click : function() {
                                  $( this ).dialog( "close" );
                                }
                              }
                            ]
                }
       ); // setDefaultStylesDialog

    return 1;
};
