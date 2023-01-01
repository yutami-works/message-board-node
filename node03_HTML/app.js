const http = require('http');

const hostname = '127.0.0.1'; // localhost
const port = 3000;

const server = http.createServer((req, res) => {
  // ヘッダーの項目を設定
  res.setHeader('Content-Type', 'text/html');
  // HTML出力
  res.write('<!DOCTYPE html><html lang="ja">');
  res.write('<head><meta charset="utf-8">');
  res.write('<title>Hello</title></head>');
  res.write('<body><h1>Hello Node.js!</h1>');
  res.write('<p>This is Node.js sample page.</p>');
  res.write('<p>これは、Node.jsのサンプルページです。</p>', 'utf8');
  res.write('</body></html>');
  // おわり
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});