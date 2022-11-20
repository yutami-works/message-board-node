const http = require('http');
const fs = require('fs');
const ejs = require('ejs'); // npm install ejs
const url = require('url');
const qs = require('querystring');

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

    var url_parse = url.parse(request.url, true);

    switch (url_parse.pathname) {

        case '/':
            response_index(request, response);
            break;

        case '/other':
            response_other(request, response);
            break;

        default:
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end('no page...');
            break;
    }
}

// アプリケーション変数
var data = {
    msg: 'no message...'
};

// indexのアクセス処理
function response_index(request, response) {
    // POSTアクセス時の処理
    if (request.method == 'POST') {
        var body = '';

        // データ受信イベント処理
        request.on('data', (data) => {
            body += data;
        });

        // データ受信終了のイベント処理
        request.on('end', () => {
            data = qs.parse(body);
            write_index(request, response);
        });
    } else {
        write_index(request, response);
    }
}

// indexの表示の作成
function write_index(request, response) {
    var msg = "※伝言を表示します。"
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data: data
    });
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(content);
    response.end();
}

var data2 = {
    'Taro': ['taro@yamada', '09-999-999', 'Tokyo'],
    'Hanako': ['hanako@flower', '080-888-888', 'Tokyo'],
    'Sachiko': ['sachi@happy', '070-777-777', 'Tokyo'],
    'Ichiro': ['ichi@baseball', '060-666-666', 'Tokyo']
};

// otherのアクセス処理
function response_other(request, response) {
    var msg = "これはOtherページです。";
    var content = ejs.render(other_page, {
        title: "Other",
        content: msg,
        data: data2,
        filename: 'data_item'
    });
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(content);
    response.end();
}
