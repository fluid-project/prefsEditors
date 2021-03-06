/*!
Cloud4all Preferences Management Tools

Copyright 2013 CERTH/HIT

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/GPII/prefsEditors/LICENSE.txt
*/

(function ($, fluid) {
    "use strict";
    
    fluid.defaults("gpii.adjuster.magnifierInvertColours", {
        gradeNames: ["gpii.adjuster.iconCheck", "autoInit"],
        preferenceMap: {
            "gpii.primarySchema.magnifier.invertColours": {
                "model.value": "default"
            }
        },
        selectors: {
            preferenceSwitchMagnifierInvertColours: "#preferenceSwitchIconCheckAdjusterInvertColours",
            magnifierInvertColoursDescription: ".gpiic-iconCheckAdjusterDescription"
        },
        protoTree: {
            preferenceSwitchMagnifierInvertColours: "${value}",
            magnifierInvertColoursDescription: {messagekey: "magnifierInvertColoursDescription"}
        },
        "class": "gpii-iconCheck-magnifierInvertColours"
    });
})(jQuery, fluid);
