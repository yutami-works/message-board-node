// モジュールのロード
const http = require('node:http');
const fs = require('node:fs');
const ejs = require('ejs');

// サーバー情報定義
const hostname = '127.0.0.1';
const port = 3000;

// ファイル読み込み
const indexPage = fs.readFileSync('./index.ejs', 'utf-8');
const otherPage = fs.readFileSync('./other.ejs', 'utf-8');
const styleCss = fs.readFileSync('./style.css', 'utf-8');

// コールバック関数（サーバーにアクセスした際に返されるメインアプリ）
const appCallback = (req, res) => {
  // リクエストURLを解析
  const urlParts = new URL(req.url, `http://${req.headers.host}`); // url.parse()はレガシー
  const path = urlParts.pathname;

  // クエリパラメータを取得
  const query = urlParts.searchParams;

  // 画面生成用変数
  let content = '';

  // パスでルーティング
  switch (path) {
    case '/':
      // デフォルトのコンテンツを定義
      content = 'これはIndexページです。';

      // クエリのmsgがある場合はコンテンツに追加
      const msg = query.get('msg');
      if (msg != undefined) {
        content += `あなたは「${msg}」と送りました。`;
      }

      // テンプレートに値をレンダリング
      content = ejs.render(indexPage, {
        title: 'Index',
        content: content
      });

      // レスポンス
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end();
      break;

    case '/other':
      content = ejs.render(otherPage, {
        title: 'Other',
        content: 'これはOtherページです。'
      });

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end();
      break;

    // CSSも静的ファイルのルーティングが必要
    case '/style.css':
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(styleCss);
      res.end();
      break;

    // 全てのケースに合致しなければ存在しないパスという判定
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('no page...');
      break;
  }
}

// サーバー作成
const server = http.createServer(appCallback);

// サーバー待ち受け
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});