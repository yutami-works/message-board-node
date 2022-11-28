# NodeJS_sample

Node.jsのWebアプリケーションサンプル

※解説コメントや不要な処理の削除は随時

## express-generatorによるアプリケーション構築
#### 1.アプリケーションフォルダの作成
```shell
$ express --view=ejs <アプリケーション名>
```

#### 2.アプリケーションのフォルダに移動
```shell
$ cd <1で作成したフォルダ>
```

#### 3.パッケージのインストール（package.jsonから読み込み）
```shell
$ npm install
```

#### 4.アプリケーションの実行
```shell
$ node bin\www
```
または
```shell
$ npm start
```

## 手動でexpressアプリケーションを構築する
#### 1.アプリケーションフォルダの作成
```shell
$ mkdir <アプリケーション名>
```

#### 2.アプリケーションのフォルダに移動
```shell
$ cd <1で作成したフォルダ>
```

#### 3.npmの初期化（とりあえず質問は全部Enter）
```shell
$ npm init
```

#### 4.アプリケーションの実行
index.jsを作成した後
```shell
$ node index.js
```