/*!
Cloud4all Preferences Management Tools

Copyright 2013 OCAD University
Copyright 2013 CERTH/HIT

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/GPII/prefsEditors/LICENSE.txt
*/

(function ($, fluid) {
    "use strict";
    
    fluid.defaults("gpii.enactor.magnifier", {
        gradeNames: ["fluid.viewComponent", "fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "gpii.primarySchema.magnification": {
                "model.value": "default"
            },
            "gpii.primarySchema.magnifierEnabled": {
                "model.enabled": "default"
            }
        },
        invokers: {
            set: {
                funcName: "gpii.enactor.magnifier.set",
                args: ["{that}.model.enabled", "{that}.model.value", "{that}.container"],
                dynamic: true
            }
        },
        listeners: {
            onCreate: {
                listener: "{that}.set"
            }
        },
        modelListeners: {
            "value": {
                func: "{that}.set",
                args: ["{change}.value"]
            }
        }
    });

    gpii.enactor.magnifier.set = function (enabled, times, that) {
        if (enabled) {
            that.css({"transform": "scale(" + times / 100 + ")", "-webkit-transform": "scale(" + times / 100 + ")"});
        } else {
            that.css({"transform": "scale(1)", "-webkit-transform": "scale(1)"});
        }
    };

})(jQuery, fluid);
