'use strict';

var dwutil = require('dw/util');
var Transaction = require('dw/system/Transaction');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var ArrayList = require('dw/util/ArrayList');

/**
 * If the resource to add is not already in the resource array then add it to the array
 * @param {string} pid Product ID
 * @param {string} phone Phone number
 * @returns {Object} - the jQuery / DOMElement
 */
function addCustomObject(pid, phone) {
    var type = 'TwillioSubscription';
    var keyValue = pid;
    var subscribe = CustomObjectMgr.getCustomObject(type, keyValue);
    var resp = false;
    try {
        Transaction.wrap(function () {
            if (!subscribe) {
                subscribe = CustomObjectMgr.createCustomObject(type, keyValue);
                subscribe.custom.phones = [phone];
            } else {
                var phones = subscribe.custom.phones;
                var newPhones = new ArrayList(phones);
                newPhones.add(phone);
                subscribe.custom.phones = newPhones;
            }
            resp = true;
        });
    } catch (e) {
        resp = false;
    }
    return resp;
}

/**
 * Service for sending SMS with twilio
 * @param {string} phone Phone number
 * @param {string} name Product name
 * @returns {Object} - the jQuery / DOMElement
 */
function sendNotification(phone, name) {
    var Resource = require('dw/web/Resource');
    var getTwilioService = dw.svc.LocalServiceRegistry.createService('twilio.http.sms', {
        createRequest: function (svc, args) {
            var serviceConfig = svc.getConfiguration();
            var ACCOUNT_SID = serviceConfig.getCredential().user;
            var AUTH_TOKEN = serviceConfig.getCredential().password;

            svc.setRequestMethod('POST');
            svc.addHeader('content-type', 'application/x-www-form-urlencoded');
            svc.addHeader('authorization', 'Basic ' + dwutil.StringUtils.encodeBase64(ACCOUNT_SID + ':' + AUTH_TOKEN));
            return args;
        },
        parseResponse: function (svc, client) {
            var data = client.text;
            data = JSON.parse(data);

            return data;
        }
    });

    var prefs = { FROM_PHONE: '+19896608245' };
    var message = dw.util.StringUtils.format(Resource.msg('notify.message', 'notify', null), name);
    var req = 'To=' + phone + '&From=' + prefs.FROM_PHONE + '&Body=' + message;
    var response = getTwilioService.call(req);

    return response.object;
}

module.exports = {
    sendNotification: sendNotification,
    addCustomObject: addCustomObject
};
