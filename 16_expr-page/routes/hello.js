const express = require('express');
const router = express.Router();

// ここには相対的なルーティングを書く（下は/hello/にアクセスした時の処理）
router.get('/', (req, res, next) => {
    var data = {
        title:'Hello!',
        content:'これは、サンプルのコンテンツです。<br>this is sample content.'
    };
    res.render('hello', data);
});

module.exports = router;