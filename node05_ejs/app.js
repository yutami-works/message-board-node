const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

// ファイル
const index_page = fs.readFileSync('./index.ejs', 'utf8')

// サーバー情報
const hostname = '127.0.0.1'; // localhost
const port = 3000;

// createServerの処理
function getFromClient(request, response) {
  var content = ejs.render(index_page, {
    title: "Indexページ",
    message: "これはテンプレートを使ったサンプルページです。",
  });
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(content);
  response.end();
}

const server = http.createServer(getFromClient);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
