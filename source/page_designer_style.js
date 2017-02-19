//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// page_designer_style.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true, loopfunc: true */
/* jshint -W030 */

/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: setStyle
 ***************************************************************************/
window.pageDesigner.setStyle = function( p_style_name,
                                         p_save_style,
                                         p_is_dark_style,
                                         p_show_grid,
                                         p_override_css,
                                         p_custom_css,
                                         p1,p2,p3,p4,p5,p6,p7,p8,p9,p_err,
                                         p_compatible
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

    var l_css, l_custom_css;


    function is_protected(p_style_name) {
      return (p_style_name.toUpperCase() == 'MOONLIGHT') ? 'YES' : 'NO';
    }


    //==========================================================================
    // Save style settings if required
    //==========================================================================
    var l_settings_obj = { "STYLE_NAME"   : p_style_name,
                           "COMPATIBLE"   : typeof(p_compatible)    === 'undefined' ? '5.0' : p_compatible,
                           "DARK_STYLE"   : typeof(p_is_dark_style) === 'undefined' ? 'NO'  : p_is_dark_style,
                           "SHOW_GRID"    : typeof(p_show_grid)     === 'undefined' ? 'NO'  : p_show_grid,
                           "PROTECTED"    : is_protected(p_style_name),
                           "C1"           : l_c1,
                           "C2"           : l_c2,
                           "C3"           : l_c3,
                           "C4"           : l_c4,
                           "C5"           : l_c5,
                           "C6"           : l_c6,
                           "C7"           : l_c7,
                           "C8"           : l_c8,
                           "C9"           : l_c9,
                           "C10"          : l_cerr,
                           "CUSTOM_CSS"   : p_custom_css
                      };

    if (p_save_style == 'SAVE' || p_save_style == 'SAVE_ONLY') {
       // Save global option in local storage
       xplug.setStorage('STYLE_' + p_style_name, JSON.stringify(l_settings_obj), true);

       if (p_save_style == 'SAVE_ONLY') {
          return;
       }
    }

    window.pageDesigner.unsetStyle();

    //==========================================================================
    // Add Xplug CSS style to HTML page head
    //==========================================================================
    var l_style = '<style type="text/css" ID="XPLUG_THEME">' + l_lf;

    l_custom_css = p_custom_css;
    l_custom_css = l_custom_css.replace(/%%C1%%/gi,l_c1);
    l_custom_css = l_custom_css.replace(/%%C2%%/gi,l_c2);
    l_custom_css = l_custom_css.replace(/%%C3%%/gi,l_c3);
    l_custom_css = l_custom_css.replace(/%%C4%%/gi,l_c4);
    l_custom_css = l_custom_css.replace(/%%C5%%/gi,l_c5);
    l_custom_css = l_custom_css.replace(/%%C6%%/gi,l_c6);
    l_custom_css = l_custom_css.replace(/%%C7%%/gi,l_c7);
    l_custom_css = l_custom_css.replace(/%%C8%%/gi,l_c8);
    l_custom_css = l_custom_css.replace(/%%C9%%/gi,l_c9);
    l_custom_css = l_custom_css.replace(/%%C10%%/gi,l_cerr);

    l_style += l_custom_css + l_lf;
    l_style += '</style>'   + l_lf;

    // console.debug(l_style);

    $("link[href*='/css/Theme-Standard']").after(l_style);

    if (p_show_grid == 'YES') {
       window.pageDesigner.prettyGrid();
    } else {
       window.pageDesigner.noPrettyGrid();
    }

    $('#ORATRONIK_XPLUG_moonsun_button span')
         .removeClass( p_is_dark_style == 'YES' ? 'icon-xplug-sun' : 'icon-xplug-moon')
         .addClass(    p_is_dark_style == 'YES' ? 'icon-xplug-moon': 'icon-xplug-sun');


    if ( p_save_style == 'DO_NOT_SAVE') {
         console.info('XPLUG - Page Designer style "' + p_style_name + '" (DRAFT mode applied).');
    } else {
         console.info('XPLUG - Page Designer Style "' + p_style_name + '" set.');
         xplug.setStorage('CURRENT_STYLE',p_style_name, true);
    }

    return JSON.stringify(l_settings_obj);
}; // window.pageDesigner.setStyle


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: unsetStyle
 ***************************************************************************/
