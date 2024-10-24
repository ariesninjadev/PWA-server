// client to view devices that have subscribed to the PWA. The client will also be able to send a notification to a specific device.

var socket = io();

socket.emit("get", function (data) {
    console.log("All PWA: ", data);
    data.forEach((pwa) => {
        var card = document.createElement("div");
        card.className = "card";

        var idElement = document.createElement("p");
        idElement.innerHTML = "ID: " + pwa.id;
        card.appendChild(idElement);

        var deviceIDElement = document.createElement("p");
        deviceIDElement.innerHTML = "Device ID: " + pwa.deviceID;
        card.appendChild(deviceIDElement);

        var ipElement = document.createElement("p");
        ipElement.innerHTML = "IP: " + pwa.ip;
        card.appendChild(ipElement);

        var notifyButton = document.createElement("button");
        notifyButton.innerHTML = "Send Notification";
        notifyButton.addEventListener("click", function () {
            var title = prompt("Enter title");
            var body = prompt("Enter body");
            socket.emit("sendto", { id: pwa.id, title: title, body: body });
        });
        card.appendChild(notifyButton);

        var changeIDButton = document.createElement("button");
        changeIDButton.innerHTML = "Change ID";
        changeIDButton.addEventListener("click", function () {
            var newID = prompt("Enter new ID");
            if (newID) {
                socket.emit("changeID", pwa.id, newID);
                idElement.innerHTML = "ID: " + newID;
            }
        });
        card.appendChild(changeIDButton);

        document.getElementById("list").appendChild(card);
    });
});