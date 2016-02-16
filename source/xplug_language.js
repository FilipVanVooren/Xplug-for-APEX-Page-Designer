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
                             , "SETUP"        : "Setup"

                             , "BTN-NEW"             : "New"
                             , "BTN-SAVE"            : "Save"
                             , "BTN-APPLY"           : "Apply"
                             , "BTN-OK"              : "OK"
                             , "BTN-CANCEL"          : "Cancel"
                             , "BTN-DELETE"          : "Delete"
                             , "BTN-CLEAR"           : "Clear"
                             , "BTN-EXPORT"          : "Export"
                             , "BTN-IMPORT"          : "Import"
                             , "BTN-TGL-DAY-MOON"    : "Toggle daylight/moonlight mode"

                             , "TAB-PB-ERRORS"       : "Errors"
                             , "TAB-PB-ADVISOR"      : "Advisor"
                             , "TAB-PB-CONSOLE"      : "Console"

                             , "LBL-STYLE-GALLERY"   : "Page Designer Styles Gallery"
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
                             , "LBL-OVERRIDE-CSS"    : "Override Xplug CSS"
                             , "LBL-CUST-CSS"        : "Custom CSS"
                             , "LBL-ADVANCED"        : "Advanced"
                             , "LBL-DAYLIGHT"        : "Daylight"
                             , "LBL-MOONLIGHT"       : "Moonlight"
                             , "LBL-DEFAULT-STYLES"  : "Default Styles"
                             , "LBL-ADD-POWERBOX"    : "Show Errors/Advisor/Console"
                             , "LBL-REMOVE-POWERBOX" : "Hide Errors/Advisor/Console"

                             , "MSG-TT-ENABLE-OK"    : "Tooltips are enabled."
                             , "MSG-TT-DISABLE-OK"   : "Tooltips are disabled."
                             , "MSG-TT-ENABLE-NOK"   : "Could not enable tooltips."
                             , "MSG-TT-DISABLE-NOK"  : "Could not disable tooltips."
                             , "MSG-ERR-STORAGE-NOK" : "localStorage not enabled in browser. Xplug preferences can't be saved/retrieved. Please check!"
                             , "MSG-STYLE-EXPORT"    : "Please mark, copy and save the Xplug JSON code in a text file and press 'OK'"
                             , "MSG-STYLE-IMPORT"    : "Please copy the saved Xplug JSON code into the below field and press 'OK'"
                             , "MSG-STYLE-JSON-OK"   : "Xplug JSON code is valid"
                             , "MSG-STYLE-JSON-NOK"  : "Xplug JSON code is invalid. Please check."
                             , "MSG-STYLE-JSON-FAIL" : "Xplug JSON code is valid, but probably incompatible. Please check."
                             , "MSG-STYLE-IS-DRAFT"  : "Page Designer Style can't be saved. Please first change the style name."

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
                             , "SETUP"        : "Anpassen"

                             , "LBL-STYLE-GALLERY"   : "Page Designer Stil Galerie"
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
                             , "LBL-OVERRIDE-CSS"    : "Xplug CSS übersteuern"
                             , "LBL-CUST-CSS"        : "Eigenes CSS"
                             , "LBL-ADVANCED"        : "Fortgeschritten"
                             , "LBL-DAYLIGHT"        : "Tageslicht"
                             , "LBL-MOONLIGHT"       : "Mondlicht"
                             , "LBL-DEFAULT-STYLES"  : "Standard Stil"
                             , "LBL-ADD-POWERBOX"    : "Zeige Fehler/Advisor/Konsole"
                             , "LBL-REMOVE-POWERBOX" : "Verbirge Fehler/Advisor/Konsole"

                             , "BTN-NEW"             : "Neu"
                             , "BTN-SAVE"            : "Speichern"
                             , "BTN-APPLY"           : "Anwenden"
                             , "BTN-OK"              : "OK"
                             , "BTN-CANCEL"          : "Abbrechen"
                             , "BTN-DELETE"          : "Löschen"
                             , "BTN-CLEAR"           : "Leeren"
                             , "BTN-EXPORT"          : "Exportieren"
                             , "BTN-IMPORT"          : "Importieren"
                             , "BTN-TGL-DAY-MOON"    : "Zwischen Tageslicht / Mondlicht-Modus hin und herschalten."

                             , "TAB-PB-ERRORS"       : "Fehler"
                             , "TAB-PB-ADVISOR"      : "Berater"
                             , "TAB-PB-CONSOLE"      : "Konsole"

                             , "MSG-TT-ENABLE-OK"    : "Tooltips sind aktiviert."
                             , "MSG-TT-DISABLE-OK"   : "Tooltips sind deaktiviert."
                             , "MSG-TT-ENABLE-NOK"   : "Konnte Tooltips nicht aktivieren."
                             , "MSG-TT-DISABLE-NOK"  : "Konnte Tooltips nicht deaktivieren."
                             , "MSG-ERR-STORAGE-NOK" : "localStorage nicht aktiviert im Browser. Xplug Einstellungen können nicht gespeichert/geladen werden. Bitte prüfen!"
                             , "MSG-STYLE-EXPORT"    : "Bitte markieren, kopieren und Speichern Sie den Xplug JSON code als Textdatei und drücken Sie danach 'OK'"
                             , "MSG-STYLE-IMPORT"    : "Bitte fügen Sie den gespeicherten Xplug JSON hier ein und drücken Sie 'OK'"
                             , "MSG-STYLE-JSON-OK"   : "Xplug JSON code is gültig."
                             , "MSG-STYLE-JSON-NOK"  : "Xplug JSON code ist ungültig. Bitte prüfen."
                             , "MSG-STYLE-JSON-FAIL" : "Xplug JSON code ist gültig, aber vermutlich nicht kompatible. Bitte prüfen."
                             , "MSG-STYLE-IS-DRAFT"  : "Page Designer Stil kann nicht gespeichert werden. Bitte zuerst Stilnamen ändern."


                           },
                  };

     return C_label[C_lang][p_index];
 }
