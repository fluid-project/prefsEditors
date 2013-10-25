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
    
    fluid.defaults("gpii.uiOptions.panels.magnifierPosition", {
        gradeNames: ["fluid.uiOptions.panels", "autoInit"],
        preferenceMap: {
            "gpii.primarySchema.magnificationPosition": {
                "model.magnifierPosition": "",
                "controlValues.magnifierPosition": "enum"
            }
        },
        listeners: {
            afterRender: "{that}.magnifierPositionStyle"
        },
        selectors: {
            magnifierPositionRow: ".gpiic-increaseSize-magnifierPositionRow",
            magnifierPositionLabel: ".gpiic-increaseSize-magnifierPositionLabel",
            magnifierPositionInput: ".gpiic-increaseSize-magnifierPositionInput",
            magnifierPositionHeading: ".gpiic-increaseSize-magnifierPositionHeading"
        },
        strings: {
            magnifierPosition: {
                expander: {
                    func: "gpii.uiOptions.panels.magnifierPosition.lookupMsg",
                    args: ["{that}.options.parentBundle", "magnifierPosition", "{that}.options.controlValues.magnifierPosition"]
                }
            }
        },
        repeatingSelectors: ["magnifierPositionRow"],
        controlValues: {
            magnifierPosition: ["lens", "dockedleft", "dockedtop", "fullscreen", "dockedright", "dockedbottom"]
        },
        markup: {
            magnifierPositionLabel: "<div class=\"gpii-prefsEditor-adjusterIcons xrhstos1-magnifierPositionIcon xrhstos1-magnifierPositionIconMain\"></div>" +
                    "<div class=\"gpii-prefsEditor-adjusterIcons xrhstos1-magnifierPositionIcon xrhstos1-magnifierPositionFrame\"></div>" +
                    "<div class=\"gpii-prefsEditor-adjusterIcons xrhstos1-magnifierPositionIcon xrhstos1-magnifierPositionBackground\"></div>" +
                    "<span class=\"fl-hidden-accessible\">%magnifierPosition</span>"
        },
        invokers: {
            "magnifierPositionStyle": {
                funcName: "gpii.uiOptions.panels.magnifierPosition.style",
                args: ["{that}.dom.magnifierPositionLabel", "{that}.options.strings.magnifierPosition",
                    "{that}.options.markup.magnifierPositionLabel", "{that}.options.controlValues.magnifierPosition",
                    "{that}.options.classnameMap.magnifierPosition"]
            }
        }
    });

    gpii.uiOptions.panels.magnifierPosition.lookupMsg = function (messageResolver, prefix, values) {
        var messages = [];
        fluid.each(values, function (value, key) {
            var looked = messageResolver.lookup([prefix + "." + value]);
            messages.push(looked ? looked.template : looked);
        });
        return messages;
    };

    gpii.uiOptions.panels.magnifierPosition.style = function (labels, strings, markup, magnifierPosition, style) {
        fluid.each(labels, function (label, index) {
            label = $(label);
            label.html(fluid.stringTemplate(markup, {
                magnifierPosition: strings[index]
            }));
            label.addClass(style[magnifierPosition[index]]);
            label.attr("tooltip", strings[index]);
        });
    };
    
})(jQuery, fluid);
