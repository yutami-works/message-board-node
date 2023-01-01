const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

// 同期で読み込み
const index_page = fs.readFileSync('./index.ejs', 'utf8');

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
  // ejsをHTMLにレンダリング
  var content = ejs.render(index_page, {
    title: "Indexページ",
    message: "これはテンプレートを使ったサンプルページです。",
  });
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(content);
  res.end();
}
