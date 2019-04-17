#!/usr/bin/env node
const vfosMessagingPubsub = require("./index.js");

var broker = "amqp://messaging.vfos.uninova.pt";
var userName = "ADS";
var domain = "pt.vfos";
var routingKeys = ["pt.vfos.sensors.#"];

var communications = new vfosMessagingPubsub(broker, userName, domain, routingKeys);

let pubSubDestination1 = "pt.vfos.drivers.ads.s4";
let pubSubMessage1 = "Value from sensor4 : " + 4000;
console.log(userName + " sends for routingkey " + pubSubDestination1 + " : " + pubSubMessage1);
communications.sendPublication(pubSubDestination1, pubSubMessage1);

let pubSubDestination2 = "pt.vfos.drivers.ads.s5";
let pubSubMessage2 = "Value from sensor5 : " + 5000;
console.log(userName + " sends for routingkey " + pubSubDestination2 + " : " + pubSubMessage2);
communications.sendPublication(pubSubDestination2, pubSubMessage2);

function messageHandler(msg) {
  console.log("->>>>>>>>>>>>>>>>>\"");
  console.log("> adsMain: msg.content = \"" + msg.content.toString() + "\"");
  console.log("> adsMain: msg.id = \"" + msg.id + "\"");
  console.log("> adsMain: msg.routingKey = \"" + msg.routingKey + "\"");
}

function messageSensorsPrivateHandler(msg) {
  console.log("->>>>>>>>>>>>>>>>>\"");
  console.log("> adsMain: msg.content = \"" + msg.content.toString() + "\"");
  console.log("> adsMain: msg.id = \"" + msg.id + "\"");
  console.log("> adsMain: msg.routingKey = \"" + msg.routingKey + "\"");
  console.log("pt.vfos.drivers.ads." + msg.id);
  
  communications.sendPublication("pt.vfos.drivers.ads." + msg.id, msg.content);
}

communications.registerPublicationReceiver(messageHandler);
communications.registerPrivateMessageReceiver(messageSensorsPrivateHandler);
//communications.unregister();