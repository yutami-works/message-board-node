// モジュールのロード
const http = require('node:http');
const fs = require('node:fs');
const ejs = require('ejs');

// サーバー情報定義
const hostname = '127.0.0.1';
const port = 3000;

// テンプレートロード
const indexPage = fs.readFileSync('./index.ejs', 'utf-8');

// アクセス時のコールバック関数
const getFromClient = (req, res) => {
  // テンプレートに値をレンダリング
  const content = ejs.render(indexPage, {
    title: 'indexページ',
    content: 'これはテンプレートのサンプルページです。'
  });

  // レスポンス
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(content);
  res.end();
}

// サーバー作成
const server = http.createServer(getFromClient);

// サーバー待ち受け
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});