var server = require('server');
var page = module.superModule;
server.extend(page);

/**
 * Product-Show : This endpoint is called when a shopper navigates to the home page
 * @name Product-Show
 * @function
 * @memberof Show
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.append('Show', function (req, res, next) {
    var HookMgr = require('dw/system/HookMgr');
    var accountHelpers = require('*/cartridge/scripts/account/accountHelpers');
    var contentData = res.getViewData();
    var notifyForm = server.forms.getForm('twilio');
    var accountModel = accountHelpers.getAccountModel(req);
    contentData.phone = (accountModel) ? accountModel.profile.phone : '';
    contentData.notifyForm = notifyForm;
    if (HookMgr.hasHook('dw.twilio.getNotifyUrl')) {
        var jsonData = HookMgr.callHook('dw.twilio.getNotifyUrl', 'getNotifyUrl');
        contentData.contentHeader = jsonData.contentHeader;
    }
    next();
});

module.exports = server.exports();
