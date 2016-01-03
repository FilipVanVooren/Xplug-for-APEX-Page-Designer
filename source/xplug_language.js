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
                             , "MOONLIGHT"    : "Moonlight mode"
                             , "TOGGLELIGHT"  : "Toggle daylight/moonlight mode"
                             , "PICK_STYLE"   : "Pick style"
                             , "CUSTOMIZE"    : "Customize"
                             , "CUST_COLORS"  : "Page Designer Style"

                             , "BTN-SAVE"     : "Save"
                             , "BTN-APPLY"    : "Apply"
                             , "BTN-OK"       : "OK"                                                          
                             , "BTN-CANCEL"   : "Cancel"

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
                             , "MOONLIGHT"   : "Mondlicht-Modus"
                             , "TOGGLELIGHT" : "Tageslicht- / Mondlicht Modus"
                             , "PICK_STYLE"  : "Stil auswählen"
                             , "CUSTOMIZE"   : "Anpassen"
                             , "CUST_COLORS" : "Page Designer Stil anpassen"

                             , "BTN-SAVE"     : "Speichern"
                             , "BTN-APPLY"    : "Anwenden"
                             , "BTN-OK"       : "OK"
                             , "BTN-CANCEL"   : "Abbrechen"

                             , "MSG-TT-ENABLE-OK"    : "Tooltips sind aktiviert."
                             , "MSG-TT-DISABLE-OK"   : "Tooltips sind deaktiviert."
                             , "MSG-TT-ENABLE-NOK"   : "Konnte Tooltips nicht aktivieren."
                             , "MSG-TT-DISABLE-NOK"  : "Konnte Tooltips nicht deaktivieren."
                             , "MSG-ERR-STORAGE-NOK" : "localStorage nicht aktiviert im Browser. Xplug Einstellungen können nicht gespeichert/geladen werden. Bitte prüfen!"
                           },
                  };

     return C_label[C_lang][p_index];
 }
