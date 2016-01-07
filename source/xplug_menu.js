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
       var l_arr_menu_items = [];
       var l_arr_keys       = [];

       if (xplug.getStorage('STYLE_Moonlight','NOT_EXIST',true) == 'NOT_EXIST') {
          window.pageDesigner.setStyle('Moonlight','SAVE_ONLY');
       }

       l_arr_keys = xplug.getStorageKeys(true);

       for (var i = 0, l_length = l_arr_keys.length; i < l_length; ++i ) {
           var l_key = l_arr_keys[i];

           if (l_key.substr(0,6) == 'STYLE_') {
              var l_style = JSON.parse(xplug.getStorage(l_key,null,true));

              if (l_style !== null) {
                var l_label = l_style.STYLE_NAME.substr(0,25);

                l_arr_menu_items.push(
                  { type        : "toggle",
                    label       : l_label,
                    xplug_style : l_style.STYLE_NAME,
                    get         : function()
                                  {
                                    return xplug.getStorage('CURRENT_STYLE',null,true) == this.xplug_style;
                                  },
                    set         : function()
                                  {
                                    window.pageDesigner.loadStyle(this.xplug_style);
                                  }
                  }
                );
             } // if l_style
           }   // if l_key
       }       // for

       l_arr_menu_items.push(
         {
            type  : "toggle",
            label : "Original (none)",
            get   : function()
                    {
                     return xplug.getStorage('CURRENT_STYLE','NONE',true) == 'NONE';
                    },
            set   : function()
                    {
                      apex.actions.invoke('pd-xplug-set-daylight-mode');
                    }
         }
       );

       l_arr_menu_items.push(

         { type   : "separator" },

         {
            type  : "action",
            label : get_label('SET_DEFAULTS'),
            get   : function()
                    {
                     return xplug.getStorage('CURRENT_STYLE','NONE',true) == 'NONE';
                    },
            action: function()
                    {
                      window.pageDesigner.setDefaultStylesDialog(get_label('SET_DEFAULTS'));
                    }
         }
       );

       return l_arr_menu_items;
    } // install_SubmenuPickStyles




    // Inject Xplug popup menu into DOM and create jQuery UI custom menu object
    // For details on the APEX popup menu functionality refer to /images/libraries/apex/widget.menu.js
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
          menu     : { items : __install_SubmenuPickStyles() },
          disabled : function()
                     {
                       return $('#ORATRONIK_XPLUG_DIALOG_STYLE_LOV').length > 0;
                     }

        },

        { type     : "separator" },

        { type    : "subMenu",
          label   : get_label('CUSTOMIZE'),
          menu    : { items :
                      [
                         {
                           type     : "action",
                           label    : get_label('LBL-STYLE-CUSTOM'),
                           action   : function()
                                      {
                                         window.pageDesigner.customizeStyle('Customize Page Designer Style');
                                      },
                           disabled : function()
                                      {
                                        return $('#ORATRONIK_XPLUG_DIALOG_STYLE_LOV').length > 0;
                                      }
                         }
                      ]
                    }
        },

        { type     : "separator"
        },
        {
          type     : "action",
          label    : xplug.getVersion(),
          disabled : function() {
                         return true;
                     }
        }
      ]
    });
}; // install_menu
