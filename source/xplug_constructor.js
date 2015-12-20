//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_constructor.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */


var Xplug = function() {
   var C_version = 'Xplug v1.2 (www.oratronik.de)';
   var C_author  = 'Filip van Vooren';

   this.version       = C_version;
   this.author        = C_author;
   this.arr_page_list = [];


   // Exit if not in APEX Page Designer
   if (typeof(window.pageDesigner) != 'object') {
      return 0;
   }

   var C_lang  = gBuilderLang ? gBuilderLang : 'en';

   var C_label =  { 'en' : {   "DOCKRIGHT"    : "Dock grid on right side"
                             , "DOCKMID"      : "Dock grid in middle"
                             , "PREVPAGE"     : "Go to previous page"
                             , "NEXTPAGE"     : "Go to next page"
                             , "SHORTCUTS"    : "Customize shortcuts"
                             , "NOTOOLTIPS"   : "Disable tooltips"
                             , "TOOLTIPS"     : "Enable tooltips"
                             , "PRETTYGRID"   : "Background image"
                             , "RESTOREGRID"  : "Restore grid"
                             , "GRIDLAYOUT"   : "Grid layout"
                             , "MOONLIGHT"    : "Moonlight mode"
                             , "TOGGLELIGHT"  : "Toggle daylight/moonlight mode"
                             , "CUST_COLORS"  : "Customize Page Designer Colors"

                             , "MSG-TT-ENABLE-OK"    : "Tooltips are enabled."
                             , "MSG-TT-DISABLE-OK"   : "Tooltips are disabled."
                             , "MSG-TT-ENABLE-NOK"   : "Could not enable tooltips."
                             , "MSG-TT-DISABLE-NOK"  : "Could not disable tooltips."
                             , "MSG-ERR-STORAGE-NOK" : "localStorage not enabled in browser. Xplug preferences can't be saved/retrieved. Please check!"
                           },

                    'de' : {   "DOCKRIGHT"   : "Grid rechts außen positionieren"
                             , "DOCKMID"     : "Grid in der Mitte positionieren"
                             , "PREVPAGE"    : "Gehe zu vorherige Seite"
                             , "NEXTPAGE"    : "Gehe zu nächste Seite"
                             , "SHORTCUTS"   : "Tastenkürzel einrichten"
                             , "NOTOOLTIPS"  : "Tooltips deaktivieren"
                             , "TOOLTIPS"    : "Tooltips aktivieren"
                             , "PRETTYGRID"  : "Hintergrundbild"
                             , "RESTOREGRID" : "Grid Originalzustand wiederherstellen"
                             , "GRIDLAYOUT"  : "Grid Layout einstellen"
                             , "MOONLIGHT"   : "Mondlicht-Modus"
                             , "TOGGLELIGHT" : "Tageslicht- / Mondlicht Modus"
                             , "CUST_COLORS" : "Page Designer Farben einstellen"

                             , "MSG-TT-ENABLE-OK"    : "Tooltips sind aktiviert."
                             , "MSG-TT-DISABLE-OK"   : "Tooltips sind deaktiviert."
                             , "MSG-TT-ENABLE-NOK"   : "Konnte Tooltips nicht aktivieren."
                             , "MSG-TT-DISABLE-NOK"  : "Konnte Tooltips nicht deaktivieren."
                             , "MSG-ERR-STORAGE-NOK" : "localStorage nicht aktiviert im Browser. Xplug Einstellungen können nicht gespeichert/geladen werden. Bitte prüfen!"
                           },
                  };

    function get_label(p_index) {
        return C_label[C_lang][p_index];
    }

  /****************************************************************************
   * Install buttons for going to previous / next page
   ***************************************************************************/
   function __install_goto_page()
   {
       $('div.a-PageSelect')

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

       $('.a-PageSelect').css('border-left','0px');


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

  } // install_goto_page


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
                      + ' data-action="pd-xplug-toggle-moon-sun-style">'
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
            action   : function( event, focusElement ) {
                           window.pageDesigner.goToPrevPage();
                           return true;
                       }
          },
          {
            name     : "pd-xplug-goto-next-page",
            label    : get_label('NEXTPAGE'),
            title    : get_label('NEXTPAGE'),
            shortcut : "Alt+N",
            action   : function( event, focusElement ) {
                           window.pageDesigner.goToNextPage();
                           return true;
                       }
          },
          {
            name     : "pd-xplug-dock-grid-right",
            label    : get_label('DOCKRIGHT'),
            shortcut : "Alt+R",
            action   : function( event, focusElement ) {
                           return window.pageDesigner.dockGridRight();
                       }
          },
          {
            name     : "pd-xplug-dock-grid-middle",
            label    : get_label('DOCKMID'),
            shortcut : "Alt+M",
            action   : function( event, focusElement ) {
                           return window.pageDesigner.dockGridMiddle();
                       }
          },
          {
            name     : "pd-xplug-disable-tooltips",
            label    : get_label('NOTOOLTIPS'),
            shortcut : "????",
            action   : function( event, focusElement ) {
                           return window.pageDesigner.disableTooltips();
                       }
          },
          {
            name     : "pd-xplug-enable-tooltips",
            label    : get_label('TOOLTIPS'),
            shortcut : "????",
            action   : function( event, focusElement ) {
                           return window.pageDesigner.enableTooltips();
                       }
          },
          {
            name     : "pd-xplug-set-moonlight-mode",
            label    : get_label('TOGGLEMOON'),
            shortcut : "????",
            action   : function( event, focusElement ) {
                           return window.pageDesigner.MoonlightMode();
                       }
          },
          {
            name     : "pd-xplug-set-daylight-mode",
            label    : get_label('TOGGLEDAY'),
            shortcut : "????",
            action   : function( event, focusElement ) {
                           return window.pageDesigner.DaylightMode();
                       }
          },
          {
            name     : "pd-xplug-toggle-moon-sun-style",
            label    : get_label('TOGGLELIGHT'),
            shortcut : "Alt+F10",
            action   : function( event, focusElement ) {
                          if (xplug.getStorage('MOONLIGHT_MODE','NO') == 'YES')
                             return  apex.actions.invoke('pd-xplug-set-daylight-mode');

                          return apex.actions.invoke('pd-xplug-set-moonlight-mode');
                       }
          },
          {
            name     : "pd-xplug-pretty-grid",
            label    : get_label('PRETTYGRID'),
            shortcut : "????",
            action   : function( event, focusElement ) {
                           return window.pageDesigner.prettyGrid();
                       }
          },
          {
            name     : "pd-xplug-no-pretty-grid",
            label    : get_label('NOPRETTYGRID'),
            shortcut : "????",
            action   : function( event, focusElement ) {
                           return window.pageDesigner.noPrettyGrid();
                       }
          },

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
            + l_lf + '  button#ORATRONIK_XPLUG:hover        { background-color: #FFFFFF!important; }'
            + l_lf + '  .a-Icon.icon-xplug-previous::before { content: "\\e029" }'
            + l_lf + '  .a-Icon.icon-xplug-next::before     { content: "\\e028" }'
            + l_lf + '  .a-Icon.icon-xplug-moon ' + get_svg_icon('moon',14,14,null,1)
            + l_lf + '  .a-Icon.icon-xplug-sun  ' + get_svg_icon('sun',14,14,null,1)
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
        var l_data_menu = ' data-menu="XplugMenu"';
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
              label    : get_label('MOONLIGHT'),
              get      : function()
                         {
                            return xplug.getStorage('MOONLIGHT_MODE','NO') == 'YES';
                         },
              set      : function()
                         {
                           xplug.getStorage('MOONLIGHT_MODE','NO') == 'YES'
                              ? apex.actions.invoke('pd-xplug-set-daylight-mode')
                              : apex.actions.invoke('pd-xplug-set-moonlight-mode');
                         },
              disabled : function()
                         {
                           return false;
                         }
            },

            {
              type     : "action",
              label    : get_label('CUST_COLORS'),
              action   : function()
                         {
                            window.pageDesigner.customizeColors(get_label('CUST_COLORS'));
                         },
              disabled : function()
                         {
                           return $('#ORATRONIK_XPLUG_COLOR_DIALOG').length > 0;
                         }
            },




            { type     : "separator" },

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

            { type     : "separator"
            },
            {
              type     : "action",
              labelKey : C_version,
              disabled : function() {
                             return true;
                         }
            }
          ]
        });

        __install_goto_page();
        __install_moonsun_switch();
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


