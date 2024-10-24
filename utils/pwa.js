const webpush = require('web-push');

// VAPID keys should be generated and stored securely
const vapidKeys = {
    publicKey: 'BJnbPGrjjnrYgztekgh4nsCvsAq0paddz14gVBWxK2UNSmNuHYYC2GwWslweVPksmlmKwttLc0d3qpvQ2AX_LgM',
    privateKey: 'RLR_j6oRxrAPdQ5gEUxXxCwQVnyidAqPttzI1KXR1Xk'
};

// Set VAPID details
webpush.setVapidDetails('mailto:aries.powvalla@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);

// Subscription object from client
// const subscriptionLiz = {
//     endpoint: "https://fcm.googleapis.com/fcm/send/eTfthuzngio:APA91bEWUNRdSOMONZGzFTqjC5mK4ot-5aBKJIK5LS7vHp0Ye7yFf1nPpZUZcTNifUbt9v_Vlat_SxzDKWYhAxMMLQ57JQRSpTgvVS1fHbLMvKecdBYNOYROhMC1lZFx23HK1Bezqby_",
//     keys: {
//         p256dh: "BPHHZVr/Y7yNroe4R+fLCmF2fm5bF+O+9Vlg+RChqLGhF4Aj763nUlukcfBshOA/Oj/iIuMaPXOxcjujtt8xPSU=",
//         auth: 'yf1IWdQoG5w6zMSk3CSWpg=='
//     }
// };

// const subscription = {
//     endpoint: "https://fcm.googleapis.com/fcm/send/fdXTKRGPTtU:APA91bFA9NiuvMPlzcve4dAihCWdwCaVeXYzztfco1bgNR5FjSyCgG7hyVXAYMm7KxYrnUFcVmFm2vzGw6XKkQCnovrYxqQJE2uxUv8HUqsEEmrKWAR2gO_wGZLmJMyqrmjhzpLCtB1d",
//     keys: {
//         p256dh: "BGtJ2U6wHKI99vJFF2TY53rf682ZctsfFnwJH0gN1WRoXbce7E8zt2CiLv180AxaM0eNAjzu88wO2ziJ72seBuo=",
//         auth: 'WkGDg9bzPLsoM2hma4bWZg=='
//     }
// };

function sendNotification(subscription, title, body) {
    const payload = JSON.stringify({
        title: title,
        body: body
    });

    const options = {
        urgency: 'high',
    };

    webpush.sendNotification(subscription, payload, options).catch(error => {
        console.error('Error sending notification:', error);
    });
}

module.exports = sendNotification;