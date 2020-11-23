var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BCfuQND2eGKzrr-4nT2ZtlIWLg92IVTltSCZdkAITQnuyyaPyX69p6kNH0U_3Y-u1LIj-5HysTOyf1I81EG9Vqo",
   "privateKey": "I0YLz1XzTyZYyRpOUi39zBM3gaJ9f40bXLF9Eh9Xx6A"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fxsdu4ZuTAI:APA91bGebhYJwqc5oqoonlNbJnTECUyeWdNsGScMqA7yub2PKh7gixWsPqVmUr7JFATQqgf3KnsGO5xu6-woJVlK3-lEiflJ01jsxnLkHLPegdVGam4nL65MygFDweq9F0NvUYYEUUUl",
   "keys": {
       "p256dh": "BD+7zBPSmDU/sJ3LsFcTFKZzWD3gBI0t+Cq/QruPFBItTAeXSKASQHPfNaQE2oWBQbjL/eBUGtUhczrcgU9KViA=",
       "auth": "ZLgV+VvKRCq0OTJmL9IctQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '439354098470',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);