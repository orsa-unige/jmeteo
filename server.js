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

var config= require('../jallsky-test/config.json');   /// Configuration file.
var db_obs= require('../jallsky-test/db_obs.js');    /// DB functions.

var exec = require('child_process').exec;

var vpro = 'sudo ../vproweather/vproweather -x '+config.meteo_station.device;


// for (var i=0;i<100;) {


var params={};

exports.realtime = function(){
    
    exec(vpro, function callback(error, stdout, stderr){
        
        var arr=JSON.parse(stdout);
        params.data=arr;
        //    console.log(params);
        
        db_obs.enter(params, config.meteo_station.collection, function(){
//            cb(null, "server meteo station: database enter OK!");
            console.log("server meteo station: database enter OK");
        });
        
    });

};
    
 
