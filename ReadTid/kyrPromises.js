/**
 * Created by KyrLouca on 27/1/2016.
 */
fs = require('fs');
Q = require('q');
request = require('request');

function promiseGet(options, url) {
    return new Promise(function (resolve, reject) {
        request(url, options, function (err, resp, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}


function promReadFile(filePath, options) {
    var QreadFile = Q.denodeify(fs.readFile);
    return QreadFile(filePath, options);
}

function promWriteFile(filePath,data,options) {
    var QreadFile = Q.denodeify(fs.writeFile);
    return QreadFile(filePath,data,options);
}

function promiseReadFile(filePath, options) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, options, function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject('kyrpromiseRead'+err);
                //reject(new Error('promise ReadFIle  aerror: ' + err));
            }
        })

    });
}

module.exports = {
    readFile: promiseReadFile,
    httpGet: promiseGet,
    qreadFile: promReadFile,
    qwriteFile:promWriteFile
}
/*
 var options = {headers: {'User-Agent': 'kyrlouca'}};
 var  url = 'https://api.github.com/users/kyrlouca/repos';
 promiseGet(options,url).then(function(data){
 console.log(data);
 }).catch(function(err){
 console.log(err);
 });
 */


/*

 filePath='test2.txt';
 options='utf8';

 var prom2= promiseReadFile(filePath,options);
 prom2.then(function(val){
 console.log(val);
 }).catch(function(err){
 console.log('catch err'+err)
 })

 */