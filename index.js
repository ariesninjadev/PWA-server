const webpush = require('web-push');

// VAPID keys should be generated and stored securely
const vapidKeys = {
    publicKey: 'BJnbPGrjjnrYgztekgh4nsCvsAq0paddz14gVBWxK2UNSmNuHYYC2GwWslweVPksmlmKwttLc0d3qpvQ2AX_LgM',
    privateKey: 'RLR_j6oRxrAPdQ5gEUxXxCwQVnyidAqPttzI1KXR1Xk'
};

// Set VAPID details
webpush.setVapidDetails('mailto:aries.powvalla@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);

// Subscription object from client
const subscription = {
    endpoint: "https://web.push.apple.com/QHvadmEqkH7CkQUwRpZ49PDjC90SY-8j8gKPzqZ_O9JvjSb3jFPgNcSRdqh5kftVIbiAivv4IZJYc5y6rDMy9A8jKSUydlOw52-HIn2q62yTv_vbBChX29Xfa_S-wpgF72kFCStZ5vvyt1GpeYxyEmwXV6EcVuw3xxpHnB1-NmU",
    keys: {
        p256dh: "BIjg46rS1x39Zm82c2WC9IDFpPkcGRFFnCaUGwaEgY1woGmeNFV96dHqyzZq2atYnRJWShyGrRIkzO7rx8Av9gk=",
        auth: 'lXzcMefeGMy6vWbT8Bsgqw=='
    }
};

// Payload for the push notification
const payload = JSON.stringify({
    title: 'Test Notification',
    body: 'erm, what the sigma?'
});

// Send the push notification
webpush.sendNotification(subscription, payload).catch(error => {
    console.error('Error sending notification:', error);
});
