/**
 * Created by KyrLouca on 28/1/2016.
 */
prom = require('./kyrPromises.js');
fs = require('fs');
var f2 = prom.qreadFile('cpm.htm', 'utf8');
//var f2 = prom.qreadFile('16440.htm', 'utf8');
var fName='tempV';

f2.then(function (data) {


        //var reg = /Transport Document[^$]*?TDID[^%]*?Prefix[^%]*?(?=No)[^%]*?<\/tr>/g;
    // get all blocks <table></table>
        var reg = /<table[^%]*?<\/table>/g;
        var allBlocks = data.match(reg);
        console.log('len=' + allBlocks.length);

    fs.writeFile('tempBlocksAll.txt',allBlocks.join('+'));
        fs.writeFileSync('tempBlocksValid2.txt','\nstart','utf8');

        for (var i = 0; i < allBlocks.length; i++) {
            console.log('*********' + i + '*****');
            reg = /TDID[^%]*?Prefix[^%]*?(?=No)[^%]*?<\/tr>/g;
            var block=allBlocks[i].match(reg);

            //discard non valid blocks that do not contain tdid prefix and no
            if (block) {
                var temp='\n==='+i+'==';
               console.log(temp);

                var reg2 = />(\d{5,})</g; //use exec to strip < but you will need to execute twice
                var plines1=reg2.exec(block[0]);
                var plines2=reg2.exec(block[0]);

                if (plines1 && plines2){
                    var tdidVal=plines1[1]||'tdid';
                    var noVal=plines2[1]||'noval';
                    fs.appendFileSync('tempBlocksValid2.txt','\n'+tdidVal+'***'+noVal,'utf8');
                    console.log(tdidVal+'***---'+noVal);}
            }
        }


    })
    .catch(function (err) {
        console.log('c--' + err);
    })
