cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-qrcodejs/www/qrcodejsPlugin.js",
        "id": "cordova-plugin-qrcodejs.QRCodeJS",
        "pluginId": "cordova-plugin-qrcodejs",
        "clobbers": [
            "cordova.plugins.qrcodejs"
        ]
    },
    {
        "file": "plugins/cordova-plugin-qrcodejs/www/qrcode.js",
        "id": "cordova-plugin-qrcodejs.QRCcodeJSImpl",
        "pluginId": "cordova-plugin-qrcodejs",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-qrcodejs/www/qrcodejsPluginProxy.js",
        "id": "cordova-plugin-qrcodejs.QRCcodeJSProxy",
        "pluginId": "cordova-plugin-qrcodejs",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-qrcodejs": "1.0.0",
    "cordova-plugin-whitelist": "1.3.3"
}
// BOTTOM OF METADATA
});