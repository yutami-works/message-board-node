const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

// 同期でファイルを読み込む
const index_page = fs.readFileSync('./index.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

// サーバー情報
const hostname = '127.0.0.1'; // localhost
const port = 3000;

const server = http.createServer(getFromClient);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// 関数宣言（アローと違って後ろに書いても定義エラーにならない）

// createServerの処理
function getFromClient(req, res) {
  // URLをパース
  var url_parse = url.parse(req.url);

  // パスで分岐
  switch (url_parse.pathname) {

    case '/':
      var content = ejs.render(index_page, {
        title: "Indexページ",
        content: "これはテンプレートを使ったサンプルページです。",
      });
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end();
      break;

    // CSSを読み込む場合もパスの定義が必要
    case '/style.css':
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(style_css);
      res.end();
      break;

    default:
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('no page...');
      break;
  }
}

