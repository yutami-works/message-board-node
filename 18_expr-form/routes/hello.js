const express = require('express');
const router = express.Router();

// ここには相対的なルーティングを書く（下は/hello/にアクセスした時の処理）
router.get('/', (req, res, next) => {
    var data = {
        title: 'Hello!',
        content: '※何か書いて送信してください。'
    };
    res.render('hello', data);
});

router.post('/post', (req, res, next) => {
    var msg = req.body['message'];
    var data = {
        title: 'Hello',
        content: `あなたは「${msg}」と送信しました。`
    };
    res.render('hello', data);
});

module.exports = router;