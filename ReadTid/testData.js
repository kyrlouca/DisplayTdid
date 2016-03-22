/**
 * Created by KyrLouca on 2/2/2016.
 */
"use strict";

var getTDid = require('./readTdidFile.js');
let p=3;


var aData = getTDid.gd('cpm.htm');

aData
    .then(function (data) {
        console.log(data);
    })
    .catch(function (err) {
        console.log('test data-->'+err);
    });


 var test = getTDid.test();
 test
 .then(function (data) {
  console.log(data);
 })
 .catch(function (err) {
 console.log(err);

 })
