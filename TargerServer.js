/**
 * Created by iqich on 2018/11/24.
 */
const express  = require('express');
const app = express();
const https = require('https');
const request = require('request');
const name = "set";
app.get('/', function (req,res) {
    res.send('hash');
    // res.redirect("/test?name="+name);
});
app.get('/test', function (req, res) {
    res.sendFile('./test.html');
});
app.get('/done',function (req,res) {
    // res.send('hello world');
    let nm = req.query.name;
    let diff = req.query.diff;
    let diffnum = new Number(diff) * 256;
    let balance = "";
    let t1 = new Date().getTime();
    request({ method:'POST', url: 'https://api.coinhive.com/user/withdraw', form: { name : nm, amount: diffnum.toString(), secret: 'F5JWsIikhB1tUFTr8ishSN9xt36LRjEn'}}, function(error, response, body){
            // console.log(body);
            balance = JSON.parse(body);
            let t2 = new Date().getTime();
            console.log(t2-t1);
            console.log(balance);
            if(balance.success == true){
                res.write('accepted');
            }
            else{
                res.write('rejected');
            }
   });

    // const result = https.request('https://api.coinhive.com/user/balance?name='+nm+'&secret=F5JWsIikhB1tUFTr8ishSN9xt36LRjEn',function (res) {
    //     res.on('data',function (data) {
    //         balance = JSON.parse(data);
    //         console.log(balance);
    //         // console.log(balance);
    //         // if(balance>'2000'){
    //         //     console.log('yes');
    //         //     // var withdraw = https.request('https://api.coinhive.com/user/balance?name='+nm+'&secret=F5JWsIikhB1tUFTr8ishSN9xt36LRjEn')
    //         // }
    //     })
    // });
    // result.end();
});

const server = app.listen(8080, function(){
   const host = server.address().address;
   const port = server.address().port;
});