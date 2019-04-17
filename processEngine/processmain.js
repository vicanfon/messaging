#!/usr/bin/env node
const vfosMessagingPubsub = require("./index.js");

var broker = "amqp://messaging.vfos.uninova.pt";
var userName = "ProcessEngine";
var domain = "pt.vfos";
var routingKeys = ["pt.vfos.drivers.#"];

var communications = new vfosMessagingPubsub(broker, userName, domain, routingKeys);

function messageHandler(msg) {
  console.log("->>>>>>>>>>>>>>>>>\"");
  console.log("> ProcessEngine: msg.content = \"" + msg.content.toString() + "\"");
  console.log("> ProcessEngine: msg.id = \"" + msg.id + "\"");
  console.log("> ProcessEngine: msg.routingKey = \"" + msg.routingKey + "\"");
}

communications.registerPublicationReceiver(messageHandler);
//communications.unregister();
