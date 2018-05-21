// 已知bug：
// 1，替换' uploads', 'uploads ', ' .html'
// 繁体
// http://47.89.60.10/mylink/static/tc/aomen/2133.html
//http://47.89.60.10/mylink/static/tc/dongjing/965.html
//http://47.89.60.10/mylink/static/tc/fushan/2766.html
//http://47.89.60.10/mylink/static/tc/hk/169.html
//http://47.89.60.10/mylink/static/tc/mangu/3049.html
//http://47.89.60.10/mylink/static/tc/mosike/4531.html
//http://47.89.60.10/mylink/static/tc/shouer/1146.html
//http://47.89.60.10/mylink/static/tc/taibei/1760.html
//http://47.89.60.10/mylink/static/tc/xini/3859.html
//http://47.89.60.10/mylink/static/tc/xinjiapo/1905.html

const fs = require('fs');
const axios = require('axios');
const path = require('path');
const fsPath = require('fs-path');



const args = require('yargs').alias('h', 'help')
    .option('d', {
        alias: 'destination',
        describe: '目的地文件名',
        default: 'hk'
    })
    .usage('Usage: node translate.js -d hk')
    .example('node translate.js -d hk')
    .argv;

const destination = args.d;

var files = fs.readdirSync(path.join(__dirname, '/static/sc/', destination));

files.forEach((filename) => {
    // var fullname = path.join(dir,filename);

    console.log(22, filename)

    if(filename.includes('.html')){
        translateOnePage(filename);
    }

});


function translateOnePage(filename){
    var text = fs.readFileSync(path.join(__dirname, '/static/sc/', destination, '/', filename), 'utf8');

    let number = text.length;
    let str = '', words, index=0;
    const split = 2000;

    (async function(){
        while(number > 0){
            words = text.substring(split*index, split*(index+1));
            str += await aa(words);
            number -= split;
            index++;
        }

        fsPath.writeFileSync(path.join(__dirname, '/static/tc/', destination, '/', filename), str);

    })();
}


async function aa(words){
    try{
        const response = await axios.get('http://127.0.0.1:8360/translate', {
            params: {
                // text: '我是小明',
                text: words,
                from: 'zh-cn',
                to: 'zh-tw'
            }
        });

        return response.data.data.translated;
    } catch(err){
        console.error(err);
    }

    // console.log(111111, response.data.data.translated);
}



