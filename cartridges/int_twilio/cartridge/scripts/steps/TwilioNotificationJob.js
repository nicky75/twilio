module.exports.execute = function () {
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var ProductMgr = require('dw/catalog/ProductMgr');
    var Transaction = require('dw/system/Transaction');
    var twilioHelper = require('*/cartridge/scripts/helpers/twilioHelpers');
    var customObjectName = 'TwillioSubscription';
    var customObjectIterator = CustomObjectMgr.getAllCustomObjects(customObjectName);
    var ArrayList = require('dw/util/ArrayList');

    try {
        while (customObjectIterator.hasNext()) {
            var co = customObjectIterator.next();
            var product = ProductMgr.getProduct(co.custom.pid);
            if (co.custom.phones && product.availabilityModel.availability > 0) {
                var customObject = CustomObjectMgr.getCustomObject(customObjectName, co.custom.pid);
                var phones = co.custom.phones;
                var error = false;
                phones.forEach(function (phone) {
                    var response = twilioHelper.sendNotification(phone, product.name);
                    if (response.error_code) {
                        error = true;
                    } else {
                        var newPhones = new ArrayList(phones);
                        newPhones.remove(phone);
                        Transaction.wrap(function () {
                            customObject.custom.phones = newPhones;
                        });
                    }
                });
                if (!error) {
                    Transaction.wrap(function () {
                        CustomObjectMgr.remove(customObject);
                    });
                }
            }
        }
    } catch (e) {
        //do nothing
    } finally {
        //do nothing
    }
};
