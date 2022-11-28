# NodeJS_sample

Node.jsのWebアプリケーションサンプル

※解説コメントや不要な処理の削除は随時

## express-generatorによるアプリケーション構築
#### 1.アプリケーションフォルダの作成
```shell
$ express --view=ejs <アプリケーション名>
```

#### 2.パッケージのインストール（package.jsonから読み込み）
```shell
$ npm install
```

#### 3.アプリケーションの実行
```shell
$ node bin\www
```
または
```shell
$ npm start
```