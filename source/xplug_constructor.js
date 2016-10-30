//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_constructor.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */

var Xplug = function() {
   var C_version = 'Xplug v1.4.0.0 beta 1';
   var C_author  = 'Filip van Vooren';

   this.version       = C_version;
   this.author        = C_author;
   this.arr_page_list = [];
   this.darkmode      = false;
   this.apex_version  = '?.?.?.?';


   // Exit if not in APEX Page Designer
   if (typeof(window.pageDesigner) != 'object') {
      return 0;
   }


  /****************************************************************************
   * Install XPLUG custom actions
   ***************************************************************************/
    function __install_actions()
    {
       apex.actions.add(
        [
         {
            name     : "pd-xplug-goto-previous-page",
            label    : get_label('PREVPAGE'),
            title    : get_label('PREVPAGE'),
            shortcut : "Alt+B",
            action   : function( event, focusElement )
                       {
                           window.pageDesigner.goToPrevPage();
                           return true;
                       }
          },

          {
            name     : "pd-xplug-goto-next-page",
            label    : get_label('NEXTPAGE'),
            title    : get_label('NEXTPAGE'),
            shortcut : "Alt+N",
            action   : function( event, focusElement )
                       {
                           window.pageDesigner.goToNextPage();
                           return true;
                       }
          },

          {
            name     : "pd-xplug-dock-grid-right",
            label    : get_label('DOCKRIGHT'),
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.dockGridRight();
                       }
          },

          {
            name     : "pd-xplug-dock-grid-middle",
            label    : get_label('DOCKMID'),
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.dockGridMiddle();
                       }
          },

          {
            name     : "pd-xplug-swap-grid-pane",
            label    : get_label('BTN-SWAP-GRID-PANE'),
            title    : get_label('BTN-SWAP-GRID-PANE'),
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
            label    : get_label('NOTOOLTIPS'),
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.disableTooltips();
                       }
          },

          {
            name     : "pd-xplug-enable-tooltips",
            label    : get_label('TOOLTIPS'),
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.enableTooltips();
                       }
          },

          {
            name     : "pd-xplug-set-night-mode",
            label    : get_label('LBL-MOONLIGHT'),
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.setNightMode();
                       }
          },

          {
            name     : "pd-xplug-set-day-mode",
            label    : get_label('LBL-DAYLIGHT'),
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.setDayMode();
                       }
          },

          {
            name     : "pd-xplug-toggle-day-night-mode",
            label    : get_label('BTN-TGL-DAY-MOON'),
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
            label    : get_label('LBL-ADD-SIDEKICK'),
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
            label    : get_label('LBL-REMOVE-SIDEKICK'),
            shortcut : "????",
            action   : function( event, focusElement )
                       {
                          return xplug.deinstallSidekick();
                       }
          }

        ]
       );
    } // install_actions


   /****************************************************************************
    * Xplug initialization
    ***************************************************************************/
    function __init()
    {

      function add_css_to_page_header() {
        // Add custom CSS to page header
        $('head').append(
            + l_lf + '<style type="text/css">'
            + l_lf + '  button#ORATRONIK_XPLUG:hover            { background-color: #FFFFFF!important; }'
            + l_lf + '  .a-Icon.icon-xplug-previous::before     { content: "\\e029" }'
            + l_lf + '  .a-Icon.icon-xplug-next::before         { content: "\\e028" }'
            + l_lf + '  .a-Icon.icon-xplug-arrows-h '    + get_svg_icon('arrows_h',14,14,null,1)
            + l_lf + '  .a-Icon.icon-xplug-arrow-left '  + get_svg_icon('arrow_left',14,14,null,1)
            + l_lf + '  .a-Icon.icon-xplug-arrow-right ' + get_svg_icon('arrow_right',14,14,null,1)
            + l_lf + '  .a-Icon.icon-xplug-moon '        + get_svg_icon('moon',14,14,null,1)
            + l_lf + '  .a-Icon.icon-xplug-sun  '        + get_svg_icon('sun',14,14,null,1)
            + l_lf + '  .a-Icon.icon-xplug-forbidden '   + get_svg_icon('forbidden',16,16,null,1)
            + l_lf + '</style>'
        );
      }

       // SVG Lifebuoy icon definition
       var C_svg = '<path class="path1" d="M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512'
                 + ' 512-229.23 512-512-229.23-512-512-512zM320 512c0-106.040 85.96-192 192-192s192 85.96 192 192-85.96 192-192'
                 + ' 192-192-85.96-192-192zM925.98 683.476v0l-177.42-73.49c12.518-30.184 19.44-63.276 19.44-97.986s-6.922-67.802-19.44-97.986l177.42-73.49c21.908'
                 + ' 52.822 34.020 110.73 34.020 171.476s-12.114 118.654-34.020 171.476v0zM683.478 98.020v0 0l-73.49 177.42c-30.184-12.518-63.276-19.44-97.988-19.44s-67.802'
                 + ' 6.922-97.986 19.44l-73.49-177.422c52.822-21.904 110.732-34.018 171.476-34.018 60.746 0 118.654 12.114 171.478 34.020zM98.020 340.524l177.422'
                 + ' 73.49c-12.518 30.184-19.442 63.276-19.442 97.986s6.922 67.802 19.44 97.986l-177.42 73.49c-21.906-52.822-34.020-110.73-34.020-171.476s12.114-118.654'
                 + ' 34.020-171.476zM340.524 925.98l73.49-177.42c30.184 12.518 63.276 19.44 97.986 19.44s67.802-6.922 97.986-19.44l73.49 177.42c-52.822 21.904-110.73 34.020-171.476'
                 + ' 34.020-60.744 0-118.654-12.114-171.476-34.020z"></path>';

        // Definitions for Xplug button
        var l_class     = ' class="a-Button a-Button--noLabel a-Button--iconTextButton js-menuButton a-Button--gapRight" ';
        var l_style     = ' style="background-color:#C3ECE2; height: 32px" ';
        var l_label     = ' title="' + C_version + '" ';
        var l_data_menu = ' data-menu="ORATRONIK_XPLUG_PLUGIN_MENU"';
        var l_aria      = ' aria-haspopup="true" aria-expanded="false" aria-label ="' + C_version + '" ';
        var l_menu_icon = '<span class="a-Icon icon-menu-drop-down" aria-hidden="true"></span>';
        var l_lf        = "\n";


        add_css_to_page_header();


        // Inject the Xplug button in Page Designer (next to Shared Components)
        $('button#menu-shared-components')
                .after('<button id="ORATRONIK_XPLUG" type="button"'
                       + l_class
                       + l_style
                       + l_label
                       + l_data_menu
                       + l_aria
                       + ' onClick="void(0); return false;"'
                       + '>'
                       + '<svg ID="xplugSVG" viewBox="0 0 1024 1024" width="16px" preserveAspectRatio="xMidYMin">' + C_svg + '</svg>'
                       + l_menu_icon
                       + '</button>');

        __install_actions();

        if (localStorage === null) {
           $('#ORATRONIK_XPLUG')
               .on('click', function()
                 { pageDesigner.showError( get_label('MSG-ERR-STORAGE-NOK') ); }
               );
        } else {

           var iDegrees = 0;
           var oHandle  = window.setInterval(
                  function() {
                    iDegrees = iDegrees + 2;
                    $('svg#xplugSVG').css('transform', 'rotate(' + iDegrees + 'deg)');
                    if (iDegrees > 180) window.clearInterval(oHandle);
                  },1);
        }



   } // __init

   __init();
}; // constructor Xplug
