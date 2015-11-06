var l_maxwidth = $('#glv-viewport').css('width');
var l_width    = parseInt(l_maxwidth.replace('px','')) / 2;


$('#gallery-tabs')
   .css(
         { width :  l_width + 'px' }
       )
   .trigger('resize');

$('#R1157688004078338241').append(
      '<div ID="xplug_handler"></div>'
    + '<div ID="xplug_region"></div>'
);

$('#xplug_handler').css(
    { 'position'          : 'absolute',
      'top'               : '0px',
      'left'              :  (l_width + 5) + 'px',
      'width'             : '8px',
      'height'            : '100%',
       'background-color' : $('.a-Splitter-barH').css('background-color'),
       'border-left'      : '1px solid #c0c0c0',
       'border-right'     : '1px solid #c0c0c0'
    }
);

$('#xplug_region').css(
      { 'position'   : 'absolute',
        'top'        : '0px',
        'padding'    : '5px',
        'left'       :  (l_width + 20) + 'px',
        'width'      : l_maxwidth - l_width,
        'overflow-y' : 'scrollbar',
        'display'    : 'block'
      });

 $('#xplug_region').html(
     'Search: '
   + '<input type="text" size=40 maxlength=255 ID=xplug_search_field>'
   + '<div ID="xplug_search_results"></div>'
 );

$('#xplug_search_field').focusout(
    function() {
        var l_search = $('#xplug_search_field').val();
        if (l_search.length > 0) {
           $('#xplug_search_results').peSearch('search',l_search);
        }
    }
)

 $('#xplug_search_results').peSearch();

 $( document ).on( "modelCleared", function(){
     $('#xplug_search_field').val('');
     $('#xplug_search_results').peSearch('clear');
 });
