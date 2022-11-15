const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1'; // localhost
const port = 3000;

const server = http.createServer(getFromClient);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// ここまでメインプログラム========

// createServerの処理
function getFromClient(req, res) {
    request = req;
    response = res;
    fs.readFile('./index.html', 'UTF-8',
        (error, data) => {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        }
    );
}

