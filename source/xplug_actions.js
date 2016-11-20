//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_actions.js
// 2016-01-03 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */
/* jshint -W083 */


/****************************************************************************
 * Install XPLUG custom actions
 ***************************************************************************/
 Xplug.prototype.install_actions = function()
  {
     apex.actions.add(
      [
       {
          name     : "pd-xplug-goto-previous-page",
          label    : xplug.get_label('PREVPAGE'),
          title    : xplug.get_label('PREVPAGE'),
          shortcut : "Alt+B",
          action   : function( event, focusElement )
                     {
                         window.pageDesigner.goToPrevPage();
                         return true;
                     }
        },

        {
          name     : "pd-xplug-goto-next-page",
          label    : xplug.get_label('NEXTPAGE'),
          title    : xplug.get_label('NEXTPAGE'),
          shortcut : "Alt+N",
          action   : function( event, focusElement )
                     {
                         window.pageDesigner.goToNextPage();
                         return true;
                     }
        },

        {
          name     : "pd-xplug-dock-grid-right",
          label    : xplug.get_label('DOCKRIGHT'),
          action   : function( event, focusElement )
                     {
                         return window.pageDesigner.dockGridRight();
                     }
        },

        {
          name     : "pd-xplug-dock-grid-middle",
          label    : xplug.get_label('DOCKMID'),
          action   : function( event, focusElement )
                     {
                         return window.pageDesigner.dockGridMiddle();
                     }
        },

        {
          name     : "pd-xplug-swap-grid-pane",
          label    : xplug.get_label('BTN-SWAP-GRID-PANE'),
          title    : xplug.get_label('BTN-SWAP-GRID-PANE'),
          shortcut : "Alt+M",
          action   : function( event, focusElement )
                     {
                       var l_switched = xplug.getStorage('PANES_SWITCHED','NO');
                       if (l_switched == 'NO') {
                          return window.pageDesigner.dockGridRight();
                       } else {
                          return window.pageDesigner.dockGridMiddle();
                       }
                     }
        },

        {
          name     : "pd-xplug-disable-tooltips",
          label    : xplug.get_label('NOTOOLTIPS'),
          action   : function( event, focusElement )
                     {
                         return window.pageDesigner.disableTooltips();
                     }
        },

        {
          name     : "pd-xplug-enable-tooltips",
          label    : xplug.get_label('TOOLTIPS'),
          action   : function( event, focusElement )
                     {
                         return window.pageDesigner.enableTooltips();
                     }
        },

        {
          name     : "pd-xplug-set-night-mode",
          label    : xplug.get_label('LBL-MOONLIGHT'),
          action   : function( event, focusElement )
                     {
                         return window.pageDesigner.setNightMode();
                     }
        },

        {
          name     : "pd-xplug-set-day-mode",
          label    : xplug.get_label('LBL-DAYLIGHT'),
          action   : function( event, focusElement )
                     {
                         return window.pageDesigner.setDayMode();
                     }
        },

        {
          name     : "pd-xplug-toggle-day-night-mode",
          label    : xplug.get_label('BTN-TGL-DAY-MOON'),
          shortcut : "Alt+F10",
          action   : function( event, focusElement )
                     {
                        var l_style2_is_on = $('button#ORATRONIK_XPLUG_moonsun_button span')
                                                   .attr('class').indexOf('icon-xplug-moon') >= 0;

                        if (l_style2_is_on === true) {
                           return  apex.actions.invoke('pd-xplug-set-day-mode');
                        } else {
                           return  apex.actions.invoke('pd-xplug-set-night-mode');
                        }
                     }
        },

        {
          name     : "pd-xplug-add-sidekick",
          label    : xplug.get_label('LBL-ADD-SIDEKICK'),
          shortcut : "????",
          action   : function( event, focusElement )
                     {
                        var l_factor = xplug.getStorage('SIDEKICK_FACTOR', 0.5);
                        if (l_factor === 0) l_factor = 0.5;
                        return xplug.installSidekick(l_factor);
                     }
        },

        {
          name     : "pd-xplug-remove-sidekick",
          label    : xplug.get_label('LBL-REMOVE-SIDEKICK'),
          shortcut : "????",
          action   : function( event, focusElement )
                     {
                        return xplug.deinstallSidekick();
                     }
        }

      ]
     );
}; // install_actions
