// ==UserScript==
// @name         FragDudes Custom 443 MQTT
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Connect FragDudes lobby to custom 443 MQTT broker
// @match        *://fragdudes.com/*
// @match        *://*.fragdudes.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Deploy sonrası Render adresini buraya yaz (örnek: fragdudes-mqtt.onrender.com)
    const CUSTOM_BROKER = "wss://SENIN-ADRESIN.onrender.com/mqtt";

    const OriginalWebSocket = window.WebSocket;
    window.WebSocket = function(url, protocols) {
        if (typeof url === "string" && (url.includes("emqx") || url.includes("hivemq") || url.includes("mosquitto"))) {
            url = CUSTOM_BROKER;
        }
        return protocols ? new OriginalWebSocket(url, protocols) : new OriginalWebSocket(url);
    };
    window.WebSocket.prototype = OriginalWebSocket.prototype;
    window.DUDES_MQTT = [CUSTOM_BROKER];
})();
