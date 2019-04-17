#!/usr/bin/env node
const vfosMessagingPubsub = require("./index.js");

var broker = "amqp://messaging.vfos.uninova.pt";
var userName = "OPC";
var domain = "pt.vfos";
var routingKeys = ["pt.vfos.sensors.#"];

var communications = new vfosMessagingPubsub(broker, userName, domain, routingKeys);

let pubSubDestination1 = "pt.vfos.drivers.opc.s1";
let pubSubMessage1 = "Value from sensor1 : " + 1000;
console.log(userName + " sends for routingkey " + pubSubDestination1 + " : " + pubSubMessage1);
communications.sendPublication(pubSubDestination1, pubSubMessage1);

let pubSubDestination2 = "pt.vfos.drivers.opc.s2";
let pubSubMessage2 = "Value from sensor2 : " + 2000;
console.log(userName + " sends for routingkey " + pubSubDestination2 + " : " + pubSubMessage2);
communications.sendPublication(pubSubDestination2, pubSubMessage2);

let pubSubDestination3 = "pt.vfos.drivers.opc.s3";
let pubSubMessage3 = "Value from sensor3 : " + 3000;
console.log(userName + " sends for routingkey " + pubSubDestination3 + " : " + pubSubMessage3);
communications.sendPublication(pubSubDestination3, pubSubMessage3);

function messageHandler(msg) {
  console.log("->>>>>>>>>>>>>>>>>\"");
  console.log("> opcMain: msg.content = \"" + msg.content.toString() + "\"");
  console.log("> opcMain: msg.id = \"" + msg.id + "\"");
  console.log("> opcMain: msg.routingKey = \"" + msg.routingKey + "\"");
}

function messageSensorsPrivateHandler(msg) {
  console.log("->>>>>>>>>>>>>>>>>\"");
  console.log("> opcMain: msg.content = \"" + msg.content.toString() + "\"");
  console.log("> opcMain: msg.id = \"" + msg.id + "\"");
  console.log("> opcMain: msg.routingKey = \"" + msg.routingKey + "\"");
  console.log("pt.vfos.drivers.opc." + msg.id);
  
  communications.sendPublication("pt.vfos.drivers.opc." + msg.id, msg.content);
}

communications.registerPublicationReceiver(messageHandler);
communications.registerPrivateMessageReceiver(messageSensorsPrivateHandler);
//communications.unregister();