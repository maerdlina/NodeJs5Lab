const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 1234;

let k = 0;
const server = http.createServer((req, res) => {
    
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Expires': '0'
    });

    console.log(`new request ${req.url}`)
    //ip
    const parseIp = (req) =>
    req.headers['x-forwarded-for']?.split(',').shift()
    || req.socket?.remoteAddress

    console.log(parseIp(req))
    //----------------------------------------------------------------

    let status = 400;

    let headers = {
        "Content-Type": "text/html",
    }

    let responseContent = {"test": "test"};

    if (req.url === "/") {
        status = 200;
        fs.createReadStream(path.resolve(__dirname, 'index.html')).pipe(res)
    } else if(req.url === "/comments"){
        if (req.method === "GET") {
            status = 200;
            responseContent = "<h1>Comments page</h1> <a href='/'>Home page</a>";
            res.writeHead(status, headers);
            res.end(responseContent);
        }
    } else if(req.url === "/stats"){
        if (req.method === "GET") {
            status = 200;
            responseContent = `<h1>Stats page</h1> <a href='./'>Home page</a>`;
            res.writeHead(status, headers);
            res.end(responseContent);
        } 
    } else{
        status = 400;
        res.writeHead(status, headers);
        res.end();
    }
})

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port localhost:${PORT}`);
});