window.pageDesigner.unsetStyle = function()
{
   'use strict';

   $('style#XPLUG_THEME').remove();
   window.pageDesigner.noPrettyGrid();

   $('#ORATRONIK_XPLUG_moonsun_button span')
        .removeClass('icon-xplug-moon')
        .addClass('icon-xplug-sun');

   console.info('XPLUG - Current page designer style unset.');

   xplug.setStorage('CURRENT_STYLE','NONE', true);

   return 1;
}; // window.pageDesigner.unsetStyle


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: loadStyle
 ***************************************************************************/
window.pageDesigner.loadStyle = function(p_style_name)
{
   'use strict';

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
      console.log('XPLUG: could not retrieve Page Designer style "' + p_style_name + '". Reverting to NONE.');
      window.pageDesigner.loadStyle('NONE');
      return 0;
   }


  window.pageDesigner.setStyle
    (
       l_imp_obj.STYLE_NAME,
       'LOAD_STYLE',
       l_imp_obj.DARK_STYLE,
       l_imp_obj.SHOW_GRID,
       l_imp_obj.OVERRIDE_CSS,
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
       l_imp_obj.C10,
       l_imp_obj.COMPATIBLE
    );

    xplug.darkmode = l_imp_obj.DARK_STYLE == 'YES';
}; // window.pageDesigner.loadStyle


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: getStyles
 ***************************************************************************/
