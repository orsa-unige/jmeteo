#!/usr/bin/env node

/**
 * @file   server.js
 * @author Davide Ricci (davide.ricci82@gmail.com)
 * @date   2017-12-31
 *
 * @brief Node server interface for the json-modified version of
 *        vproweather. Remserial shoud have been started on a screen
 *        terminal with a command such as:
 *
 *        sudo ./remserial -r 10.42.0.71 -p 5001 -l /dev/remserial1 /dev/ptmx
 *
 *
 */

"use strict";

var config= require('../jallsky/config.json');   /// Configuration file.
var db_obs= require('../jallsky/db_obs.js');    /// DB functions.

var exec = require('child_process').exec;

var vpro = 'sudo ../vproweather/vproweather -x '+config.meteo_station.device;


// for (var i=0;i<100;) {


// var params={};

exports.realtime = function(){

    console.log("meteo station: getting realtime data");
    
    exec(vpro, function (error, stdout, stderr){
        
        // console.log(error)
        // console.log(stdout)
        // console.log(stderr)

        if (isJson(stdout)) {
        
            var params=JSON.parse(stdout);
        
            db_obs.enter(params, config.meteo_station.collection, function(){
                console.log("meteo station: document entered in mongo collection");
            });

        }
        
    });

};
    
 

function isJson(str) {
    try {
    console.log("meteo station is trying valid meteo json");
        JSON.parse(str);
    } catch (e) {
        console.log("meteo station found INVALID JSON: " +e);
        return false;
    }
        console.log("meteo station found valid JSON!");
    return true;
}