Xplug.prototype.setStorage = function(p_key, p_value)
    {
        if (typeof(localStorage) == 'object') {
           var l_key = 'APEX_XPLUG#' + location.host + location.pathname + '#' + p_key;

           if (localStorage === null) {
              console.error('XPLUG - Your browser has localStorage disabled. Cannot save ' + p_key);
              return false;
           }
           localStorage.setItem(l_key, p_value);
           return true;
        } else {
           console.error('XPLUG - Your browser does not support localStorage. Cannot save ' + p_key);
           return false;
        }
    }; // Xplug.prototype.setStorage


Xplug.prototype.getStorage = function(p_key, p_default)
    {
        if (typeof(localStorage) == 'object') {
           var l_key = 'APEX_XPLUG#' + location.host + location.pathname + '#' + p_key;

           if (localStorage === null) {
              console.error('XPLUG - Your browser has localStorage disabled. Cannot retrieve ' + p_key);
              return p_default;
           }
           return localStorage.getItem(l_key) || p_default;
        } else {
           console.error('XPLUG - Your browser does not support localStorage. Cannot retrieve ' + p_key);
           return p_default;
       }
    }; // Xplug.prototype.getStorage


Xplug.prototype.loadSettings = function ()
{
   xplug.getStorage('MOONLIGHT_MODE','NO')    == 'YES' && apex.actions.invoke('pd-xplug-set-moonlight-mode');
   xplug.getStorage('PANES_SWITCHED','NO')    == 'YES' && apex.actions.invoke('pd-xplug-dock-grid-right');
   xplug.getStorage('TOOLTIPS_DISABLED','NO') == 'YES' && apex.actions.invoke('pd-xplug-disable-tooltips');

}; // Xplug.prototype.loadSettings
