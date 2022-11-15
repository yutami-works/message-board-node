const http = require('http');
const fs = require('fs');
const ejs = require('ejs'); // npm install ejs
const url = require('url');

// ファイル
const index_page = fs.readFileSync('./index.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

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
                title: "Indexページ",
                content: "これはテンプレートを使ったサンプルページです。",
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(content);
            response.end();
            break;

        case '/style.css':
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(style_css);
            response.end();
            break;

        default:
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.end('no page...');
            break;
    }
}

