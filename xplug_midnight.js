function midnight() {
    var l_c1 = '#3f3f3f';       // Dark-Grey
    var l_c2 = '#505050';       // Light-Grey shade 3
    var l_c3 = '#246396';       // Blue
    var l_c4 = '#3c424f';       // Dark-Grey 2
    var l_c5 = '#909090';       // Light grey

    var l_txt_c1 = '#a0a0a0';   // Text-color 1
    var l_txt_c2 = '#ffffff';   // Text-color 2
    var l_txt_c3 = '#cfe6fa';   // Text-color 3

    var l_lf     = "\n";


    var p1 = l_c2;

    //==========================================================================
    // Toolbar, Widgets, tabs, buttons, input fields, etc.
    //==========================================================================
    l_css = ' body                      { background-color: ' + l_c2     + '; }' + l_lf
          + ' div.a-Toolbar-items       { background-color: ' + l_c2     + '; }' + l_lf   // Toolbar items
          + ' a.ui-tabs-anchor          { background-color: ' + l_c2     + '; }' + l_lf
          + ' .ui-tabs-anchor > span    { color: '            + l_txt_c2 + '; }' + l_lf   // Icon color tabs (Rendering, ...)
          + ' .a-PageDesigner-treeTitle { color: '            + l_txt_c2 + '; }' + l_lf   // Tab Tree title color (Rendering, ...)
          + ' a.ui-tabs-anchor          { color: '            + l_txt_c2 + '; }' + l_lf   // Tab label color (Grid Layout, ...)
          + '';

    l_css +='.body,'
          + '.ui-widget-content,'
          + '.a-Toolbar-pageColumn,'
          + '.a-Property, '
          + '.a-PropertyEditor-propertyGroup, '
          + '.a-PropertyEditor-propertyGroup-body, '
          + '.a-PropertyEditor-propertyGroup-header, '
          + '.ui-dialog .a-Property    { border-color: ' + l_c4 + '; }' + l_lf  // Border-color between elements
          + l_lf;

// TODO
// div#spmain .a-Button funktioniert nicht
// alternativ: $('button.a-Button').css('background-color','#a0a0a0')
//
    l_css += ' .ui-tabs-nav .ui-tabs-anchor     { border-right-color : ' + l_c4 + '; }' + l_lf
          +  ' div#sp_main button.a-Button      { background-color   : ' + l_c5 + '; }' + l_lf  // Buttons
          +  ' div#sp_main input,select,textarea '                                       + l_lf
          +  '     { color             : ' + l_txt_c2  + ';'   + l_lf
          +  '       background-color  : ' + l_c4      + '; }' + l_lf           // Input fields
          +  l_lf;


    //==========================================================================
    // Left pane (Tree)
    //==========================================================================
    l_css += ' .a-PageDesigner-treeWrap           { background-color : ' + l_c1 + '; }' + l_lf   // Space between tree and surroundings (tab1-tab4)
          +  ' div#PDrenderingTree.a-TreeView     { background-color : ' + l_c1 + '; }' + l_lf   // Rendering - Tree (=tab1)
          +  ' div#PDdynamicActionTree.a-TreeView { background-color : ' + l_c1 + '; }' + l_lf   // Dynamic Actions - Tree (=tab2)
          +  ' div#PDprocessingTree.a-TreeView    { background-color : ' + l_c1 + '; }' + l_lf   // Processing - Tree (=tab3)
          +  ' div#PDsharedCompTree.a-TreeView    { background-color : ' + l_c1 + '; }' + l_lf   // Processing - Tree (=tab4)
          +  ' span.a-TreeView-label              { color       : ' + l_txt_c1  + '; }' + l_lf   // Node label text color
          +  ' span.a-TreeView-toggle             { color       : ' + l_txt_c1  + '; }' + l_lf   // Node collapse/expand icon color
          +  l_lf;

    //==========================================================================
    // Properties Editor
    //==========================================================================
    l_css += ' .a-PropertyEditor-propertyGroup-header { background-color : ' + l_c3     + '; }' + l_lf  // Group header
          +  ' .a-PropertyEditor-propertyGroup-title  { color            : ' + l_txt_c2 + '; }' + l_lf  // Group header title
          +  ' div.a-Property-fieldContainer          { background-color : ' + l_c2     + '; }' + l_lf  // Fieldcontainer
          +  ' div.a-Property-labelContainer          { background-color : ' + l_c2     + '; }' + l_lf  // Labelcontainer
          +  ' div.a-Property                         { background-color : ' + l_c2     + '; }' + l_lf  // Property button
          +  ' div.a-Property                         { border-color     : ' + l_c1     + ' !important; }' + l_lf  // Property border color
          +  ' .a-Property-field                      { background-color : ' + l_c2     + '; }' + l_lf  // Property input field
          +  ' .a-Property-field                      { color            : ' + l_txt_c3 + '; }' + l_lf  // Property input field
          +  ' .a-Property-label { color : ' + l_txt_c1 + '; text-shadow : none; }'             + l_lf  // Property label
          +  l_lf;

    //==========================================================================
    // Gallery
    //==========================================================================
    l_css += ' div#gallery-tabs div           { background-color : ' + l_c2 + '; }' + l_lf
          +  ' div#gallery-tabs .aTabs-Toolbar { }'
          +  ' ul.a-Gallery                   { background-color : ' + l_c2 + '; }' + l_lf
          +  ' ul.ui-widget-header            { background-color : ' + l_c2 + '; }' + l_lf
          +  ' div.resize.u-ScrollingViewport { background-color : ' + l_c2 + '; }' + l_lf  // Gallery overlay
          +  l_lf;


    //==========================================================================
    // Add CSS style to HTML page head
    //==========================================================================
    var l_style = '<style type="text/css" ID="xplug_theme">'                    + l_lf
                + l_css
                + '</style>'                                                    + l_lf;
    console.log(l_style)

    $("link[href*='/css/Theme-Standard']").after(l_style);

    return;
}
midnight();

    //==========================================================================
    // Toolbar, Widgets, tabs, buttons, input fields, etc.
    //==========================================================================
    $('body').css('background-color',l_c2);
    $('div.a-Toolbar-items').css('background-color',l_c2);                      // Toolbar items
    $('a.ui-tabs-anchor').css('background-color',l_c2);
    $('.ui-tabs-anchor > span').css('color',l_txt_c2);                          // Icon color tabs (Rendering, ...)
    $('.a-PageDesigner-treeTitle').css('color',l_txt_c2);                       // Tab Tree title color (Rendering, ...)
    $('a.ui-tabs-anchor').css('color',l_txt_c2);                                // Tab label color (Grid Layout, ...)

    $(   '.body,'
       + '.ui-widget-content,'
       + '.a-Toolbar-pageColumn,'
       + '.a-Property, '
       + '.a-PropertyEditor-propertyGroup, '
       + '.a-PropertyEditor-propertyGroup-body, '
       + '.a-PropertyEditor-propertyGroup-header, '
       + '.ui-dialog .a-Property').css('border-color',l_c4);                    // Border-color between elements

    $('.ui-tabs-nav .ui-tabs-anchor').css('border-right-color',l_c4);

    $('div#spmain .a-Button').css('background-color',l_c5);                     // Buttons
    $('div#spmain input,select,textarea').css({ 'color'            : l_txt_c2,
                                                'background-color' : l_c4 }) ;  // Input fields

    //==========================================================================
    // Left pane (Tree)
    //==========================================================================
    $('.a-PageDesigner-treeWrap').css('background-color',l_c1);                 // Space between tree and surroundings (tab1-tab4)
    $('div#PDrenderingTree.a-TreeView').css('background-color',l_c1);           // Rendering - Tree (=tab1)
    $('div#PDdynamicActionTree.a-TreeView').css('background-color',l_c1);       // Dynamic Actions - Tree (=tab2)
    $('div#PDprocessingTree.a-TreeView').css('background-color',l_c1);          // Processing - Tree (=tab3)
    $('div#PDsharedCompTree.a-TreeView').css('background-color',l_c1);          // Processing - Tree (=tab4)
    $('span.a-TreeView-label').css('color',l_txt_c1);                           // Node label text color
    $('span.a-TreeView-toggle').css('color',l_txt_c1);                          // Node collapse/expand icon color

    //==========================================================================
    // Properties Editor
    //==========================================================================
    $('.a-PropertyEditor-propertyGroup-header').css('background-color',l_c3);   // Group header
    $('.a-PropertyEditor-propertyGroup-title').css('color',l_txt_c2);           // Group header title
    $('div.a-Property-fieldContainer').css('background-color',l_c2);            // Fieldcontainer
    $('div.a-Property-labelContainer').css('background-color',l_c2);            // Labelcontainer
    $('div.a-Property').css('background-color',l_c2);
    $('.a-Property-label').css({ 'color' : l_txt_c1,
                                 'text-shadow' :'none' });                      // Property label


    //==========================================================================
    // Gallery
    //==========================================================================
    $('ul.a-Gallery').css('background-color',l_c2);
    $('ul.ui-widget-header').css('background-color',l_c2);
    $('div.resize.u-ScrollingViewport').css('background-color',l_c2);           // Gallery overlay

    console.log("midnight done");
}

