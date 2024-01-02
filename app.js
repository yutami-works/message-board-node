// モジュールのロード
const http = require('node:http');
const fs = require('node:fs');
const querystring = require('node:querystring');
const ejs = require('ejs');

// サーバー情報定義
const hostname = '127.0.0.1';
const port = 3000;

// ファイル読み込み
const indexPage = fs.readFileSync('./index.ejs', 'utf-8');
const otherPage = fs.readFileSync('./other.ejs', 'utf-8');
const styleCss = fs.readFileSync('./style.css', 'utf-8');

/* indexアクセス時の処理関数 */
const responseIndex = (req, res) => {
  const msg = 'これはIndexページです。';

  // コンテンツレンダリング
  const content = ejs.render(indexPage, {
    title: 'Index',
    content: msg
  });

  // レスポンス
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(content);
  res.end();
}

/* otherアクセス時の処理関数 */
const responseOther = (req, res) => {
  let msg = 'これはOtherページです。';

  // POSTアクセス時の処理
  if (req.method == 'POST') {
    let body = '';

    // データ受信のイベント処理
    req.on('data', (data) => {
      body += data;
    });

    // データ受信終了のイベント処理
    req.on('end', () => {
      // データのパース
      const postData = querystring.parse(body);
      msg += `あなたは「${postData.msg}」と書きました。`;

      const content = ejs.render(otherPage, {
        title: 'Other',
        content: msg
      });

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end();
    });
  } else {
    // GETアクセス時の処理
    const msg = 'ページがありません。';
    const content = ejs.render(otherPage, {
      title: 'Other',
      content: msg
    });

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(content);
    res.end();
  }
}

/* ルーティング関数（サーバーにアクセスした際に返されるコールバック関数）*/
const appRouter = (req, res) => {
  // リクエストURLを解析
  const urlParts = new URL(req.url, `http://${req.headers.host}`); // url.parse()はレガシー
  const path = urlParts.pathname;
  //const query = urlParts.searchParams; // クエリパラメータを取得する場合

  // パスでルーティング
  switch (path) {
    case '/':
      responseIndex(req, res);
      break;

    case '/other':
      responseOther(req, res);
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
const server = http.createServer(appRouter);

// サーバー待ち受け
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});