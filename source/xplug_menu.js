//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_menu.js
// 2016-01-03 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */


Xplug.prototype.install_menu = function() {

    function __install_SubmenuPickStyles() {
       var l_catalog =  xplug.getStorage('XPLUG_PD_STYLE_CATALOG','#MOONLIGHT#NONE',true);

       if (l_catalog == '#MOONLIGHT#NONE') {
           return [
                    {
                       type     : "action",
                       label    : "Moonlight",
                       action   : function()
                                  {
                                    window.pageDesigner.loadStyle('MOONLIGHT');
                                  }
                    },
                    {
                       type     : "action",
                       label    : "Original (none)",
                       action   : function()
                                  {
                                    apex.actions.invoke('pd-xplug-set-daylight-mode');
                                  }
                    }
                  ];
        }
    } // install_SubmenuPickStyles


    // Inject Xplug popup menu into DOM and create jQuery UI custom menu object
    // For details on the APEX popup menu functionality refer to /images/libraries/widget.menu.js
    var l_menu$ = $("<div id='XplugMenu'></div>");
    $("body").append(l_menu$);

    l_menu$.menu(
    {
      items : [
        {
          type     : "toggle",
          label    : get_label('DOCKRIGHT'),
          get      : function()
                     {
                        return $('div#top_col').prevAll('div#right_col').length == 1;
                     },
          set      : function()
                     {
                        $('div#top_col').prevAll('div#right_col').length === 0
                           ? apex.actions.invoke('pd-xplug-dock-grid-right')
                           : apex.actions.invoke('pd-xplug-dock-grid-middle');
                     },
          disabled : function()
                     {
                       return false;
                     }
        },

        {
          type     : "toggle",
          label    : get_label('NOTOOLTIPS'),
          get      : function()
                     {
                        return xplug.getStorage('TOOLTIPS_DISABLED','NO') == 'YES';
                     },

          set      : function()
                     {
                       if (xplug.getStorage('TOOLTIPS_DISABLED','NO') == 'YES') {

                          apex.actions.invoke('pd-xplug-enable-tooltips')
                             ? pageDesigner.showSuccess(get_label('MSG-TT-ENABLE-OK'))
                             : pageDesigner.showError(get_label('MSG-TT-ENABLE-NOK'));

                       } else {

                           apex.actions.invoke('pd-xplug-disable-tooltips')
                           ? pageDesigner.showSuccess(get_label('MSG-TT-DISABLE-OK'))
                           : pageDesigner.showError(get_label('MSG-TT-DISABLE-NOK'));
                       }

                       // Remove notification afer 1.5 seconds
                       window.setTimeout( function() {
                                            pageDesigner.hideNotification();
                                          },
                                          1500
                                        );
                     },

          disabled : function()
                     {
                       return false;
                     }
        },

        { type     : "separator" },

        { type     : "subMenu",
          label    : get_label('PICK_STYLE'),
          menu     : { items : __install_SubmenuPickStyles()
                     },
          disabled : function()
                     {
                       return $('#ORATRONIK_XPLUG_COLOR_DIALOG').length > 0;
                     }

        },

        { type     : "separator" },

        { type    : "subMenu",
          label   : get_label('CUSTOMIZE'),
          menu    : { items :
                      [
                         {
                           type     : "action",
                           label    : get_label('CUST_COLORS'),
                           action   : function()
                                      {
                                         window.pageDesigner.customizeStyleDialog('MOONLIGHT',get_label('CUST_COLORS'));
                                      },
                           disabled : function()
                                      {
                                        return $('#ORATRONIK_XPLUG_COLOR_DIALOG').length > 0;
                                      }
                         }
                      ]
                    }
        },

        { type     : "separator"
        },
        {
          type     : "action",
          labelKey : "Prototype v1.2",
          disabled : function() {
                         return true;
                     }
        }
      ]
    });
}; // install_menu
