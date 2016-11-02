//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_feature_sidekick_markdown.js
// 2016-02-07 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */



Xplug.prototype.showDocumentation = function ()
{
  'use strict';

  var oProp, sAppId, sChangedBy, sChangedOn, sPageComment, sHTML, sFragment, oRenderer;

  // Get Page details
  sAppId       = pe.getCurrentAppId();                                     // Appp-ID
  oProp        = xplug.getFilteredComponentProperties(381,sAppId)[0];      // 381=Changed By
  sChangedBy   = typeof(oProp) == 'object' ? oProp.getDisplayValue()
                                           : 'none';

  oProp        = xplug.getFilteredComponentProperties(382,sAppId)[0];      // 382=Changed On
  sChangedOn   = typeof(oProp) == 'object' ? oProp.getDisplayValue()
                                           : '-';

  oProp        = xplug.getFilteredComponentProperties(4,sAppId)[0];        // 4=Comment
  sPageComment = typeof(oProp) == 'object' ? oProp.getDisplayValue()
                                           : '';

  // Performance. Return early if there's nothing to show anyway.
  sFragment = '';
  if (sPageComment.length > 0) {
     if (xplug.getStorage('MARKDOWN_ENABLED','NO',true) == 'YES') {
        // Setup custom markdown link renderer
        // Is required, because links always need to be opened in a new tab/window.
        // Otherwise we would leave Page Designer
        oRenderer = new marked.Renderer();
        oRenderer.link  = function(shref, sTitle, sText) {
                            var sURL =  '<a href="' + shref + '" target="_blank">' + sText + '</a>';
                            return sURL;
                          };

        marked.setOptions({ sanitize : true,
                            gfm      : true,                                     // Github markdown mode
                            breaks   : true,                                     // GFM line break mode
                            renderer : oRenderer });

        sFragment = marked(sPageComment);                                        // Using marked.js
     } else {
        sFragment = '<pre>' + sPageComment + '</pre><br>';
     }
     sFragment = filterXSS(sFragment);                                           // Sanitize with xss.js
     sFragment += '<br>';
  }

  // Build page details
  sHTML = sFragment
        + '<h2>Page history</h2>'
        + 'Latest change by ' + sChangedBy + ' on ' + sChangedOn;

  $('div#xplug_pb_docu').html(sHTML).css('padding','5px');
  $('div#xplug_pb_docu pre').css('display','inline');
}; // showDocumentation


// TODO
// To change a visible comment
// $("textarea[data-property-id='4']").val('blabla').trigger('change')
