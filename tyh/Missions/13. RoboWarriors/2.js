#!/usr/bin/env node
require('./node_modules/ev3_source.js');

const motorA = ev3_motorA();
const motorB = ev3_motorB();
const rot = 170;
const spd = 80;


if (ev3_connected(motorA) && ev3_connected(motorB)) {
    display("Connected");
    ev3_runForDistance(motorA, -rot, spd);
    ev3_runForDistance(motorB, rot, spd);
} else {
    display("ERROR");
}