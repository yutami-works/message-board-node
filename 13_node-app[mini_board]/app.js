const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

// ページファイル
const index_page = fs.readFileSync('./index.ejs', 'utf8');
const login_page = fs.readFileSync('./login.ejs', 'utf8');

// サーバー情報
const hostname = '127.0.0.1'; // localhost
const port = 3000;

// コンフィグ
const max_num = 10; // 最大保管数
const filename = 'mydata.txt' // データファイル
var message_data; // データ
readFromFile(filename);

const server = http.createServer(getFromClient);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// ここまでメインプログラム========

// createServerの処理
function getFromClient(request, response) {

    var url_parse = url.parse(request.url, true);

    switch (url_parse.pathname) {

        case '/': // トップページ（メッセージボード）
            response_index(request, response);
            break;

        case '/login': // ログインページ
            response_login(request, response);
            break;

        default:
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end('no page...');
            break;
    }
}

// loginのアクセス処理
function response_login(request, response) {
    var content = ejs.render(login_page, {});
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(content);
    response.end();
}

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
            addToData(data.id, data.msg, filename, request);
            write_index(request, response);
        });
    } else {
        write_index(request, response);
    }
}

// indexページの作成
function write_index(request, response) {
    var msg = "※何かメッセージを書いてください。";
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data: message_data,
        filename: 'data_item'
    });
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(content);
    response.end();
}

// テキストファイルをダウンロード
function readFromFile(fname) {
    fs.readFile(fname, 'utf8', (err, data) => {
        message_data = data.split('\n');
    });
}

// データを更新
function addToData(id, msg, fname, request) {
    var obj = {
        'id': id,
        'msg': msg
    };
    var obj_str = JSON.stringify(obj);
    console.log('add data:' + obj_str);
    message_data.unshift(obj_str);
    if (message_data.length > max_num) {
        message_data.pop();
    }
    saveToFile(fname);
}

// データを保存
function saveToFile(fname) {
    var data_str = message_data.join('\n');
    fs.writeFile(fname, data_str, (err) => {
        if (err) {throw err;}
    });
}
