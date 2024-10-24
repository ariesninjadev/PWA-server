try {
    var express = require("express");
    var app = express();
    var https = require("https");
    var fs = require("fs");
    const path = require("path");
    const db = require("./utils/dbm.js");
    const pwa = require("./utils/pwa.js");
    const bodyParser = require("body-parser");
    const requestIp = require('request-ip');

    // SSL Certificate and Key
    const options = {
        key: fs.readFileSync("private.key"),
        cert: fs.readFileSync("certificate.crt")
    };

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "public"));
    app.use(express.static(__dirname + "/public"));
    app.use(bodyParser.json()); // Add this line to use body-parser

    app.get("/", function (req, res) {
        res.sendFile(__dirname + "/public/index.html");
    });

    app.post("/subscribe", function (req, res) {
        const subscription = req.body;
        const deviceId = req.headers["x-device-id"]; // Custom header for device ID

        console.log("Received data: ", subscription);
        console.log("Device ID: ", deviceId);

        // Validate
        if (!subscription || !subscription.endpoint || !subscription.keys) {
            return res.status(400).send("Invalid subscription");
        }

        if (!deviceId) {
            return res.status(400).send("Device ID is required");
        }

        // Grab the IP address
        const ip = requestIp.getClientIp(req);

        // Remove the "::ffff:" prefix if it exists
        if (ip.startsWith("::ffff:")) {
            ip = ip.replace("::ffff:", "");
        }

        // Register the PWA
        db.registerPWA(subscription, ip, deviceId);
        res.status(200).send("Data received successfully");
    });

    app.get("*", function (req, res) {
        res.status(404).sendFile(__dirname + "/public/404/index.html");
    });

    var server = https.createServer(options, app);

    server.listen(1234, () => console.log("2.0.0.54:1234"));

    var io = require("socket.io")(server);
    io.sockets.on("connection", function (socket) {

        // START OF SOCKET //

        socket.on("register", async function (data) {
            console.log("Registering PWA: ", data);
            const result = await db.registerPWA(data, socket.handshake.address);
            console.log("Registered PWA: ", result);
        });

        socket.on("update", async function (data) {
            console.log("Updating PWA: ", data);
            const result = await db.updatePWAID(data);
            console.log("Updated PWA: ", result);
        });

        socket.on("get", async function () {
            console.log("Getting all PWA");
            const result = await db.getAllPWA();
            console.log("All PWA: ", result);
        });

        socket.on("send", async function (data) {
            console.log("Sending notification: ", data);
            const result = await db.getAllPWA();
            console.log("All PWA: ", result);
            result.forEach((pwa) => {
                pwa.sendNotification(pwa, data.title, data.body);
            });
        });

        socket.on("sendto", async function (data) {
            console.log("Sending notification to: ", data);
            const result = await db.getAllPWA();
            console.log("All PWA: ", result);
            result.forEach((pwa) => {
                if (pwa.id == data.id) {
                    pwa.sendNotification(pwa, data.title, data.body);
                }
            });
        });

        // END OF SOCKET //
    });
} catch (error) {
    console.error("Server encountered an error: ", error);
}