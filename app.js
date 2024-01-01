// モジュールのロード
const http = require('node:http');
const fs = require('node:fs');
const ejs = require('ejs');
const url = require('node:url');

// サーバー情報定義
const hostname = '127.0.0.1';
const port = 3000;

// ファイル読み込み
const indexPage = fs.readFileSync('./index.ejs', 'utf-8');
const styleCss = fs.readFileSync('./style.css', 'utf-8');

// ルーティング関数（アクセスしてきたパスによって後続処理を分岐）
const appRouter = (req, res) => {
  // リクエストURLを解析
  const urlParts = new URL(req.url, `http://${req.headers.host}`); // url.parse()はレガシー
  const path = urlParts.pathname;

  // パスで分岐
  switch (path) {
    case '/':
      // テンプレートに値をレンダリング
      const content = ejs.render(indexPage, {
        title: 'indexページ',
        content: 'これはテンプレートのサンプルページです。'
      });

      // レスポンス
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end();
      break;

    case '/style.css':
      // CSSも静的ファイルのルーティングが必要
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(styleCss);
      res.end();
      break;

    default:
      // 全てのケースに合致しなければ存在しないパスという判定
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('no page...');
      break;
  }
}

// サーバー作成
const server = http.createServer(appRouter);

// サーバー待ち受け
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});