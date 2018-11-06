#!/usr/bin/env node
require('./node_modules/ev3_source.js');

const motorA = ev3_motorA();
const motorB = ev3_motorB();
const spd = 100;
const colorSensor = ev3_colorSensor();
const threshold = 5;

function on_line(){
    if(ev3_reflectedLightIntensity(colorSensor) <= threshold){
        return true;
    } else {
        return false;
    }
}

function turn_counter_clockwise(deg){
    const p = 195;
    const rot = Math.floor(deg/90*195);
    display(rot);
    if (ev3_connected(motorA) && ev3_connected(motorB)) {
        display("Turning");
        ev3_runForDistance(motorA, -rot, spd);
        ev3_runForDistance(motorB, rot, 0.7*spd);
    } else {
        display("ERROR");
    }
}

function back(){
    const rot = -50;
    ev3_runForDistance(motorA, rot, spd);
    ev3_runForDistance(motorB, rot, spd);
}

function forward(){
    const rot = 10;
    ev3_runForDistance(motorA, rot, spd);
    ev3_runForDistance(motorB, rot, spd);
}

function termCond(){
    return false;
}

function task(){
    if(on_line()){
        display("1");
        back();
        ev3_pause(500);
        turn_counter_clockwise(40);
        ev3_pause(500);
    } else {
        display("2");
        ev3_runUntil(on_line, forward);
    }
}

ev3_runUntil(termCond, task);