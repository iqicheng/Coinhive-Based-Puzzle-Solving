const http = require('http');
const coinhive = require('coin-hive');
const request = require('request');
const nm = 'testUser7';
let i = 0;
let body = '';
let difficulty = 1;
// const done = {
//     host: 'localhost',
//     port: '8080',
//     path: '/done?name='+name+'&diff='+difficulty
// };
async function set (){

    let t1 = new Date().getTime();
    const miner = await
        coinhive('KSSQqw8v1ItRmtNAGDybiJu1PP4IsXn3', {
            username: 'shujun',
            port : 3002+i,
            threads : 12
        });
        await miner.start();
        let t2 = new Date().getTime();
        console.log(t2-t1);
        // if(difficulty > 0) {
        miner.on('job', () => {
            let t3 = new Date().getTime();
            console.log(t3 - t2);
        });
        // }
        miner.on('close', ()=>{
            setTimeout(set, 100);
        });

}
for(i = 0;i<100;i++){

    set();
    console.log(i);
}

