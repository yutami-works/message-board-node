# ローカルのexpress-generatorよるアプリケーション構築
モジュールとして別フォルダにインストールしたものを使う（かなり特殊）

#### 1.express-generator用の一時フォルダを作成
```shell
$ mkdir generator
```

#### 2.一時フォルダに移動
```shell
$ cd generator
```

#### 3.一時フォルダにexpress-generatorをインストール
```shell
$ npm install express-generator
```

#### 4.一時フォルダから、元の階層にアプリケーションフォルダを作成
```shell
$ ./node_modules/.bin/express --view=ejs　../<アプリケーション名>
```

#### 5.元の階層に戻る
```shell
$ cd ..
```

#### 6.一時フォルダを削除
```shell
$ rm -rf generator
```

#### 7.アプリケーションのフォルダに移動
```shell
$ cd <4で作成したフォルダ>
```

#### 8.パッケージのインストール（package.jsonから読み込み）
```shell
$ npm install
```

#### 9.アプリケーションの実行
```shell
$ npm start
```
または
```shell
$ node bin\www
```