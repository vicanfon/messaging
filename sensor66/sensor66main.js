#!/usr/bin/env node
const vfosMessagingPubsub = require("./index.js");

var broker = "amqp://messaging.vfos.uninova.pt";
var userName = "Sensor66";
var domain = "pt.vfos";
var routingKeys = ["pt.vfos.sensors.s66"];

var communications = new vfosMessagingPubsub(broker, userName, domain, routingKeys);

let prefixMessagingPrivateDestination1 = "pt.vfos";
let componentMessagingPrivateDestination1 = "OPC";
let privateMessage1 = "The sensor 66 has the value: 66!";
console.log(userName + " sends for component " + componentMessagingPrivateDestination1 + " : " + privateMessage1);
communications.sendPrivateMessage(prefixMessagingPrivateDestination1, componentMessagingPrivateDestination1, privateMessage1);
