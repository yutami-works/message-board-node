// モジュールのロード
const http = require('node:http');
const fs = require('node:fs');

// サーバー情報定義
const hostname = '127.0.0.1';
const port = 3000;

// サーバー作成（アクセス時の処理をコールバック関数として渡しておく）
const server = http.createServer((req, res) => {
  fs.readFile('./index.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// サーバー待ち受け
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});