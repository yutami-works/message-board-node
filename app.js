// モジュールのロード
const http = require('node:http');
const fs = require('node:fs');

// サーバー情報定義
const hostname = '127.0.0.1';
const port = 3000;

// アクセス時のコールバック関数
const getFromClient = (req, res) => {
  fs.readFile('./index.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}

// サーバー作成
const server = http.createServer(getFromClient);

// サーバー待ち受け
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});