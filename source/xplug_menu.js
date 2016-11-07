//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_menu.js
// 2016-01-03 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */
/* jshint -W083 */


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
                      apex.actions.invoke('pd-xplug-set-day-mode');
                    }
         }
       );

       l_arr_menu_items.push(

         { type   : "separator" },

         {
           type     : "action",
           label    : xplug.get_label('LBL-STYLE-GALLERY'),
           icon    : "icon-theme-roller",
           action   : function()
                      {
                         window.pageDesigner.customizeStyle(xplug.get_label('LBL-STYLE-CUSTOM'));
                      },
           disabled : function()
                      {
                        return $('#ORATRONIK_XPLUG_DIALOG_STYLE_LOV').length > 0;
                      }
         }
       );

       return l_arr_menu_items;
    } // install_SubmenuPickStyles


    function install_SubmenuDockGrid() {
       var l_arr_menu_items = [];

       l_arr_menu_items.push(
         {
            type  : "radioGroup",

            get : function () {
                    return $('div#top_col').prevAll('div#right_col').length == 1
                              ? "RIGHT"
                              : "MIDDLE";
                  },

            set : function(l_radio_value) {
                      switch(l_radio_value) {
                          case "LEFT"   : apex.actions.invoke('pd-xplug-dock-grid-left');
                                          break;
                          case "MIDDLE" : apex.actions.invoke('pd-xplug-dock-grid-middle');
                                          break;
                          case "RIGHT"  : apex.actions.invoke('pd-xplug-dock-grid-right');
                                          break;
                      }
                   },

            choices : [
                {   label : xplug.get_label('LBL-LEFT'),   value : "LEFT",   disabled : true  },
                {   label : xplug.get_label('LBL-MIDDLE'), value : "MIDDLE", disabled : false },
                {   label : xplug.get_label('LBL-RIGHT'),  value : "RIGHT",  disabled : false }
            ]
         }
       );

       return l_arr_menu_items;
    } // install_SubmenuDockGrid


    function install_SubmenuQuickControls() {
       var l_arr_menu_items = [];

       l_arr_menu_items.push(
         {
           type     : "toggle",
           label    : xplug.get_label('NOTOOLTIPS'),
           get      : function()
                      {
                         return xplug.getStorage('TOOLTIPS_DISABLED','NO') == 'YES';
                      },

           set      : function()
                      {
                        if (xplug.getStorage('TOOLTIPS_DISABLED','NO') == 'YES') {

                           apex.actions.invoke('pd-xplug-enable-tooltips')
                              ? pageDesigner.showSuccess(xplug.get_label('MSG-TT-ENABLE-OK'))
                              : pageDesigner.showError(xplug.get_label('MSG-TT-ENABLE-NOK'));

                        } else {

                            apex.actions.invoke('pd-xplug-disable-tooltips')
                            ? pageDesigner.showSuccess(xplug.get_label('MSG-TT-DISABLE-OK'))
                            : pageDesigner.showError(xplug.get_label('MSG-TT-DISABLE-NOK'));
                        }

                        // Remove notification afer 1.5 seconds
                        window.setTimeout( function() {
                                             pageDesigner.hideNotification();
                                           },
                                           1500
                                         );
                      },

           disabled : function() { return false; }
         },

         {
           type     : "toggle",
           label    : xplug.get_label('LBL-ADD-SIDEKICK'),
           get      : function()
                      {
                         return xplug.getStorage('SHOW_SIDEKICK_PANE','NO') == 'YES';
                      },

           set      : function()
                      {
                        if (xplug.getStorage('SHOW_SIDEKICK_PANE','NO') == 'YES') {
                           apex.actions.invoke('pd-xplug-remove-sidekick');
                        } else {
                           apex.actions.invoke('pd-xplug-add-sidekick');
                        }
                      },

           disabled : function()
                      {
                        return xplug.getStorage('SHOW_SIDEKICK_PANE','NO') == 'NO' && window.pe.hasChanged() === true;
                      }
         }
       );

       return l_arr_menu_items;
    } // install_SubmenuQuickControls



    // Inject Xplug popup menu into DOM and create jQuery UI custom menu object
    // For details on the APEX popup menu functionality refer to /images/libraries/apex/widget.menu.js
    $('#ORATRONIK_XPLUG_PLUGIN_MENU').remove();

    var l_menu$ = $("<div id='ORATRONIK_XPLUG_PLUGIN_MENU'></div>");
    $("body").append(l_menu$);


    var oItems =
    {
      items : [
        { type     : "subMenu",
          label    : xplug.get_label('QUICK-CTRL'),
          menu     : { items : install_SubmenuQuickControls() },
          disabled : function()
                     {
                       return false;
                     }

        },

        { type     : "separator" },

        { type     : "subMenu",
          label    : xplug.get_label('LBL-STYLE'),
          menu     : { items : __install_SubmenuPickStyles() },
          disabled : function()
                     {
                       return $('#ORATRONIK_XPLUG_DIALOG_STYLE_LOV').length > 0;
                     }

        },

        { type     : "separator" },

        { type    : "action",
          label   : xplug.get_label('CONFIGURE'),
          icon    : "icon-tools",
          action   : xplug.configureDialog,
          disabled : function()
                     {
                       return 0;
                     }
        },

        { type     : "separator" },


        { type    : "action",
          label   : xplug.get_label('BUG'),
          icon    : "icon-bug",
          action  : function() {
                         window.open('https://gitreports.com/issue/FilipVanVooren/Xplug-for-APEX-Page-Designer');
                    },
          disabled : function()
                     {
                       return 0;
                     }
        },


        { type     : "separator" },

        {
          type     : "action",
          label    : xplug.getVersion(),
          disabled : function() {
                         return true;
                     }
        }
      ]
    };


    // For APEX 5.0 only!
    if (xplug.apex_version.substring(0,3) == '5.0') {

        oItems.items.unshift(
        {
          type     : "subMenu",
          label    : xplug.get_label('DOCK-GRID'),
          icon     : "icon-region-native-sql-report",
          menu     : { items : install_SubmenuDockGrid() },
          disabled : function() {
                        return false;
                     },
        },

        { type   : "separator" }
      );

    } // if


    // Build the menu
    l_menu$.menu(oItems);
}; // install_menu
