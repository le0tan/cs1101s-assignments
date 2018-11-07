#!/usr/bin/env node
require('./node_modules/ev3_source.js');

const motorA = ev3_motorA();
const motorB = ev3_motorB();
const spd = 150;
const colorSensor = ev3_colorSensor();
const threshold = 30;

function on_line(){
    if(ev3_reflectedLightIntensity(colorSensor) <= threshold){
        return true;
    } else {
        return false;
    }
}

function off_line(){
    if(ev3_reflectedLightIntensity(colorSensor) <= threshold){
        return false;
    } else {
        return true;
    }
}

function turn_left(){
    const rot = 40;
    ev3_runForDistance(motorB, rot, 1.5*spd);
    ev3_runForDistance(motorA, -rot, 0.5*spd);
}

function turn_right(){
    const rot = 40;
    ev3_runForDistance(motorA, rot, 1.5*spd);
    ev3_runForDistance(motorB, -rot, 0.5*spd);
}

function stop_all(){
    ev3_stop(motorA);
    ev3_stop(motorB);
}

function func1(){
    display(1);
    ev3_runUntil(on_line, turn_right);
    func2();
}

function func2(){
    display(2);
    ev3_runUntil(off_line, turn_right);
    func3();
}

function func3(){
    display(3);
    ev3_runUntil(on_line, turn_left);
    func4();
}

function func4(){
    display(4);
    ev3_runUntil(off_line, turn_left);
    func1();
}

func1();