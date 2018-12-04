const http = require('http');
const async = require('async');
// var CoinHive = require('./authedmine.min');
const coinhive = require('coin-hive');

const name = 'testUser7';
let i = 0;
let body = '';
let difficulty = 2;
const options = {
    host: 'localhost',
    port: '8080',
    path: '/'
};
const done = {
    host: 'localhost',
    port: '8080',
    path: '/done?name='+name+'&diff='+difficulty
};
// Callback function is used to deal with response
async function set (){

    let t1 = new Date().getTime();
    const miner = await
        coinhive('KSSQqw8v1ItRmtNAGDybiJu1PP4IsXn3', {
            username: name,
            port : 3002+i,
            threads : 12
        });
    if (body == 'hash') {
        // Create miner
        // CoinHive's Site Key
        // Start miner

        await miner.start();
        let t2 = new Date().getTime();
        console.log(t2-t1);
        // if(difficulty > 0) {
            miner.on('job', () => {
                let t3 = new Date().getTime();
                console.log(t3 - t2);
            });
        // }
        miner.on('found', async data => {
            difficulty -= 1;
            if (difficulty == 0) {

                let t4 = new Date().getTime();
                console.log(t4 - t2);
                miner.kill();
                const reqdone = http.request(done, function (res) {
                    res.on('data', function (data) {
                        console.log(data.toString());
                    })
                });
                reqdone.end();
            }
            // console.log(`Total hashes: ${data.totalHashes}
            //         Accepted hashes: ${data.acceptedHashes}`)
            }
        );
        miner.on('update', data=>{
            console.log(`Hashes per second: ${data.hashesPerSecond}`)
        });
        miner.on('close', ()=>{
            setTimeout(set, 100);
        });
        // miner.on('update', async data => {
        //         if (data.totalHashes >= '512') {
        //             let t3 = new Date().getTime();
        //             console.log(t3-t2);
        //             miner.stop();
        //             const reqdone = http.request(done, function (res) {
        //                 res.on('data', function (data) {
        //                     console.log(data.toString());
        //                 })
        //             });
        //             reqdone.end();
        //             setTimeout(set, 1000);
        //         }
        //         console.log(`Total hashes: ${data.totalHashes}
        //             Accepted hashes: ${data.acceptedHashes}`)
        //     }
        // );
    }
}
const hashed = async function () {



            // Listen on events


            // Stop miner
            // setTimeout(async () => await miner.stop(), 60000);
            // var miner = CoinHive.User('KSSQqw8v1ItRmtNAGDybiJu1PP4IsXn3',name);
            // miner.start();
            // miner.on('found', function() { /* Hash found */ });
            // miner.on('accepted', function() { /* Hash accepted by the pool */ });
            // // Update stats once per second
            // var int = setInterval(function() {
            //     totalHashes = miner.getTotalHashes();
            //     console.log(totalHashes);
            //     // Output to HTML elements...
            //     if(totalHashes > '512'){
            //         miner.stop();
            //         clearInterval(int);
            //         console.log('done');
            //     }
            // }, 1000);
};
const callback =  function(response) {
    // Continuously update stream with data


    response.on('data', function (data) {
        body = data.toString();
        console.log(body);
    });
    set();

};

// Make a request to the server
    const req = http.request(options, callback);
    req.end();


// const url = '127.0.0.1:8080/';
// const getData = async url => {
//     try {
//         const response = await axios.get(url);
//         const data = response.data;
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }
// };
// getData(url);