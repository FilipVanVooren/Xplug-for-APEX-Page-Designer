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
   var C_version = 'Xplug v1.3.0';
   var C_author  = 'Filip van Vooren';

   this.version       = C_version;
   this.author        = C_author;
   this.arr_page_list = [];


   // Exit if not in APEX Page Designer
   if (typeof(window.pageDesigner) != 'object') {
      return 0;
   }




  /****************************************************************************
   * Install button for daylight / moonlight switch
   ***************************************************************************/
   function __install_moonsun_switch()
   {
     $('div.a-PageSelect')
               .before( '<button'
                      + ' type="button"'
                      + ' ID="ORATRONIK_XPLUG_moonsun_button"'
                      + ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillStart js-actionButton"'
                      + ' data-action="pd-xplug-toggle-daylight-moonlight-mode">'
                      + ' <span class="a-Icon icon-xplug-sun"></span>'
                      + '</button>'
                    );

  } // install_moonsun_switch


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
            shortcut : "Alt+R",
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.dockGridRight();
                       }
          },

          {
            name     : "pd-xplug-dock-grid-middle",
            label    : get_label('DOCKMID'),
            shortcut : "Alt+M",
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.dockGridMiddle();
                       }
          },

          {
            name     : "pd-xplug-swap-grid-pane",
            label    : get_label('BTN-SWAP-GRID-PANE'),
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
            shortcut : "????",
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.disableTooltips();
                       }
          },

          {
            name     : "pd-xplug-enable-tooltips",
            label    : get_label('TOOLTIPS'),
            shortcut : "????",
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.enableTooltips();
                       }
          },

          {
            name     : "pd-xplug-set-night-mode",
            label    : get_label('LBL-MOONLIGHT'),
            shortcut : "????",
            action   : function( event, focusElement )
                       {
                           return window.pageDesigner.setNightMode();
                       }
          },

          {
            name     : "pd-xplug-set-day-mode",
            label    : get_label('LBL-DAYLIGHT'),
            shortcut : "????",
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
            name     : "pd-xplug-add-powerbox",
            label    : get_label('LBL-ADD-POWERBOX'),
            shortcut : "????",
            action   : function( event, focusElement )
                       {
                          return xplug.addPowerbox();
                       }
          },

          {
            name     : "pd-xplug-remove-powerbox",
            label    : get_label('LBL-REMOVE-POWERBOX'),
            shortcut : "????",
            action   : function( event, focusElement )
                       {
                          return xplug.removePowerbox();
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
                       + '<svg viewBox="0 0 1024 1024" width="16px" preserveAspectRatio="xMidYMin">' + C_svg + '</svg>'
                       + l_menu_icon
                       + '</button>');

        __install_actions();

        if (localStorage === null) {
           $('#ORATRONIK_XPLUG')
               .on('click', function()
                 { pageDesigner.showError( get_label('MSG-ERR-STORAGE-NOK') ); }
               );
        }



   } // __init

   __init();
}; // constructor Xplug








  /****************************************************************************
   * Install buttons for going to previous / next page
   ***************************************************************************/
  Xplug.prototype.installGotoPage = function ()
  {
    if  ( $('button#ORATRONIK_XPLUG_prev_page_button').length == 1 ) return;

    var l_node = $('button#ORATRONIK_XPLUG_moonsun_button').length == 1
                     ? 'button#ORATRONIK_XPLUG_moonsun_button'
                     : 'div.a-PageSelect';

    $(l_node)
        .before( '<button'
               + ' type="button"'
               + ' ID="ORATRONIK_XPLUG_prev_page_button"'
               + ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillStart js-actionButton"'
               + ' data-action="pd-xplug-goto-previous-page">'
               + ' <span class="a-Icon icon-xplug-previous" aria-hidden="true"></span>'
               + '</button>'

               + '<button'
               + ' type="button"'
               + ' ID="ORATRONIK_XPLUG_next_page_button"'
               + ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillEnd js-actionButton"'
               + ' data-action="pd-xplug-goto-next-page">'
               + ' <span class="a-Icon icon-xplug-next" aria-hidden="true"></span>'
               + '</button>'
             );


     // Get list of pages in JSON format and store result in array.
     // Code based on getPagesLov() in images/apex_ui/js/pe.model.js
     apex.server.process
        (
           "getPages", {
                         x01:  "Y" ,
                         x02:  "userInterfaceId" ,
                         x03:  ""
                       },
           {
             success : function(pPageList)
                       {
                          xplug.arr_page_list = pPageList;
                       }
           }
        );

     xplug.setStorage('BTN-PRVNEXT-PAGE','YES');
  }; // installGotoPage



  /****************************************************************************
   * Deinstall buttons for going to previous / next page
   ***************************************************************************/
  Xplug.prototype.deinstallGotoPage = function ()
  {
    $('button#ORATRONIK_XPLUG_prev_page_button,button#ORATRONIK_XPLUG_next_page_button')
        .remove();

    xplug.setStorage('BTN-PRVNEXT-PAGE','NO');
   }; // deinstallGotoPage





  /****************************************************************************
   * Install Theme switch (daylight/moonlight) button
   ***************************************************************************/
   Xplug.prototype.installThemeSwitch = function ()
   {
     if  ( $('button#ORATRONIK_XPLUG_moonsun_button').length == 1 ) return;
     $('.a-PageSelect').css('border-left','0px');

     $('div.a-PageSelect')
               .before( '<button'
                      + ' type="button"'
                      + ' ID="ORATRONIK_XPLUG_moonsun_button"'
                      + ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillStart js-actionButton"'
                      + ' data-action="pd-xplug-toggle-day-night-mode">'
                      + ' <span class="a-Icon icon-xplug-sun"></span>'
                      + '</button>'
                    );

     xplug.setStorage('BTN-THEME-SWITCH','YES');
   }; // installThemeSwitch


  /****************************************************************************
   * Install Theme switch (daylight/moonlight) button
   ***************************************************************************/
   Xplug.prototype.deinstallThemeSwitch = function ()
   {
     $('button#ORATRONIK_XPLUG_moonsun_button').remove();

     if ( $('button#ORATRONIK_XPLUG_prev_page_button').length === 0) {
        $('.a-PageSelect').css('border-left',
                               xplug.getStorage('orig.a-PageSelect','0px'));
     }

     xplug.setStorage('BTN-THEME-SWITCH','NO');
   }; // deinstallThemeSwitch



  /****************************************************************************
   * Install swap grid pane button
   ***************************************************************************/
   Xplug.prototype.installSwapGrid = function ()
   {
     if  ( $('button#ORATRONIK_XPLUG_swap_panes_button').length == 1 ) return;

     $('button#glvExpandRestoreBtn')
              .after( '<button'
                    + ' type="button"'
                    + ' ID="ORATRONIK_XPLUG_swap_panes_button"'
                    + ' class="a-Button a-Button--noLabel a-Button--withIcon a-Button--pillStart js-actionButton"'
                    + ' data-action="pd-xplug-swap-grid-pane">'
                    + ' <span class="a-Icon icon-xplug-arrows-h" aria-hidden="true"></span>'
                    + '</button>'
              );

     xplug.setStorage('BTN-SWAP-GRID-PANE','YES');
   }; // installSwapGrid


  /****************************************************************************
   * Deinstall swap grid pane button
   ***************************************************************************/
   Xplug.prototype.deinstallSwapGrid = function ()
   {
     $('button#ORATRONIK_XPLUG_swap_panes_button').remove();

     xplug.setStorage('BTN-SWAP-GRID-PANE','NO');
   }; // DeinstallSwapGrid


   /****************************************************************************
    * Install [app:id] in Window Title
    ***************************************************************************/
    Xplug.prototype.installPDTitle = function ()
    {
      $(document).on('modelReady', pageDesigner.setWinTitle);
      pageDesigner.setWinTitle();

      xplug.setStorage('APP+ID-IN-PD-TITLE','YES');
    }; // installPDTitle


    /****************************************************************************
    * Deinstall [app:id] in Window Title
    ****************************************************************************/
    Xplug.prototype.deinstallPDTitle = function ()
    {
      $(document).off('modelReady', pageDesigner.setWinTitle);

      var l_title = $(document).attr('title');
      l_title     = l_title.replace(/\s\[.*$/,'');                             // Remnove old [xxx:xxx] value

      $(document).attr('title',l_title);

      xplug.setStorage('APP+ID-IN-PD-TITLE','NO');
    }; // deinstallPDTitle


  /*****************************************************************************
   * Load Xplug settings from localStorage
   ****************************************************************************/
   Xplug.prototype.loadSettings = function ()
   {
     window.pageDesigner.loadStyle(xplug.getStorage('CURRENT_STYLE','NONE',true));

     xplug.getStorage('PANES_SWITCHED','NO')     == 'YES' && apex.actions.invoke('pd-xplug-dock-grid-right');
     xplug.getStorage('TOOLTIPS_DISABLED','NO')  == 'YES' && apex.actions.invoke('pd-xplug-disable-tooltips');
     xplug.getStorage('SHOW_POWERBOX_PANE','NO') == 'YES' && apex.actions.invoke('pd-xplug-add-powerbox');

     xplug.setStorage('orig.a-PageSelect', $('.a-PageSelect').css('border-left'));
     xplug.getStorage('BTN-PRVNEXT-PAGE','NO')   == 'YES' && xplug.installGotoPage();
     xplug.getStorage('BTN-THEME-SWITCH','NO')   == 'YES' && xplug.installThemeSwitch();
     xplug.getStorage('BTN-SWAP-GRID-PANE','NO') == 'YES' && xplug.installSwapGrid();
     xplug.getStorage('APP+ID-IN-PD-TITLE','NO') == 'YES' && xplug.installPDTitle();
   }; // Xplug.prototype.loadSettings







Xplug.prototype.getVersion = function ()
{
   return xplug.version;
}; // Xplug.prototype.getVersion
