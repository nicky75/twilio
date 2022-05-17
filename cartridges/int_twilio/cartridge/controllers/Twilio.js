'use strict';

/**
 * @namespace Subscribe
 */

var server = require('server');
var twilioHelper = require('*/cartridge/scripts/helpers/twilioHelpers');

/**
 * Subscribe-Create create custom object
 * @name Subscribe-Create
 * @param {middleware} - server.middleware.https
 * @function
 * @memberof Subscribe
 */
server.post('Create', server.middleware.https, function (req, res, next) {
    var formErrors = require('*/cartridge/scripts/formErrors');
    var twilioForm = server.forms.getForm('twilio');
    if (twilioForm.valid) {
        var response = twilioHelper.addCustomObject(twilioForm.twilio.pid.htmlValue, twilioForm.twilio.phone.htmlValue);

        if (response) {
            res.json({
                success: true
            });
        } else {
            res.json({
                success: false
            });
        }
    } else {
        res.json({
            success: false,
            fields: formErrors.getFormErrors(twilioForm)
        });
    }
    next();
});

/**
 * Subscribe-Twilio send notification test SMS notification.
 * @name Subscribe-Twilio
 * @function
 * @memberof Practice
 */
server.post('Notify', function (req, res, next) {
    var response = twilioHelper.sendNotification('+359888542783', 'pidID_123');

    if (response) {
        res.json({
            error: true
        });
    } else {
        res.json({
            error: false,
            response: response
        });
    }
    next();
});


module.exports = server.exports();
