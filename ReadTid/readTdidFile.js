/**
 * Created by KyrLouca on 28/1/2016.
 */

prom = require('./kyrPromises.js');
Q = require('Q');
fs = require('fs');


//will return a promise which when fullfilled will return the data in the THEN function or the error in the CATCH function
getData = function (aFile) {


    return new Q.Promise(function (resolve, reject) {
        var tdidFile = prom.readFile(aFile, 'utf8');

        tdidFile
            .then(function (data) {


                var outData = {};
                var reg;
                var allBlocks;
                var i, j;


                // get all blocks in the form of <table> </table>
                reg = /<table[^%]*?<\/table>/g; //[^%] my trick for any char since dot has a problem with EOL
                allBlocks = data.match(reg);
                //fs.writeFile('tempBlocksAll.txt', allBlocks.join('+'));
                fs.writeFileSync('tempBlocksValid2.txt', '', 'utf8');

                for (i = 0; i < allBlocks.length; i++) {
                    //console.log('*********' + i + '*****');
                    //only need blocks that have TDID Prefix and No. (ending with /tr which is table row
                    //? is very important used for lazy (first encounter)
                    // (?= used for lookaheads
                    reg = /TDID[^%]*?Prefix[^%]*?(?=No)[^%]*?<\/tr>/g;
                    var block = allBlocks[i].match(reg);

                    //discard non valid blocks that do not contain tdid prefix and no
                    if (block) {
                        var temp = '\n===' + i + '==';
                        //console.log(temp);

                        reg = />(\d{5,})</g;
                        //use exec to strip >dddd< but you will need to execute twice
                        // parthesis will extract the text maching patern inside parenthesis \d=anydigit {5,} at least 5 digits
                        var plines1 = reg.exec(block[0]);
                        var plines2 = reg.exec(block[0]);

                        //skip if they do not have both tdid number and house number
                        if (plines1 && plines2) {
                            var tdidVal = plines1[1];
                            var noVal = plines2[1];
                            outData[tdidVal] = noVal;
                            //console.log(outData);

                            fs.appendFileSync('tempBlocksValid2.txt', '\n' + tdidVal + '***' + noVal, 'utf8');
                            //console.log(tdidVal + '***---' + noVal);
                        }
                    }
                }
                //console.log('--**********--');
                //console.log(outData);
                //console.log('--**********--');
                if (outData) {
                    resolve(outData);
                   // resolve('hello fu');
                } else {
                    reject('No Data inf file');
                }
            })
            .catch(function (errMsg) {
                console.log('in areadtid');
                reject('readTdid-->'+errMsg);

            });

    })
}

function test() {
"use strict";
    var x=2;
    console.log('test&&&'+x)
    return new Promise(function (res, err) {


         res('testing tid');


    });
}

/*
 var promData = getData('cpm.htm');

 promData.then(function (data) {
 console.log('--------');
 console.log(data);
 console.log('--------');
 })
 */


module.exports = {
    gd: getData,
    test:test
};
