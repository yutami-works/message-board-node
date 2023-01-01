# グローバルにインストールしたexpress-generatorでアプリケーション構築
王道の方法

#### 1.express-generatorをグローバルにインストール
```shell
$ npm install -g express-generator
```

#### 2.アプリケーションフォルダの作成
```shell
$ express --view=ejs <アプリケーション名>
```

#### 3.アプリケーションのフォルダに移動
```shell
$ cd <2で作成したフォルダ>
```

#### 4.パッケージのインストール（package.jsonから読み込み）
```shell
$ npm install
```

#### 5.アプリケーションの実行
```shell
$ npm start
```
または
```shell
$ node bin\www
```