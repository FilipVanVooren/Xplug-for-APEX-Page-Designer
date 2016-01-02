//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// page_designer_style.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */

/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: setStyle
 ***************************************************************************/
window.pageDesigner.setStyle = function( p_style_name,
                                         p_is_dark_style,
                                         p_show_grid,
                                         p_custom_css,
                                         p1,p2,p3,p4,p5,p6,p7,p8,p9,p_err) {
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

    window.pageDesigner.removeStyle();

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
    l_css += l_lf + ' .ui-tabs-anchor > span        { color: ' + l_c6 + '; }'   // Icon color tabs (Rendering, ...)
          + l_lf  + ' .a-PageDesigner-treeTitle     { color: ' + l_c7 + '; }'   // Tab Tree title color (Rendering, Dynamic Actions, ....)
          + l_lf  + ' .ui-tabs--simpleInset>.a-Tabs-toolbar>.ui-tabs-nav'
                  + ' .ui-tabs-anchor { color: ' + l_c1 + '; border-right-color: ' + l_c4 + '; }'
          + l_lf  + ' .ui-tabs--simpleInset>.a-Tabs-toolbar>.ui-tabs-nav .ui-state-default { background-color: ' + l_c6 + '; }';

    // Toolbar below tabs
    l_css += l_lf  + ' div.a-Toolbar-items           { background-color: ' + l_c1     + '; }';   // Toolbar items


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
    l_css += ' .ui-tabs-nav .ui-tabs-anchor            { border-right-color : ' + l_c4 + '; }'
          +  l_lf + ' div#sp_main button.a-Button      { background-color   : ' + l_c5 + '; }'
          +  l_lf + ' .a-Button.is-active, .a-Button.is-active:active, .a-MenuButton.is-active,'
          +  l_lf + ' .fc-button.ui-state-active, .ui-buttonset .ui-button.ui-state-active,'
                  + ' .ui-buttonset .ui-button.ui-state-active.ui-state-hover:active '
                  + '    { background-color: ' + l_c9 + ' !important; }';                             // Active Buttons

    l_css += ' div#sp_main .a-Button:hover,'
           + ' div#sp_main .fc-button.ui-state-hover { background-color: ' + l_c7 + '!important; }'   // Hover Buttons
           + l_lf;


    //==========================================================================
    // Left pane (Tree)
    //==========================================================================
    l_css +=        ' .a-PageDesigner-treeWrap           { background-color : ' + l_c1 + '; }'          // Space between tree and surroundings (tab1-tab4)
          +  l_lf + ' div#PDrenderingTree.a-TreeView     { background-color : ' + l_c1 + '; }'          // Rendering - Tree (=tab1)
          +  l_lf + ' div#PDdynamicActionTree.a-TreeView { background-color : ' + l_c1 + '; }'          // Dynamic Actions - Tree (=tab2)
          +  l_lf + ' div#PDprocessingTree.a-TreeView    { background-color : ' + l_c1 + '; }'          // Processing - Tree (=tab3)
          +  l_lf + ' div#PDsharedCompTree.a-TreeView    { background-color : ' + l_c1 + '; }'          // Processing - Tree (=tab4)
          +  l_lf + ' span.a-TreeView-label              { color            : ' + l_c5 + '; }'          // Node label text color
          +  l_lf + ' span.a-TreeView-toggle             { color            : ' + l_c5 + '; }'          // Node collapse/expand icon color
          +  l_lf + ' div.resize.u-ScrollingViewport     { background-color : ' + l_c1 + '; }'          // Background color empty space
          +  l_lf + ' ul.ui-widget-header                { background-color : ' + l_c1 + '; }'          // Background color empty space
          +  l_lf;

    //==========================================================================
    // Properties Editor
    //==========================================================================
    l_css +=        ' div#sp_right .a-PropertyEditor-propertyGroup-header { background-color : ' + l_c3  + '; }'  // Group header
          +  l_lf + ' div#sp_right .a-PropertyEditor-propertyGroup-title  { color            : ' + l_c7  + '; }'  // Group header title
          +  l_lf + ' div#sp_right div.a-Property-fieldContainer          { background-color : ' + l_c2  + '; }'  // Fieldcontainer
          +  l_lf + ' div#sp_right div.a-Property-labelContainer          { background-color : ' + l_c2  + '; }'  // Labelcontainer

          +  l_lf + ' div.a-Property.is-error div.a-Property-labelContainer,'                           // Labelcontainer in error
          +  l_lf + ' div.a-Property.is-error div.a-Property-fieldContainer,'                           // Fieldcontainer in error
          +  l_lf + ' .a-Property.is-error { background-color: ' + l_cerr + '!important; }'

          +  l_lf + ' div#sp_right div.a-Property,'
                  + ' div#sp_right div.a-Property:hover,'
                  + ' div#sp_right div.a-Property:focus,'
                  + ' div#sp_right div.a-Property:active                  { background-color : ' + l_c2     + '; }'            // Property button
          +  l_lf + ' div#sp_right div.a-Property                         { border-color     : ' + l_c1     + ' !important; }' // Property border color
          +  l_lf + ' div#sp_right .a-Property-field:hover,'
                  + ' div#sp_right .a-Property-field:focus                { background-color : ' + l_c1    + '; }'             // Property input field (active)
          +  l_lf + ' div#sp_right .a-Property-field                      { background-color : ' + l_c2     + '; }'            // Property input field
          +  l_lf + ' div#sp_right .a-Property-field                      { color            : ' + l_c9     + '; }'            // Property input field
          +  l_lf + ' div#sp_right .a-Property-label                      { color : ' + l_c5 + '; text-shadow : none; }'       // Property label
          +  l_lf + ' div#sp_right .a-PropertyEditor-messageText          { color : ' + l_c6 + '; }'                           // Properties editor message
          +  l_lf +  'div#sp_right select { background-image : url(data:image/svg+xml;base64,' + btoa(l_icon) + '); }'         // Redefine select icon

          +  l_lf + ' .a-Property-checkbox-label, .a-Property-radio, .a-Property-unit { text-shadow :  none; }'
          +  l_lf;

    //==========================================================================
    // Grid Layout - Gallery
    //==========================================================================
    l_css +=       ' div#gallery-tabs div             { background-color : ' + l_c2 + '; }'              // Gallery background
          + l_lf + ' div#gallery-tabs .aTabs-Toolbar  { }'                                               // Gallery tab row reset
          + l_lf + ' div#gallery-tabs .ui-tabs-anchor { background-color : ' + l_c6 + '; border: 0px solid ' + l_c2 + '; border-radius: 2px;}'
                                                                                                         // Gallery tab background color
          + l_lf + ' div#R1157688004078338241 li.ui-state-default { background-color : ' + l_c2 + '; } ' // Hack for border-radius
          + l_lf;



    //==========================================================================
    // Messages, Page Search, Help, Alert Badge
    //==========================================================================
    l_css +=       ' div#messages, div#search, div#help               { background-color : ' + l_c1 + '; }'
          + l_lf + ' div#help-container                               { background-color : ' + l_c1 + '; }'
          + l_lf + ' .ui-tabs-helpTab.ui-state-active .ui-tabs-anchor { background-color : ' + l_c1 + ' !important; }'
          + l_lf + ' div#help-container h3, div#help-container h4     { color : ' + l_c7 + '; }'
          + l_lf + ' div#help-container dt                            { color : ' + l_c7 + '; }'
          + l_lf + ' div#help-container a                             { color : ' + l_c3 + '; }'
          + l_lf + ' div#help-container *                             { color : ' + l_c5 + '; }';

    // Messages
    l_css += l_lf + ' .a-AlertMessages-message                {  color: ' + l_c6 + '; }'
          +  l_lf + ' .a-AlertMessages-message.is-error:hover,'
                  + ' .a-AlertMessages-message.is-error:focus {  background-color : ' + l_c7 + ' !important; }';

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
                + l_scroll                                                      + l_lf;

    if (typeof(p_custom_css) != 'undefined') {
       l_style += p_custom_css + l_lf;
    }

    l_style += '</style>' + l_lf;
    console.log(l_style);

    $("link[href*='/css/Theme-Standard']").after(l_style);

    xplug.setStorage('MOONLIGHT_MODE','YES');                                            // Save option in local database


    var l_settings_obj = { "STYLE_NAME" : p_style_name,
                           "DARK_STYLE" : p_is_dark_style,
                           "SHOW_GRID"  : p_show_grid,
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

    xplug.setStorage('XPLUG_PD_STYLE', JSON.stringify(l_settings_obj) );                 // Save option in local database

    return JSON.stringify(l_settings_obj);
}; // window.pageDesigner.setStyle


window.pageDesigner.removeStyle = function() {
   $('style#XPLUG_THEME').remove();

   xplug.setStorage('MOONLIGHT_MODE','NO');                                              // Save option in local database

   return 1;
}; // window.pageDesigner.removeStyle


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: customizeColors
 ***************************************************************************/
window.pageDesigner.customizeColors= function(p_title)
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
    var l_properties1 = [], l_properties2 = [], l_properties3 = [];
    var l_out         = apex.util.htmlBuilder();

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
                               // l_dialog$.dialog("destroy");
                            },
                  open    : function() {
                               l_dialogPE$ = $('#ColorDlgPE');

                               //
                               // Get settings
                               //
                               try {
                                  l_imp_obj = JSON.parse(xplug.getStorage('XPLUG_PD_STYLE'));
                               } catch(e) {
                                  console.warn("XPLUG: can't fetch XPLUG_PD_STYLE from localStorage. Using defaults.");
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
                                       prompt:         "Name",
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
                                       prompt:         "Dark style",
                                       noValue:        "NO",
                                       yesValue:       "YES",
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "style_id"
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
                                           prompt:         "Color "  + l,
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
                                   propertyName: "show_grid",
                                   value:        l_settings_obj.SHOW_GRID,
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.YES_NO,
                                       prompt:         "Show Grid",
                                       noValue:        "NO",
                                       yesValue:       "YES",
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "advanced"
                                   },
                                   errors:   [],
                                   warnings: []
                               };

                               l_properties3[1] = {
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
                                       displayGroupTitle : "Identification",
                                       properties        : l_properties1
                                     },
                                     {
                                       displayGroupId    : "cust_colors",
                                       displayGroupTitle : "Customize Colors",
                                       properties        : l_properties2
                                     },
                                     {
                                       displayGroupId    : "advanced",
                                       displayGroupTitle : "Advanced",
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
                               // did not expect a colorpicker to run from  a property editor
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
                              { text  : "Export",
                                click : function() {
                                                      l_out = apex.util.htmlBuilder();
                                                      l_out.markup('<div')
                                                           .attr('id','ORATRONIK_XPLUG_EXPORT_DIALOG')
                                                           .markup('>')
                                                           .markup('<div><textarea width=80 height=20 style="width: 100%; height: 350px">')
                                                           .markup('</textarea></div>');

                                                      $(l_out.html).dialog({
                                                          modal   : true,
                                                          title   : 'Export Page Designer style',
                                                          width   : 700,
                                                          height  : 400,
                                                          close   : function(pEvent) {
                                                                       $(this).dialog( "close" );
                                                                    },

                                                          position: { 'my': 'center', 'at': 'center' }
                                                      });

                                                      var l_json = JSON.parse(xplug.getStorage('XPLUG_PD_STYLE'));

                                                      $('div#ORATRONIK_XPLUG_EXPORT_DIALOG textarea').val(JSON.stringify(l_json,null,4));

                                                  }},

                              { text  : "Apply",
                                click : function() {
                                                      var l_style_name = $('input[data-property-id=style_name]').val();

                                                      var l_c = [];
                                                      for (var l=1;l<=10;l++) {
                                                          l_c[l] = $('input[data-property-id=col_' + l + ']').val();
                                                      }
                                                      window.pageDesigner.setStyle(l_style_name,
                                                                                   $('input[name=ColorDlgPE_2_name]:checked').val(),
                                                                                   $('input[name=ColorDlgPE_3_name]:checked').val(),
                                                                                   $('textarea[data-property-id="custom_css"').val(),
                                                                                   l_c[1],l_c[2],l_c[3],l_c[4],l_c[5],
                                                                                   l_c[6],l_c[7],l_c[8],l_c[9],l_c[10]);
                                                   }},

                              { text  : "Close",
                                click : function() {
                                                      $( this ).dialog( "close" );
                                                  }}
                            ]
                }
       ); // customizeColors

    return 1;
};
