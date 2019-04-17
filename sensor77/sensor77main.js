#!/usr/bin/env node
const vfosMessagingPubsub = require("./index.js");

var broker = "amqp://messaging.vfos.uninova.pt";
var userName = "Sensor77";
var domain = "pt.vfos";
var routingKeys = ["pt.vfos.sensors.s77"];

var communications = new vfosMessagingPubsub(broker, userName, domain, routingKeys);

let prefixMessagingPrivateDestination1 = "pt.vfos";
let componentMessagingPrivateDestination1 = "ADS";
let privateMessage1 = "The sensor 77 has the value: 77!";
console.log(userName + " sends for component " + componentMessagingPrivateDestination1 + " : " + privateMessage1);
communications.sendPrivateMessage(prefixMessagingPrivateDestination1, componentMessagingPrivateDestination1, privateMessage1);