$(document).on('modelReady', function() {midnight()})
midnight();


===============================================

// Properties Editor - Foreground Color Title
$('.a-PropertyEditor-propertyGroup-title').css('color','#ffffff');

// Properties Editor header - Foreground corlor icon
$('.a-PropertyEditor-propertyGroup-header .a-Icon').css('color','#ff0000');


$('.a-Property-labelContainer').css('color','#ff0000');



//================================
// Tree tab1 (Rendering)
//================================

// Color Tree labels
$('.a-TreeView-label').css('color','#FFFFFF')

// Tree collapse/expand toggle iccon
$('span.a-TreeView-toggle').css('color','#000000')

// Tree Attributes icon
$('span.icon-tree-attributes').css('color','#000000')

// Tree Folder icon
$('span.icon-tree-folder').css('color','#00FF00')

// Tree Folder region
$('span.icon-tree-region').css('color','#0000FF')

// Tree Breadcrumb
$('span.icon-region-native-breadcrumb').css('color','#030303')

// Tree static region
$('span.icon-region-native-static').css('color','#080808')

// Tree region native calendar
$('span.icon-region-native-calendar').css('color','#0303003')

// Tree region plsql
$('span.icon-region-native-plsql').css('color','#000000')

// Tree region native sql report
$('span.icon-region-native-sql-report').css('color','#000000')

