//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_util.js
// 2015-12-13 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */

function get_svg_icon(p_icon,p_width,p_height,p_color,p_is_css_background) {
   var C_icon = {};
   var l_svg  = '';

   p_width  = p_width  || 16;
   p_height = p_height || 16;
   p_color  = p_color  || '#000000';


   // Moon
   C_icon.moon =   '<svg width="%%" height="%%" viewBox="0 0 1792 1792"'
               + ' xmlns="http://www.w3.org/2000/svg"><path fill="%%" d="M1390 1303q-54 9-110 9-182'
               + ' 0-337-90t-245-245-90-337q0-192 104-357-201 60-328.5 229t-127.5 384q0 130 51'
               + ' 248.5t136.5 204 204 136.5 248.5 51q144 0 273.5-61.5t220.5-171.5zm203-85q-94'
               + ' 203-283.5 324.5t-413.5 121.5q-156 0-298-61t-245-164-164-245-61-298q0-153'
               + ' 57.5-292.5t156-241.5 235.5-164.5 290-68.5q44-2 61 39 18 41-15 72-86 78-131.5'
               + ' 181.5t-45.5 218.5q0 148 73 273t198 198 273 73q118 0 228-51 41-18 72 13 14 14'
               + ' 17.5 34t-4.5 38z"/></svg>';

   // Sun
   C_icon.sun  = '<svg width="%%" height="%%" viewBox="0 0 1792 1792"'
               + ' xmlns="http://www.w3.org/2000/svg"><path fill="%%" d="M1472'
               + ' 896q0-117-45.5-223.5t-123-184-184-123-223.5-45.5-223.5 45.5-184 123-123 184-45.5'
               + ' 223.5 45.5 223.5 123 184 184 123 223.5 45.5 223.5-45.5 184-123 123-184'
               + ' 45.5-223.5zm276 277q-4 15-20 20l-292 96v306q0 16-13 26-15 10-29 4l-292-94-180'
               + ' 248q-10 13-26 13t-26-13l-180-248-292 94q-14'
               + ' 6-29-4-13-10-13-26v-306l-292-96q-16-5-20-20-5-17 4-29l180-248-180-248q-9-13-4-29'
               + ' 4-15 20-20l292-96v-306q0-16 13-26 15-10 29-4l292 94 180-248q9-12 26-12t26 12l180'
               + ' 248 292-94q14-6 29 4 13 10 13 26v306l292 96q16 5 20 20 5 16-4 29l-180 248 180'
               + ' 248q9 12 4 29z"/></svg>';

   // Horizontal arrows
   C_icon.arrows_h
               = '<svg version="1.1" viewBox="0 0 477.427 477.427" style="enable-background:new 0 0 477.427 477.427;"'
               + ' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"'
               + ' xml:space="preserve">'
               + '<g>'
               + '<polygon points="101.82,187.52 57.673,143.372 476.213,143.372 476.213,113.372 57.181,113.372 101.82,68.733 80.607,47.519 '
               + '0,128.126 80.607,208.733 	"/>'
               + '<polygon points="396.82,268.694 375.607,289.907 420,334.301 1.213,334.301 1.213,364.301 420,364.301 375.607,408.694 '
               + ' 396.82,429.907 477.427,349.301 	"/>'
               + '</g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>'
               + '</svg>';

   // Forbidden icons
   C_icon.forbidden
               = ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="%%" height="%%"> '
               + ' <path fill="#FFF" stroke-width="45" stroke="#F00" d="M86,88a230,230 0 1,0 1-1zL412,412"/> '
               +  ' </svg>';

   // Arrow left
   C_icon.arrow_left
               = '<svg width="%%" height="%%" viewBox="0 0 792 792"'
               + ' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"'
               + ' style="enable-background:new 0 0 792 792;" xml:space="preserve"><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none"/>'
               + '<g class="currentLayer">'
               + '<g id="svg_1" class="" transform="rotate(90,396,396) ">'
               + '<g id="svg_2">'
               + ' <path d="M371.671,649.763c6.019,6.849,14.499,11.316,24.29,11.316c0.081,0,0.188-0.08,0.294-0.08c0.08,0,0.187,0.08,0.294,0.08 '
               + '   c8.373,0,16.746-3.184,23.14-9.577l270.537-270.563c12.787-12.76,12.787-33.493,0-46.253c-12.787-12.787-33.467-12.787-46.254,0 '
               + '   L428.679,550.008V32.69c0-18.083-14.634-32.69-32.717-32.69c-18.084,0-32.717,14.606-32.717,32.69v516.408L147.977,334.686 '
               + '   c-12.814-12.787-33.52-12.573-46.28,0.134c-12.76,12.787-12.68,33.466,0.107,46.253L371.671,649.763z" id="svg_3"/>'
               + ' <path d="M667.086,726.593H124.89c-18.084,0-32.717,14.553-32.717,32.69c0,18.004,14.633,32.717,32.717,32.717h542.223 '
               + '   c18.084,0,32.717-14.713,32.717-32.717C699.803,741.146,685.17,726.593,667.086,726.593z" id="svg_4"/>'
               + '</g></g></g>'
               + '</svg>';



   // Arrow right
   C_icon.arrow_right = C_icon.arrow_left;
   C_icon.arrow_right = C_icon.arrow_right.replace('rotate(90','rotate(270');


   // Determine width, height & color
   l_svg = C_icon[p_icon] || '';
   l_svg = l_svg.replace('%%',p_width);
   l_svg = l_svg.replace('%%',p_height);
   l_svg = l_svg.replace('%%',p_color);

   if (p_is_css_background) return '{ background : url(data:image/svg+xml;base64,' + btoa(l_svg) + ') no-repeat; }';

   return l_svg;
}  // get_svg_icon



/***************************************************************************
* Add custom method to Xplug
* METHOD: getComponentProperties
***************************************************************************/
Xplug.prototype.getComponentProperties = function (pPropTypeEnum) {
   'use strict';

   var oProp, oCompProp, oComp_arr, oCompRef_arr, oCompProp_arr;
   var oResultProp_arr = [];                        // Our resultset array

   oProp        = pe.getProperty(pPropTypeEnum);    // Get property
   oCompRef_arr = oProp.refByComponentTypes;        // Get component types that reference specified property

   // Loop over result set
   for (var i=0; i < oCompRef_arr.length; i++) {

        // Get all components on page that match the component type
        oComp_arr = pe.getComponents(oCompRef_arr[i]);

        // Loop over the components result set
        for (var j=0; j < oComp_arr.length; j++) {

            // Get all properties of component
            oCompProp_arr = oComp_arr[j]._properties;

            // Get our matching property
            oCompProp = oCompProp_arr[pPropTypeEnum];

            // Save in our resultset array
            oResultProp_arr.push(oCompProp);
        }
   }
   return oResultProp_arr;
}; // getComponentProperties



/***************************************************************************
* Add custom method to Xplug
* METHOD: getFilterComponentProperties
***************************************************************************/
Xplug.prototype.getFilteredComponentProperties = function (pPropTypeEnum) {
  'use strict';

  var oAllProp_arr    = this.getComponentProperties(pPropTypeEnum);
  var oResultProp_arr = [];                        // Our resultset array

  // Loop over propteries
  for (var idx in oAllProp_arr) {

      if (    oAllProp_arr[idx].hasOwnProperty('_value')
           && oAllProp_arr[idx]._value.length > 0) {

           oResultProp_arr.push(oAllProp_arr[idx]);
      }
  }
  return oResultProp_arr;
}; // getFilteredComponentProperties
