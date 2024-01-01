// モジュールのロード
const http = require('node:http');

// サーバー情報定義
const hostname = '127.0.0.1';
const port = 3000;

// サーバー作成（アクセス時の処理をコールバック関数として渡しておく）
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

// サーバー待ち受け
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});