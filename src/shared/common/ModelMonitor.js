/*!
Cloud4all Preferences Management Tools

Copyright 2013 CERTH/HIT

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/GPII/prefsEditors/LICENSE.txt
*/

/*global fluid, jQuery, gpii*/
/*jslint white: true, onevar: true, funcinvoke: true, forvar: true, undef: true, newcap: true, nomen: true, regexp: true, plusplus: true, bitwise: true, maxerr: 50, indent: 4 */

(function ($, fluid) {

    /**
     * modelMonitor Subcomponent that holds information about which preferences the user has tweaked.
     */
    fluid.defaults("gpii.prefs.modelMonitor", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        preferencesChangedByUser: [],
        modelListeners: {
            "*": {
                "listener": "{that}.preferenceChanged",
                "args": "{change}.path"
            }
        },
        invokers: {
            preferenceChanged: {
                "funcName": "gpii.prefs.modelMonitor.addChangedPreference",
                "args": ["{that}.options.preferencesChangedByUser", "{arguments}.0"]
            },
            reset: {
                "funcName": "gpii.prefs.modelMonitor.reset",
                "args": ["{that}.options.preferencesChangedByUser"]
            }
        }
    });

    // make this component globally public through {modelMonitor}
    gpii.prefs.modelMonitor.finalInit = function (that) {
        fluid.staticEnvironment.modelMonitor = that;
    };
    
    gpii.prefs.modelMonitor.addChangedPreference = function (preferencesChangedByUser, changedPreference) {
        // if preference is defined and not in the array of changed ones 
        if (changedPreference && $.inArray(changedPreference, preferencesChangedByUser) === -1) {
            // add it
            preferencesChangedByUser.push(changedPreference);
        }
    }
    
    gpii.prefs.modelMonitor.reset = function (preferencesChangedByUser) {
        preferencesChangedByUser.length = 0;
    }

})(jQuery, fluid);
