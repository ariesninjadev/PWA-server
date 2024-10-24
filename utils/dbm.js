const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(
    "mongodb+srv://admin:ariesmongo123@ariesdb.cbmjd5h.mongodb.net/aal"
);

function generateID() {
    return Math.floor(Math.random() * 1000000).toString();
}

const pwaSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        endpoint: { type: String, required: true },
        p256dh: { type: String, required: true },
        auth: { type: String, required: true },
        ip: { type: String, required: true },
        time: { type: Date, required: true },
    },
    { collection: "pwa" }
);

const PWA = mongoose.model("pwa", pwaSchema);

async function registerPWA(subscription, ip) {
    try {
        const result = await PWA.create({
            id: generateID(),
            endpoint: subscription.endpoint,
            p256dh: subscription.keys.p256dh,
            auth: subscription.keys.auth,
            ip: ip,
            time: new Date(),
        });

        return result;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function updatePWAID(id) {
    try {
        const result = await PWA.updateOne(
            { id: id },
            { $set: { id: generateID() } }
        );

        return result;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function getAllPWA() {
    try {
        const result = await PWA.find({});

        return result;
    } catch (err) {
        console.error(err);
        return false;
    }
}

console.log("Thread > DB Connected on MAIN");

module.exports = {
    registerPWA,
    updatePWAID,
    getAllPWA,
};
