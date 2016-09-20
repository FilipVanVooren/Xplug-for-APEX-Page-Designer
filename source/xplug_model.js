//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Xplug - Plugin for Oracle Application Express 5.0 Page Designer
// www.oratronik.de - Author Filip van Vooren
//
// xplug_model.js
// 2016-09-20 * Initial version
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* jshint laxbreak: true, laxcomma: true */
/* jshint -W030 */



/***************************************************************************
* Add custom method to Xplug
* METHOD: getComponentProperties
***************************************************************************/
Xplug.prototype.getComponentProperties = function (pPropTypeEnum) {
   'use strict';

   var oProp, oCompProp, oComp_arr, oCompRef_arr, oCompProp_arr;
   var oResultProp_arr = [];                        // Our resultset array

   try {
        oProp = pe.getProperty(pPropTypeEnum);      // Get property
   } catch(e) {
        return;
   }
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
Xplug.prototype.getFilteredComponentProperties = function (pPropTypeEnum, pParentId) {
  'use strict';

  var oAllProp_arr    = this.getComponentProperties(pPropTypeEnum);
  var oResultProp_arr = [];                        // Our resultset array

  // Loop over propteries
  for (var idx in oAllProp_arr) {

      // Check if attribute _value has a value set
      if (    oAllProp_arr[idx].hasOwnProperty('_value')
           && oAllProp_arr[idx]._value.length > 0) {

           if ( (typeof(pParentid) !== undefined) && (pParentId !== undefined) ) {
             // ParentId specified, so only save if it matches
             if (    oAllProp_arr[idx].hasOwnProperty('component')
                  && oAllProp_arr[idx].component.hasOwnProperty('parentId')
                  && oAllProp_arr[idx].component.parentId == pParentId) {

                  oResultProp_arr.push(oAllProp_arr[idx]);
             }
           } else {
             // No parentId specified, so save
             oResultProp_arr.push(oAllProp_arr[idx]);
           }    // if
      }         // if
  }             // for
  return oResultProp_arr;
}; // getFilteredComponentProperties
