const http = require('http');
const fs = require('fs');
const ejs = require('ejs'); // npm install ejs
const url = require('url');

// ファイル
const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');

// サーバー情報
const hostname = '127.0.0.1'; // localhost
const port = 3000;

const server = http.createServer(getFromClient);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// ここまでメインプログラム========

// createServerの処理
function getFromClient(request, response) {
    var url_parse = url.parse(request.url);
    switch (url_parse.pathname) {

        case '/':
            var content = ejs.render(index_page, {
                title: "Index",
                content: "これはテンプレートを使ったサンプルページです。",
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(content);
            response.end();
            break;

        case '/other':
            var content = ejs.render(other_page, {
                title: "Other",
                content: "これは新しく用意したページです。",
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(content);
            response.end();
            break;

        default:
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end('no page...');
            break;
    }
}

