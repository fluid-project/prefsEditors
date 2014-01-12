/*
Copyright 2013 OCAD University
Copyright 2013 CERTH/HIT

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// Declare dependencies
/*global demo:true, fluid, gpii, jQuery, window*/

// JSLint options
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

// GPII store is for connecting the preference tools with the GPII server.
// The preference tools uses the cookie store by default, rather than the
// GPII store.
// To activate the GPII store in the preference tools, refer to comments in
// http://issues.gpii.net/browse/GPII-185

(function ($, fluid) {

    fluid.registerNamespace("gpii.prefs");

    var rules = {
        "http://registry\\.gpii\\.org/common/announceCapitals": [{
            value: "gpii_primarySchema_announceCapitals"
        }],
        "http://registry\\.gpii\\.org/common/keyEcho": [{
            value: "gpii_primarySchema_keyEcho"
        }],
        "http://registry\\.gpii\\.org/common/punctuationVerbosity": [{
            value: "gpii_primarySchema_punctuationVerbosity"
        }],
        "http://registry\\.gpii\\.org/common/screenReaderBrailleOutput": [{
            vale: "gpii_primarySchema_screenReaderBrailleOutput"
        }],
        "http://registry\\.gpii\\.org/common/auditoryOutLanguage": [{
            value: "gpii_primarySchema_screenReaderLanguage"
        }],
        "http://registry\\.gpii\\.org/common/screenReaderTTSEnabled": [{
            value: "gpii_primarySchema_speakText"
        }],
        "http://registry\\.gpii\\.org/common/speakTutorialMessages": [{
            value: "gpii_primarySchema_speakTutorialMessages"
        }],
        "http://registry\\.gpii\\.org/common/readingUnit": [{
            value: "gpii_primarySchema_textHighlighting"
        }],
        "http://registry\\.gpii\\.org/common/language": [{
            value: "gpii_primarySchema_universalLanguage"
        }],
        "http://registry\\.gpii\\.org/common/volume": [{
            transform: {
                type: "fluid.transforms.linearScale",
                valuePath: "gpii_primarySchema_universalVolume",
                factor: 0.01,
                outputPath: "value"
            }
        }],
        "http://registry\\.gpii\\.org/common/pitch": [{
            transform: {
                type: "fluid.transforms.linearScale",
                valuePath: "gpii_primarySchema_voicePitch",
                factor: 0.01,
                outputPath: "value"
            }
        }],
        "http://registry\\.gpii\\.org/common/volumeTTS": [{
            transform: {
                type: "fluid.transforms.linearScale",
                valuePath: "gpii_primarySchema_volume",
                factor: 0.01,
                outputPath: "value"
            }
        }],
        "http://registry\\.gpii\\.org/common/wordEcho": [{
            value: "gpii_primarySchema_wordEcho"
        }],
        "http://registry\\.gpii\\.org/common/speechRate": [{
            value: "gpii_primarySchema_wordsSpokenPerMinute"
        }],
        "http://registry\\.gpii\\.org/common/magnification": [{
            transform: {
                type: "fluid.transforms.linearScale",
                valuePath: "gpii_primarySchema_magnification",
                factor: 0.01,
                outputPath: "value"
            }
        }],
        "http://registry\\.gpii\\.org/common/fontSize": [{
            value: "gpii_primarySchema_fontSize"
        }],
        "http://registry\\.gpii\\.org/common/highContrastTheme": [{
            value: "gpii_primarySchema_contrast_theme"
        }],
        "http://registry\\.gpii\\.org/common/cursorSize": [{
            transform: {
                type: "fluid.transforms.linearScale",
                valuePath: "gpii_primarySchema_cursorSize",
                factor: 0.2,
                outputPath: "value"
            }
        }],
        "http://registry\\.gpii\\.org/common/magnifierEnabled": [{
            value: "gpii_primarySchema_magnifierEnabled"
        }],
        "http://registry\\.gpii\\.org/common/tracking": [{
            value: "gpii_primarySchema_tracking"
        }],
        "http://registry\\.gpii\\.org/common/magnifierPosition": [{
            value: "gpii_primarySchema_magnificationPosition"
        }],
        "http://registry\\.gpii\\.org/common/showCrosshairs": [{
            value: "gpii_primarySchema_showCrosshairs"
        }]
    };

    /**
     * gpiiStore Subcomponent that uses GPII server for persistence.
     * It sends request to the GPII server to save and retrieve model information
     * @param {Object} options
     */
    fluid.defaults("gpii.prefs.gpiiStore", {
        gradeNames: ["fluid.prefs.dataSource", "autoInit"],
        // instantiate the gpiiSession component
        components: {
            gpiiSession: {
                type: "gpii.prefs.gpiiSession"
            }
        },
        gpiiEntry: "http://registry.gpii.org/applications/gpii.prefs",
        invokers: {
            get: {
                funcName: "gpii.prefs.gpiiStore.get",
                args: ["{that}.options", "{gpiiSession}.options"]
            },
            set: {
                funcName: "gpii.prefs.gpiiStore.set",
                args: ["{arguments}.0", "{that}.options", "{gpiiSession}"]
            }
        }
    });

    gpii.prefs.gpiiStore.get = function (settings, sessionSettings) {
        var gpiiModel;

        if (sessionSettings.loggedUser != null) {

            var urlToPost = sessionSettings.loggedUser ? (sessionSettings.url + sessionSettings.loggedUser) : (sessionSettings.url);

            $.ajax({
                url: urlToPost,
                type: "GET",
                dataType: "json",
                async: false,
                success: function (data) {
                    gpiiModel = fluid.get(data, ["preferences", settings.gpiiEntry, 0, "value"]);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    fluid.log("GET: Error at retrieving from GPII! Test status: " + textStatus);
                    fluid.log(errorThrown);
                }
            });
        }

        return gpiiModel;
    };

    gpii.prefs.gpiiStore.set = function (model, settings, session) {
        var transformedModel = fluid.model.transform(model, rules);

        var urlToPost = session.options.loggedUser ? (session.options.url + session.options.loggedUser) : (session.options.url);
        $.ajax({
            url: urlToPost,
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(transformedModel),
            success: function (data) {
                if (session.options.loggedUser != data.token) {
                    // new user, login
                    session.login(data.token);
                }
                fluid.log("POST: Saved to GPII server");
            },
            error: function () {
                fluid.log("POST: Error at saving to GPII server");
            }
        });
    };

    gpii.prefs.gpiiStore.convertUIOSchemaToGPIISchema = function (model) {
        var common_model_part = "gpii_primarySchema_";
        var size_common = common_model_part.length;

        var keys_in_model = $.grep(Object.keys(model), function (el) {return el.substring(0, size_common) === common_model_part; });
        var keys_for_post = $.map(keys_in_model, function (el) {return "http://registry.gpii.org/common/" + el.substring(size_common, el.length); });
        var saved_settings = {};

        for (var i = 0; i < keys_for_post.length; i++) {
            saved_settings[keys_for_post[i]] = [{value: model[keys_in_model[i]]}];
        }

        return saved_settings;
    }

    fluid.defaults("gpii.prefs.gpiiSettingsStore", {
        gradeNames: ["fluid.globalSettingsStore", "autoInit"],
        settingsStoreType: "gpii.prefs.gpiiStore",
        distributeOptions: [{
            source: "{that}.options.settingsStoreType",
            removeSource: true,
            target: "{that > settingsStore}.type"
        }]
    });

})(jQuery, fluid);