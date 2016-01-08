//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_language.js
// 2016-01-03 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */

 function get_label(p_index)
 {
   var C_lang  = gBuilderLang ? gBuilderLang : 'en';

   var C_label =  { 'en' : {   "DOCKRIGHT"    : "Dock grid on right side"
                             , "DOCKMID"      : "Dock grid in middle"
                             , "PREVPAGE"     : "Go to previous page"
                             , "NEXTPAGE"     : "Go to next page"
                             , "SHORTCUTS"    : "Customize shortcuts"
                             , "NOTOOLTIPS"   : "Disable tooltips"
                             , "TOOLTIPS"     : "Enable tooltips"
                             , "PRETTYGRID"   : "Grid background image"
                             , "PICK_STYLE"   : "Pick style"
                             , "SET_DEFAULTS" : "Set defaults"
                             , "CUSTOMIZE"    : "Customize"

                             , "BTN-NEW"             : "New"
                             , "BTN-SAVE"            : "Save"
                             , "BTN-APPLY"           : "Apply"
                             , "BTN-OK"              : "OK"
                             , "BTN-CANCEL"          : "Cancel"
                             , "BTN-DELETE"          : "Delete"
                             , "BTN-EXPORT"          : "Export"
                             , "BTN-IMPORT"          : "Import"
                             , "BTN-TGL-DAY-MOON"    : "Toggle daylight/moonlight mode"

                             , "LBL-STYLE-CUSTOM"    : "Customize Page Designer Style"
                             , "LBL-STYLE-EXPORT"    : "Export Page Designer Style"
                             , "LBL-STYLE-IMPORT"    : "Import Page Designer Style"
                             , "LBL-NAME"            : "Name"
                             , "LBL-DARK-STYLE"      : "Dark Style"
                             , "LBL-CRNTLY-ACTIVE"   : "Currently Active"
                             , "LBL-PROTECTED"       : "Protected"
                             , "LBL-SHOW-GRID"       : "Show Grid"
                             , "LBL-COLOR"           : "Color"
                             , "LBL-IDENTIFICATION"  : "Identification"
                             , "LBL-CUST-COLORS"     : "Customize Colors"
                             , "LBL-CUST-CSS"        : "Custom CSS"
                             , "LBL-ADVANCED"        : "Advanced"
                             , "LBL-DAYLIGHT"        : "Daylight"
                             , "LBL-MOONLIGHT"       : "Moonlight"
                             , "LBL-DEFAULT-STYLES"  : "Default Styles"

                             , "MSG-TT-ENABLE-OK"    : "Tooltips are enabled."
                             , "MSG-TT-DISABLE-OK"   : "Tooltips are disabled."
                             , "MSG-TT-ENABLE-NOK"   : "Could not enable tooltips."
                             , "MSG-TT-DISABLE-NOK"  : "Could not disable tooltips."
                             , "MSG-ERR-STORAGE-NOK" : "localStorage not enabled in browser. Xplug preferences can't be saved/retrieved. Please check!"
                           },

                    'de' : {   "DOCKRIGHT"    : "Grid rechts außen positionieren"
                             , "DOCKMID"      : "Grid in der Mitte positionieren"
                             , "PREVPAGE"     : "Gehe zu vorherige Seite"
                             , "NEXTPAGE"     : "Gehe zu nächste Seite"
                             , "SHORTCUTS"    : "Tastenkürzel einrichten"
                             , "NOTOOLTIPS"   : "Tooltips deaktivieren"
                             , "TOOLTIPS"     : "Tooltips aktivieren"
                             , "PRETTYGRID"   : "Hintergrundbild"
                             , "PICK_STYLE"   : "Stil auswählen"
                             , "SET_DEFAULTS" : "Defaultwerte setzen"
                             , "CUSTOMIZE"    : "Anpassen"

                             , "LBL-STYLE-CUSTOM"    : "Page Designer Stil anpassen"
                             , "LBL-STYLE-EXPORT"    : "Page Designer Stil exportieren"
                             , "LBL-STYLE-IMPORT"    : "Import Page Designer Style"
                             , "LBL-NAME"            : "Name"
                             , "LBL-DARK-STYLE"      : "Dunkler Stil"
                             , "LBL-CRNTLY-ACTIVE"   : "Ist im Moment aktiv"
                             , "LBL-PROTECTED"       : "Gesperrt"
                             , "LBL-SHOW-GRID"       : "Grid anzeigen"
                             , "LBL-COLOR"           : "Farbe"
                             , "LBL-IDENTIFICATION"  : "Identifizierung"
                             , "LBL-CUST-COLORS"     : "Farben anpassen"
                             , "LBL-CUST-CSS"        : "Eigenes CSS"
                             , "LBL-ADVANCED"        : "Fortgeschritten"
                             , "LBL-DAYLIGHT"        : "Tageslicht"
                             , "LBL-MOONLIGHT"       : "Mondlicht"
                             , "LBL-DEFAULT-STYLES"  : "Standard Stil"

                             , "BTN-NEW"             : "Neu"
                             , "BTN-SAVE"            : "Speichern"
                             , "BTN-APPLY"           : "Anwenden"
                             , "BTN-OK"              : "OK"
                             , "BTN-CANCEL"          : "Abbrechen"
                             , "BTN-DELETE"          : "Löschen"
                             , "BTN-EXPORT"          : "Exportieren"
                             , "BTN-IMPORT"          : "Importieren"
                             , "BTN-TGL-DAY-MOON"    : "Zwischen Tageslicht / Mondlicht-Modus hin und herschalten."

                             , "MSG-TT-ENABLE-OK"    : "Tooltips sind aktiviert."
                             , "MSG-TT-DISABLE-OK"   : "Tooltips sind deaktiviert."
                             , "MSG-TT-ENABLE-NOK"   : "Konnte Tooltips nicht aktivieren."
                             , "MSG-TT-DISABLE-NOK"  : "Konnte Tooltips nicht deaktivieren."
                             , "MSG-ERR-STORAGE-NOK" : "localStorage nicht aktiviert im Browser. Xplug Einstellungen können nicht gespeichert/geladen werden. Bitte prüfen!"
                           },
                  };

     return C_label[C_lang][p_index];
 }
