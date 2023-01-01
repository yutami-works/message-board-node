const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1'; // localhost
const port = 3000;

const server = http.createServer(getFromClient);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// 関数宣言（アローと違って後ろに書いても定義エラーにならない）

// createServerの処理
function getFromClient(req, res) {
  fs.readFile('./index.html', 'UTF-8', (error, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
}