// Tree region item hidden
$('span.icon-item-native-hidden').css('color','#000000')

// Tree region item native select
$('span.icon-item-native-select-list').css('color','#000000')

// Tree region item native text field
$('span.icon-item-native-text-field').css('color','#000000')

// Tree region item native date picker
$('span.icon-item-native-date-picker').css('color','#000000')

// Space between tree and its surroundings (tab1-tab4)
$('.a-PageDesigner-treeWrap').css('background-color','#00FF00')

// Rendering - Tree (=tab1) - Background color
$('div#PDrenderingTree.a-TreeView').css('background-color','#FF0000');

// Dynamic Actions - Tree (=tab2) - Background color
$('div#PDdynamicActionTree.a-TreeView').css('background-color','#FF0000')

//  Processing - Tree (=tab3) - Background color
$('div#PDprocessingTree.a-TreeView').css('background-color','#FF0000');

// Processing - Tree (=tab4) - Background color
$('div#PDsharedCompTree.a-TreeView').css('background-color','#FF0000');


//================================
// Tree tab2 (Dynamic actions)
//================================

// Tree process icon  (tab2)
$('span.icon-tree-process').css('color','#000000')


//================================
// Tree tab3 (processes)
//================================

// Tree process icon  (tab3)
$('span.icon-tree-process').css('color','#000000')


//================================
// Tree tab4 (shared components)
//================================
// Tree templates  (tab4)
$('span.icon-tree-templates').css('color','#000000')



//================================
// Properties Editor
//================================
//Properties Editor header - Background Color
$('.a-PropertyEditor-propertyGroup-header').css('background-color','#000000');

// Properties Editor - Foreground Color Title
$('.a-PropertyEditor-propertyGroup-title').css('color','#ffffff');

// Properties Editor header - Foreground corlor icon
$('.a-PropertyEditor-propertyGroup-header .a-Icon').css('color','#ff0000');


$('.a-Property-labelContainer').css('color','#ff0000');

//================================
//Gallery
//================================
$('ul.a-Gallery').css('background-color','#FF0000');
$('ul.ui-widget-header').css('background-color','#000000')

//================================
//Toolbar, Tabs and widgets in general
//================================
$('div.a-Toolbar-items').css('background-color','#000000')
$('body .ui-widget-content').css('background-color','#0000FF');
$('a.ui-tabs-anchor').css('background-color','#c0c0c0');

// Tree region plugin
$('span.icon-region-plugin').css('color','#000000')



//================================
// Properties Editor
//================================
//Properties Editor header - Background Color
$('.a-PropertyEditor-propertyGroup-header').css('background-color','#000000');

// Properties Editor - Foreground Color Title
$('.a-PropertyEditor-propertyGroup-title').css('color','#ffffff');

// Properties Editor header - Foreground corlor icon
$('.a-PropertyEditor-propertyGroup-header .a-Icon').css('color','#ff0000');
$('.a-Property-labelContainer').css('color','#ff0000');

// Properties Editor - Fieldcontainer background-color
$('div.a-Property-fieldContainer').css('background-color','#00FF00');
$('div.a-Property-labelContainer').css('background-color','#FF0000');
$('div.a-Property').css('background-color','#FF0000')

//================================
//Gallery
//================================
$('ul.a-Gallery').css('background-color','#FF0000');
$('ul.ui-widget-header').css('background-color','#000000')

//================================
//Toolbar, Tabs and widgets in general
//================================
$('div.a-Toolbar-items').css('background-color','#000000')
$('body .ui-widget-content').css('background-color','#0000FF');
$('a.ui-tabs-anchor').css('background-color','#FF0000');
$('div.a-ControlBar-col').css('background-color','#FF0000');
$('div.#R48577912101738240 div').css('background-color','#00FF00');
