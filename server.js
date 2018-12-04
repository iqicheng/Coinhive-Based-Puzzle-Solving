var http = require('http');
var https =require('https');
var fs = require('fs');
var util = require('util');
var url = require('url');

http.createServer( function (request, response) {
    // Parse the request containing file name
    // var test="";
    // request.on('data',function (chunk) {
    //     test+=chunk;
    // });
    // var name = JSON.stringify(request.name);
    var pathname = url.parse(request.url).pathname;
    var path = url.parse(request.url).path;
    var name = 'shujun';
    console.log(path);
    // Print the name of the file for which request is made.
    console.log("Request for " + pathname + " received.");
    // if (path.indexOf("?") != -1) {
    //     name = path.substr(2);
    // }
    // Read the requested file content from file system

    if(pathname == '/'){
        response.writeHead(302, {'Location': '/test.html'});
        console.log(response._header);
        response.end();
        // response.writeHead(200, {'content-type': 'text/html'});
        // var rs = fs.createReadStream('index.html');
        // util.pump(rs, response);
    }
    else if (pathname == '/test.html'){
        var result = https.request('https://api.coinhive.com/user/balance?name=shujun&amount=2304&secret=v5wwYrvFqTkwbHarOr27dxEEVCgQlCQH',function (res) {
            res.on('data',function (data) {
                var balance = JSON.parse(data);
                console.log(balance);
                if(balance>'2000'){
                    console.log('yes');
                    // var withdraw = https.request('https://api.coinhive.com/user/withdraw?name=shujun&secret=v5wwYrvFqTkwbHarOr27dxEEVCgQlCQH')
                }
            })
        });
        result.end();
        response.end();
    }
        // Send the response body
}).listen(80);

// Console will print the message
console.log('Server running at http://127.0.0.1:80/');