window.pageDesigner.getStyles = function()
{
   'use strict';

   var l_arr_styles = [];
   var l_arr_keys   = xplug.getStorageKeys(true);

   for (var i = 0, l_length = l_arr_keys.length; i < l_length; ++i ) {
      var l_key = l_arr_keys[i];

      var l_current = xplug.getStorage('CURRENT_STYLE','',true);

      if (l_key.substr(0,6) == 'STYLE_') {
         var l_style = JSON.parse(xplug.getStorage(l_key,null,true));

         if (typeof(l_style.COMPATIBLE) === 'undefined') {
            l_style.COMPATIBLE = 'APEX 5.0';
         } else {
            l_style.COMPATIBLE = 'APEX ' + l_style.COMPATIBLE;
         }

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
                  title             : xplug.get_label('LBL-STYLE-GALLERY'),
                  resizable         : true,

                  columnDefinitions : [ { name  : "STYLE_NAME",   title : xplug.get_label('LBL-NAME')          },
                                        { name  : "COMPATIBLE",   title : xplug.get_label('LBL-COMPATIBLE')    },
                                        { name  : "DARK_STYLE",   title : xplug.get_label('LBL-DARK-STYLE')    },
                                        { name  : "IS_CURRENT",   title : xplug.get_label('LBL-CRNTLY-ACTIVE') },
                                        { name  : "PROTECTED",    title : xplug.get_label("LBL-PROTECTED")     },
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

                                         // Update Xplug plugin menu: sync Styles in submenu "Pick Style"
                                         xplug.install_menu();
                                      },

                  multiValue       : false,

                  valueSelected    : function( pEvent, pData ) {
                                         window.pageDesigner.customizeStyleDialog(
                                            pData.STYLE_NAME,
                                            xplug.get_label('LBL-STYLE-CUSTOM'),
                                            p_title
                                         );
                                     },

                   buttons : [
                               { text  : xplug.get_label('BTN-IMPORT'),
                                 click : function(pEvent) {
                                            $( this ).lovDialog("close");
                                            window.pageDesigner.importStyleDialog(p_title);
                                         }
                               },

                               { text  : xplug.get_label('BTN-NEW'),
                                 click : function() {
                                   window.pageDesigner.setStyle('New custom style','SAVE_ONLY');
                                   window.pageDesigner.customizeStyleDialog(
                                      'New custom style',
                                      xplug.get_label('LBL-STYLE-CUSTOM'),
                                      p_title
                                   );
                                   $( this ).lovDialog("close");
                                 }
                               },

                               { text  : xplug.get_label('BTN-OK'),
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
 * METHOD: exportStyleDialog
 ***************************************************************************/
 window.pageDesigner.exportStyleDialog = function(p_style)
 {
   'use strict';

   var l_out = apex.util.htmlBuilder();

   l_out.markup('<div ID="ORATRONIK_XPLUG_EXPORT_DIALOG">')
        .markup('<span>' + xplug.get_label('MSG-STYLE-EXPORT') + '</span>')
        .markup('<div><textarea ID=ORATRONIK_XPLUG_TXTAREA_JSON width=80 height=15 style="width: 100%; height: 250px">')
        .markup('</textarea>')
        .markup('</div>');

   $(l_out.html).dialog({
       modal   : true,
       title   : xplug.get_label('LBL-STYLE-EXPORT'),
       width   : 700,
       height  : 400,
       close   : function(pEvent) {
                    $(this).dialog( "close" );
                    $('#ORATRONIK_XPLUG_EXPORT_DIALOG').remove();
                 },

       buttons : [
                   { text  : xplug.get_label('BTN-OK'),
                     class : 'a-Button--hot',
                     click : function() {
                        $(this).dialog( "close" );
                     },
                   }
                 ],

       position: { 'my': 'center', 'at': 'center' }
   });

   var l_json = JSON.parse(xplug.getStorage(p_style,null,true));

   $('textarea#ORATRONIK_XPLUG_TXTAREA_JSON').val(JSON.stringify(l_json,null,4));
 }; // exportStyleDalog



/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: importStyleDialog
 ***************************************************************************/
 window.pageDesigner.importStyleDialog = function(p_LOV_title)
 {
   'use strict';

   var l_out = apex.util.htmlBuilder();

   var C_valid = '#style_name#compatible#dark_style#show_grid#protected'
               + '#c1#c2#c3#c4#c5#c6#c7#c8#c9#c10#custom_css';

   function verifyJSON(p_json) {
     var l_json_obj;
     var l_is_valid;
     var l_req = '';

     $(   'div#ORATRONIK_XPLUG_IMPORT_DIALOG_MSG1,'
        + 'div#ORATRONIK_XPLUG_IMPORT_DIALOG_MSG2,'
        + 'div#ORATRONIK_XPLUG_IMPORT_DIALOG_MSG3'  ).css('display','none');

     if ((p_json === '') || (p_json === null) || (typeof(p_json) == 'undefined')) {
        return undefined;
     }

     try {
            l_json_obj = JSON.parse(p_json);
            l_is_valid = true;
         }
     catch(e)
         {
            l_is_valid = false;
         }


     // Show message
     if (l_is_valid === true) {

        // Check if required keys are all there
        for (var l_key in l_json_obj) {
            l_req += '#' + l_key.toLowerCase();
        }

        if (l_req == C_valid) {
           // JSON code is valid and compatible
           $('div#ORATRONIK_XPLUG_IMPORT_DIALOG_MSG1').css('display','block');

        } else {
           // JSON code is valid but probably incompatible
           $('div#ORATRONIK_XPLUG_IMPORT_DIALOG_MSG3').css('display','block'); }

     } else {
        // JSON code is invalid
        $('div#ORATRONIK_XPLUG_IMPORT_DIALOG_MSG2').css('display','block');
     }

     // Enable or disable "OK" button
     if (l_is_valid === true) {
        $('button#ORATRONIK_XPLUG_STYLE_IMPORT_JSON')
             .removeAttr('disabled')
             .removeClass('disabled ui-button-disabled ui-state-disabled');

        return l_json_obj;
     } else {
        $('button#ORATRONIK_XPLUG_STYLE_IMPORT_JSON').attr('disabled','disabled');
     }
     return undefined;
   }


    l_out = apex.util.htmlBuilder();
    l_out.markup('<div ID="ORATRONIK_XPLUG_IMPORT_DIALOG">')
         .markup('<span>' + xplug.get_label('MSG-STYLE-IMPORT') + '</span>')
         .markup('<div><textarea ID=ORATRONIK_XPLUG_TXTAREA_JSON width=80 height=15 style="width: 100%; height: 250px">')
         .markup('</textarea>')
         .markup('<div ID="ORATRONIK_XPLUG_IMPORT_DIALOG_MSG1" style="display:none; background-color:#0a8040;" width=100%>')
         .markup('<span style="color: #ffffff;">' + xplug.get_label('MSG-STYLE-JSON-OK')   + '</span>')
         .markup('</div>')
         .markup('<div ID="ORATRONIK_XPLUG_IMPORT_DIALOG_MSG2" style="display:none; background-color:#ff0000;" width=100%>')
         .markup('<span style="color: #ffffff;">' + xplug.get_label('MSG-STYLE-JSON-NOK')  + '</span>')
         .markup('</div>')
         .markup('<div ID="ORATRONIK_XPLUG_IMPORT_DIALOG_MSG3" style="display:none; background-color:#ff0000;" width=100%>')
         .markup('<span style="color: #ffffff;">' + xplug.get_label('MSG-STYLE-JSON-FAIL') + '</span>')
         .markup('</div>')
         .markup('</div>');

    $(l_out.html).dialog({
        modal   : true,
        title   : xplug.get_label('LBL-STYLE-IMPORT'),
        width   : 700,
        height  : 400,
        close   : function(pEvent) {
                     $(this).dialog( "close" );
                     $('#ORATRONIK_XPLUG_IMPORT_DIALOG').remove();
                     window.pageDesigner.customizeStyle(p_LOV_title);
                  },

        buttons : [
                    { text  : xplug.get_label('BTN-CLEAR'),
                      click : function() {
                         $('textarea#ORATRONIK_XPLUG_TXTAREA_JSON')
                             .val('')
                             .trigger('change');
                      },
                    },

                    { text  : xplug.get_label('BTN-CANCEL'),
                      click : function() {
                         $(this).dialog( "close" );
                      },
                    },

                    { text     : xplug.get_label('BTN-OK'),
                      id       : 'ORATRONIK_XPLUG_STYLE_IMPORT_JSON',
                      class    : 'a-Button--hot',
                      disabled : true,
                      click    : function() {
                         var l_imp_obj = verifyJSON(
                                 $('textarea#ORATRONIK_XPLUG_TXTAREA_JSON').val()
                             );

                         window.pageDesigner.setStyle
                           (
                              l_imp_obj.STYLE_NAME,
                              'SAVE_ONLY',
                              l_imp_obj.DARK_STYLE,
                              l_imp_obj.SHOW_GRID,
                              l_imp_obj.OVERRIDE_CSS,
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
                              l_imp_obj.C10,
                              l_imp_obj.COMPATIBLE
                           );

                         $(this).dialog( "close" );
                      },
                    }
                  ],

        position: { 'my': 'center', 'at': 'center' }
    });

    $('textarea#ORATRONIK_XPLUG_TXTAREA_JSON')
       .on('change click keydown mouseout', function() { verifyJSON($(this).val()); });

}; // window.pageDesigner.importStyleDialog



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
    var l_style_name_curr = xplug.getStorage('CURRENT_STYLE','NONE',true);
    var l_style_name      = 'STYLE_' + p_style_name;
    var l_style_name_orig = l_style_name;
    var l_style_applied   = false;
    var l_style_saved     = false;


    function is_protected() {
      try {
         var l_protected_obj = JSON.parse(xplug.getStorage(l_style_name,null,true));

         return l_protected_obj.PROTECTED == 'YES';
      } catch(e) {}

      return false;
    } // is_protected


    function is_default() {
      var l_style1  = xplug.getStorage('DEFAULT_STYLE1',null,true);
      var l_style2  = xplug.getStorage('DEFAULT_STYLE2',null,true);
      var l_current = xplug.getStorage('CURRENT_STYLE',null,true);

      if ((p_style_name == l_style1) || (p_style_name == l_style2) || (p_style_name == l_current)) {
         return true;
      }

      return false;
    } // is_default


    function apply_style(p_save_mode) {
      //
      // Process new/updated values
      //
      var l_style_name = $('input[data-property-id=style_name]').val();

      var l_c = [];
      for (var l=1;l<=10;l++) {
          l_c[l] = $('input[data-property-id=col_' + l + ']').val();
      }

      window.pageDesigner.setStyle
        (
           l_style_name,
           p_save_mode,
           $('input[name=ColorDlgPE_2_name]:checked').val(),
           $('input[name=ColorDlgPE_3_name]:checked').val(),
           'YES',
           $('textarea[data-property-id="custom_css"').val(),
           l_c[1],l_c[2],l_c[3],l_c[4],l_c[5],
           l_c[6],l_c[7],l_c[8],l_c[9],l_c[10],
           $('#ColorDlgPE_4').val()
        );

      l_style_applied = true;
    } // apply_style


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
                  width   : 500,

                  close   : function(pEvent) {
                               // Hide any remaining notifications
                               pageDesigner.hideNotification();

                               $('#ORATRONIK_XPLUG_COLOR_DIALOG').remove();

                               // Remove all colorpicker DIVs and associated quick-picks
                               // Why isn't this automatically handled by APEX, could this be a bug ?
                               //
                               // The problem is that the many DIV's start accumulating which can result in a slow reponse
                               // as the DOM gets bloated with way too many DIV's.
                               $('div.colorpicker').remove();
                               $('div[id^=ColorDlgPE_').remove();

                               // Reactivate current style if we didn't change anything
                               if ( (l_style_applied === true) && (l_style_saved === false) )  {
                                  window.pageDesigner.loadStyle(l_style_name_curr);
                               }

                               // Get rid of remaining draft style, always!
                               xplug.delStorage('STYLE_New custom style',true);

                               // Back to Style Gallery
                               window.pageDesigner.customizeStyle(p_LOV_title);
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
                               l_settings_obj = { "STYLE_NAME"   : typeof(l_imp_obj.STYLE_NAME) === 'undefined' ? "Default" : l_imp_obj.STYLE_NAME,
                                                  "DARK_STYLE"   : typeof(l_imp_obj.DARK_STYLE) === 'undefined' ? "NO"      : l_imp_obj.DARK_STYLE,
                                                  "SHOW_GRID"    : typeof(l_imp_obj.SHOW_GRID)  === 'undefined' ? "NO"      : l_imp_obj.SHOW_GRID,
                                                  "C1"           : l_imp_obj.C1,
                                                  "C2"           : l_imp_obj.C2,
                                                  "C3"           : l_imp_obj.C3,
                                                  "C4"           : l_imp_obj.C4,
                                                  "C5"           : l_imp_obj.C5,
                                                  "C6"           : l_imp_obj.C6,
                                                  "C7"           : l_imp_obj.C7,
                                                  "C8"           : l_imp_obj.C8,
                                                  "C9"           : l_imp_obj.C9,
                                                  "C10"          : l_imp_obj.C10,
                                                  "CUSTOM_CSS"   : typeof(l_imp_obj.CUSTOM_CSS)   === 'undefined' ? ""    : l_imp_obj.CUSTOM_CSS,
                                                  "COMPATIBLE"   : typeof(l_imp_obj.COMPATIBLE)   === 'undefined' ? "5.0" : l_imp_obj.COMPATIBLE
                                             };


                               //
                               // Build properties for property group 1 (style options)
                               //
                               l_properties1[0] = {
                                   propertyName: "style_name",
                                   value:        l_settings_obj.STYLE_NAME,
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.TEXT,
                                       prompt:         xplug.get_label('LBL-NAME'),
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
                                       prompt:         xplug.get_label('LBL-DARK-STYLE'),
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
                                       prompt:         xplug.get_label('LBL-SHOW-GRID'),
                                       noValue:        "NO",
                                       yesValue:       "YES",
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "style_id"
                                   },
                                   errors:   [],
                                   warnings: []
                               };

                               l_properties1[3] = {
                                   propertyName: "compatible",
                                   value:        "5.0",
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.SELECT_LIST,
                                       prompt:         xplug.get_label('LBL-COMPATIBLE'),
                                       lovValues:      [ { d: "Oracle Application Express 5.0", r: "5.0" },
                                                         { d: "Oracle Application Express 5.1", r: "5.1" },
                                                         { d: "Oracle Application Express 5.x", r: "5.x" } ],
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
                                           prompt:         xplug.get_label('LBL-COLOR') + ' ' + l,
                                           isReadOnly:     false,
                                           isRequired:     true,
                                           displayGroupId: "cust_colors"
                                       },
                                       errors:   [],
                                       warnings: []
                                   };
                               }

                               //
                               // Build Properties for property group 3 (Custom CSS)
                               //
                               l_properties3[0] = {
                                   propertyName: "custom_css",
                                   value:        l_settings_obj.CUSTOM_CSS,
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.TEXTAREA,
                                       prompt:         xplug.get_label('MSG-STYLE-CSS-COLOR'),
                                       isReadOnly:     false,
                                       isRequired:     false,
                                       displayGroupId: "custom_css"
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
                                       displayGroupTitle : xplug.get_label('LBL-IDENTIFICATION'),
                                       properties        : l_properties1
                                     },
                                     {
                                       displayGroupId    : "custom_css",
                                       displayGroupTitle : xplug.get_label('LBL-CUST-CSS'),
                                       properties        : l_properties3
                                     },
                                     {
                                       displayGroupId    : "cust_colors",
                                       displayGroupTitle : xplug.get_label('LBL-CUST-COLORS'),
                                       properties        : l_properties2
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

                               // Set height of Custom CSS textarea AND turn off spell-checking
                               $('#ColorDlgPE_5').css('height','150px')
                                                 .attr('spellcheck','false');

                            }, // open
                  buttons : [
                              { text  : xplug.get_label('BTN-EXPORT'),
                                click : function() {
                                            window.pageDesigner.exportStyleDialog(l_style_name);
                                        }
                              },

                              { text  : xplug.get_label('BTN-DELETE'),
                                click : function() {
                                  xplug.delStorage(l_style_name_orig,true);
                                  console.log('XPLUG - Page Designer Style "' + l_style_name_orig.substring(6) + '" deleted.');
                                  $(this).dialog("close");
                                },
                                disabled : is_protected() || is_default()
                              },


                              { text  : xplug.get_label('BTN-APPLY'),
                                click : function() {
                                  //
                                  // Apply style but don't save
                                  //
                                  apply_style('DO_NOT_SAVE');
                                },
                                disabled : is_protected()
                              },

                              { text  : xplug.get_label('BTN-CANCEL'),
                                click : function() {
                                    $( this ).dialog( "close" );
                                }
                              },


                              { text  : xplug.get_label('BTN-SAVE'),
                                class : 'a-Button--hot',
                                click : function() {

                                  // Prevent saving a draft template
                                  var l_new_name = $('input[data-property-id=style_name]').val();
                                  if (l_new_name == 'New custom style') {
                                     pageDesigner.showError(xplug.get_label('MSG-STYLE-IS-DRAFT'));
                                     return;
                                  }

                                  // Apply the new style and save in localStorage
                                  apply_style('SAVE');
                                  l_style_saved = true;

                                  $( this ).dialog( "close" );
                                },
                                disabled : is_protected()
                              }
                            ]
                }
       ); // customizeStyleDialog

    return 1;
};
