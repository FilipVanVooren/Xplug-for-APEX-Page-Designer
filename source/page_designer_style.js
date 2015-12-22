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
window.pageDesigner.setStyle = function(p1,p2,p3,p4,p5,p6,p7,p8,p9,p_err) {
    var l_c1   = p1    || '#3f3f3f';       // Dark-Grey
    var l_c2   = p2    || '#505050';       // Light-Grey shade 3
    var l_c3   = p3    || '#246396';       // Light-blue
    var l_c4   = p4    || '#3c424f';       // Dark-Grey 2
    var l_c5   = p5    || '#909090';       // Light-Grey
    var l_c6   = p6    || '#ac761b';       // Orange
    var l_c7   = p7    || '#ffffff';       // White
    var l_c8   = p8    || '#000000';       // Black
    var l_c9   = p9    || '#cfe6fa';       // light-Cyan
    var l_cerr = p_err || '#FFC3C3';       // Error background color
    var l_lf   = "\n";


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

          +  l_lf + ' div.a-Property.is-error div.a-Property-labelContainer,'                         // Labelcontainer in error
          +  l_lf + ' div.a-Property.is-error div.a-Property-fieldContainer,'                         // Fieldcontainer in error
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
                + l_css
                + l_scroll
                + '</style>'                                                    + l_lf;
    // console.log(l_style);

    $("link[href*='/css/Theme-Standard']").after(l_style);

    xplug.setStorage('MOONLIGHT_MODE','YES');                                            // Save option in local database


    return 1;
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
    //'use strict';

    //
    // Exit if not in APEX Page Designer
    //
    if (typeof(window.pageDesigner) != 'object') {
       return 0;
    }

    var l_dialog$;

    var l_dialogPE$;
    var l_properties = [];

    var l_out = apex.util.htmlBuilder();

    l_out.markup('<div')
         .attr('id','ORATRONIK_XPLUG_COLOR_DIALOG')
         .markup('>')
         .markup('<div')
         .attr('id','colorDlgPE')
         .markup('>');


        //  .markup('<div role="group" class="a-PropertyEditor-propertyGroup is-expanded" data-group-id="TARGET" aria-labelledby="linkDlgPE_g_0_LABEL">')
        //  .markup('<div tabindex="0" class="a-PropertyEditor-propertyGroup-header" aria-controls="linkDlgPE_g_0" aria-expanded="true" aria-labelledby="linkDlgPE_g_0_LABEL">')
        //  .markup('<span class="a-Icon icon-down-arrow" aria-hidden="true"></span><h2 class="a-PropertyEditor-propertyGroup-title" id="linkDlgPE_g_0_LABEL">Customize Colors</h2></div>')
        //  .markup('<div id="linkDlgPE_g_0" class="a-PropertyEditor-propertyGroup-body">')
        //  .markup('<div class="a-Property"')
        //    .markup('<span class="a-Icon icon-required" aria-hidden="true"')
        //    .markup('::before</span>')
        //    .markup('<span class="u-VisuallyHidden">Required</span>')
        //    .markup('<div class="a-Property-labelContainer">')
        //       .markup('<label id="blabla" for="abc" class="a-Property-label">Color 1</label>')
        //    .markup('</div>')
        //    .markup('<div class="a-Property-fieldContainer"')
        //       .markup('<input id="123" type="text" class="a-Property-field a-Property-field--text"')
        //       .markup('</div>')
        //   .markup('</div>')


        //  .markup('<li><label>Colour 1  <input ID="l_c1"   type="text" width=30>')
        //  .markup('<li><label>Colour 2  <input ID="l_c2"   type="text" width=30>')
        //  .markup('<li><label>Colour 3  <input ID="l_c3"   type="text" width=30>')
        //  .markup('<li><label>Colour 4  <input ID="l_c4"   type="text" width=30>')
        //  .markup('<li><label>Colour 5  <input ID="l_c5"   type="text" width=30>')
        //  .markup('<li><label>Colour 6  <input ID="l_c6"   type="text" width=30>')
        //  .markup('<li><label>Colour 7  <input ID="l_c7"   type="text" width=30>')
        //  .markup('<li><label>Colour 8  <input ID="l_c8"   type="text" width=30>')
        //  .markup('<li><label>Colour 9  <input ID="l_c9"   type="text" width=30>')
        //  .markup('<li><label>Colour 10 <input ID="l_c10"  type="text" width=30>')
        //  .markup('</ul></div>');


    l_dialog$ = $(l_out.html)
        .dialog(
                { modal   : false,
                  title   : p_title,
                  width   : 500,
                  height  : 500,
                  close   : function(pEvent) {
                               $('#ColorDlgPE').propertyEditor("destroy");
                               l_dialog$.dialog("destroy");
                               $('#ORATRONIK_XPLUG_COLOR_DIALOG').remove();
                            },
                  open    : function() {
                               l_dialogPE$ = $('#ColorDlgPE');

                               l_properties[ 0 ] = {
                                   propertyName: "Filip",
                                   value:        "blabla",
                                   metaData: {
                                       type:       $.apex.propertyEditor.PROP_TYPE.TEXT,
                                       prompt:     "mal schauen",
                                       isReadOnly: false,
                                       isRequired: true,
                                       displayGroupId: "cust_colors"
                                   },
                                   errors:   [],
                                   warnings: []
                               };

                               console.log(l_properties);

                               $('#ColorDlgPE').propertyEditor( {
                                 focusPropertyName: "Filip",
                                 data: {
                                   propertySet: [
                                     {
                                       displayGroupId:    "cust_colors",
                                       displayGroupTitle: "Customize Colors",
                                       properties       : l_properties
                                     }
                                   ] // propertySet
                                 }   // data
                               });   // propertyEditor

                               $( '#ORATRONIK_XPLUG_COLOR_DIALOG' ).dialog({
                                   position: { 'my': 'center', 'at': 'center' }
                               });


                            },
                  buttons : [
                              { text  : window.pageDesigner.msg("SAVE"),
                                click : function() {
                                                      var l_c = [];
                                                      for (var l=1;l<=10;l++) {
                                                          l_c[l] = $('#l_c' + l).val();
                                                      }
                                                      window.pageDesigner.removeStyle();
                                                      window.pageDesigner.setStyle(l_c[1],l_c[2],l_c[3],l_c[4],l_c[5],
                                                                                   l_c[6],l_c[7],l_c[8],l_c[9],l_c[10]);
                                                      //$( this ).dialog( "close" );
                                                   }},
                              { text  : window.pageDesigner.msg("OK"),
                                click : function() {
                                                      $( this ).dialog( "close" );
                                                  }}
                            ]
                }
       ); // customizeColors

    return 1;
}
