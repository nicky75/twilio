'use strict';

/**
 * Get notify URL
 * @returns {Object} an object that has new value
 */
function getNotifyUrl() {
    var ContentMgr = require('dw/content/ContentMgr');
    var cid = 'twilioNotificationFormText';
    var contentHeader = ContentMgr.getContent(cid);
    return {
        contentHeader: contentHeader
    };
}

exports.getNotifyUrl = getNotifyUrl;
