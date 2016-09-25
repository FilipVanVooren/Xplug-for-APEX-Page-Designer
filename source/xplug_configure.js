//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_configure.js
// 2016-05-02 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */


/****************************************************************************
 * Add custom method to pageDesigner Object
 * METHOD: configureDialog
 ***************************************************************************/
Xplug.prototype.configureDialog = function()
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
    var l_properties1 = [];
    var l_properties2 = [];
    var l_properties3 = [];
    var l_properties4 = [];
    var l_out         = apex.util.htmlBuilder();

    l_out.markup('<div')
         .attr('id','ORATRONIK_XPLUG_CONFIG_DIALOG')
         .markup('>')
         .markup('<div')
         .attr('id','ConfigDlgPE')
         .markup('>');


    l_dialog$ = $(l_out.html)
        .dialog(
                { modal   : false,
                  title   : get_label('LBL-XPLUG-SETTINGS'),
                  width   : 450,

                  close   : function(pEvent) {
                               // Hide any remaining notifications
                               pageDesigner.hideNotification();

                               $('#ORATRONIK_XPLUG_CONFIG_DIALOG').remove();
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


                               l_dialogPE$ = $('#ConfigDlgPE');

                               l_properties1.push(
                                {
                                   propertyName: "show_moonlight_toggle",
                                   value:        xplug.getStorage('BTN-THEME-SWITCH','NO'),
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.YES_NO,
                                       prompt:         '',
                                       noValue:        "NO",
                                       yesValue:       "YES",
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "buttons"
                                   },
                                   errors:   [],
                                   warnings: []
                                });


                              if (xplug.apex_version.substring(0,3) == '5.0')  {
                                 l_properties1.push(
                                   {
                                     propertyName: "show_prevnext_buttons",
                                     value:        xplug.getStorage('BTN-PRVNEXT-PAGE','NO'),
                                     metaData: {
                                         type:           $.apex.propertyEditor.PROP_TYPE.YES_NO,
                                         prompt:         '',
                                         noValue:        "NO",
                                         yesValue:       "YES",
                                         isReadOnly:     false,
                                         isRequired:     true,
                                         displayGroupId: "buttons"
                                     },
                                     errors:   [],
                                     warnings: []
                                 });

                                 l_properties1.push(
                                   {
                                     propertyName: "show_swap_gridpane",
                                     value:        xplug.getStorage('BTN-SWAP-GRID-PANE','NO'),
                                     metaData: {
                                         type:           $.apex.propertyEditor.PROP_TYPE.YES_NO,
                                         prompt:         '',
                                         noValue:        "NO",
                                         yesValue:       "YES",
                                         isReadOnly:     false,
                                         isRequired:     true,
                                         displayGroupId: "buttons"
                                     },
                                     errors:   [],
                                     warnings: []
                                });
                              }  // if


                               //
                               // Build properties for property group 2 (Default styles)
                               //
                               l_properties2.push(
                                  {
                                   propertyName: "default_daylight_style",
                                   value:        xplug.getStorage('DEFAULT_STYLE1','NONE',true),
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
                               });

                               l_properties2.push(
                                 {
                                   propertyName: "default_moonlight_style",
                                   value:        xplug.getStorage('DEFAULT_STYLE2','Moonlight',true),
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
                               });

                               //
                               // Build Properties for property group 3 (Advanced)
                               //
                               l_properties3.push(
                                 {
                                   propertyName: "enhance_pd_title",
                                   value:        xplug.getStorage('APP+ID-IN-PD-TITLE','NO'),
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.YES_NO,
                                       prompt:         get_label('LBL-SHOW-APPID'),
                                       noValue:        "NO",
                                       yesValue:       "YES",
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "advanced"
                                   },
                                   errors:   [],
                                   warnings: []
                               });


                               //
                               // Build Properties for property group 4 (Experimental)
                               //
                               l_properties4.push(
                                 {
                                   propertyName: "enable-tab-pagedet",
                                   value:        xplug.getStorage('SIDEKICK-TAB-PAGEDET','NO'),
                                   metaData: {
                                       type:           $.apex.propertyEditor.PROP_TYPE.YES_NO,
                                       prompt:         get_label('LBL-ENABLE-PAGEDET'),
                                       noValue:        "NO",
                                       yesValue:       "YES",
                                       isReadOnly:     false,
                                       isRequired:     true,
                                       displayGroupId: "experimental"
                                   },
                                   errors:   [],
                                   warnings: []
                               });


                               //
                               // Create Property Editor
                               //
                               $('#ConfigDlgPE').propertyEditor( {
                                 focusPropertyName: "show_moonlight_toggle",
                                 data: {
                                   propertySet: [
                                     {
                                       displayGroupId    : "buttons",
                                       displayGroupTitle : get_label('LBL-SHOW-BUTTONS'),
                                       properties        : l_properties1
                                     },
                                     {
                                       displayGroupId    : "style_id",
                                       displayGroupTitle : get_label('LBL-DEFAULT-STYLES'),
                                       properties        : l_properties2
                                     },
                                     {
                                       displayGroupId    : "advanced",
                                       displayGroupTitle : get_label('LBL-ADVANCED'),
                                       properties        : l_properties3
                                     },
                                     {
                                       displayGroupId    : "experimental",
                                       displayGroupTitle : get_label('LBL-EXPERIMENTAL'),
                                       properties        : l_properties4
                                     }
                                   ] // propertySet
                                 }   // data
                               });   // propertyEditor

                               $( '#ORATRONIK_XPLUG_CONFIG_DIALOG' ).dialog({
                                   position: { 'my': 'center', 'at': 'center' }
                               });

                              $('#ConfigDlgPE_1_label')
                                      .append('&nbsp; <span class="a-Icon icon-xplug-moon"></span>'
                                            + '/'
                                            + '&nbsp; <span class="a-Icon icon-xplug-sun"></span>');

                              if (xplug.apex_version.substring(0,3) == '5.0')  {
                                  $('#ConfigDlgPE_2_label')
                                          .append('&nbsp; <span class="a-Icon icon-xplug-previous"></span>'
                                                + '&nbsp; <span class="a-Icon icon-xplug-next"></span>');


                                  $('#ConfigDlgPE_3_label')
                                        .append('&nbsp; <span class="a-Icon icon-xplug-arrows-h"></span>');
                              }

                              $('div#ORATRONIK_XPLUG_CONFIG_DIALOG .a-Property-labelContainer')
                                 .css('min-width','300px');

                            }, // open
                  buttons : [
                              { text  : get_label('BTN-CANCEL'),
                                click : function() {
                                    $( this ).dialog( "close" );
                                }
                              },

                              { text  : get_label('BTN-APPLY'),
                                click : function() {
                                  var sThemeSwitch, sPageNav, sSwapGrid, sStyle1, sStyle2, sPDTitle, sTabPageDet;

                                  if (xplug.apex_version.substring(0,3) == '5.0') {
                                     sThemeSwitch = 'input[name=ConfigDlgPE_1_name]:checked';
                                     sPageNav     = 'input[name=ConfigDlgPE_2_name]:checked';
                                     sSwapGrid    = 'input[name=ConfigDlgPE_3_name]:checked';
                                     sStyle1      = '#ConfigDlgPE_4';
                                     sStyle2      = '#ConfigDlgPE_5';
                                     sPDTitle     = 'input[name=ConfigDlgPE_6_name]:checked';
                                     sTabPageDet  = 'input[name=ConfigDlgPE_7_name]:checked';
                                  } else {
                                     sThemeSwitch = 'input[name=ConfigDlgPE_1_name]:checked';
                                     sPageNav     = '';
                                     sSwapGrid    = '';
                                     sStyle1      = '#ConfigDlgPE_2';
                                     sStyle2      = '#ConfigDlgPE_3';
                                     sPDTitle     = 'input[name=ConfigDlgPE_4_name]:checked';
                                     sTabPageDet  = 'input[name=ConfigDlgPE_5_name]:checked';
                                  }

                                  if ($(sThemeSwitch).val() == 'YES') { xplug.installThemeSwitch();   }
                                                                else  { xplug.deinstallThemeSwitch(); }

                                  if (xplug.apex_version.substring(0,3) == '5.0')  {
                                      if ($(sPageNav).val() == 'YES') { xplug.installPageButtons();   }
                                                                else  { xplug.deinstallPageButtons(); }


                                      if ($(sSwapGrid).val() == 'YES') { xplug.installSwapGrid();   }
                                                                 else  { xplug.deinstallSwapGrid(); }
                                  }

                                  if ($(sPDTitle).val() == 'YES') { xplug.installPDTitle();   }
                                                            else  { xplug.deinstallPDTitle(); }


                                  xplug.setStorage('SIDEKICK-TAB-PAGEDET',$(sTabPageDet).val());

                                  if (xplug.getStorage('SHOW_SIDEKICK_PANE','NO') == 'YES')   {
                                      xplug.deinstallSidekick();
                                      xplug.installSidekick();
                                  }

                                  var l_style1 = $(sStyle1).val();
                                  var l_style2 = $(sStyle2).val();
                                  var l_class  = $('button#ORATRONIK_XPLUG_moonsun_button span').attr('class');

                                  xplug.setStorage('DEFAULT_STYLE1',l_style1,true);
                                  xplug.setStorage('DEFAULT_STYLE2',l_style2,true);

                                  if (typeof(l_class) != 'undefined') {
                                    window.pageDesigner.loadStyle(
                                        l_class.indexOf('icon-xplug-moon') > -1 ? l_style2
                                                                                : l_style1
                                    );
                                  }

                                  $( this ).dialog( "close" );
                                },
                                disabled : false
                              }
                            ]
                }
       ); // configureDialog

    return 1;
};
