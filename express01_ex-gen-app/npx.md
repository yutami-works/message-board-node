# npxでアプリケーション構築（express-generatorをグローバルにインストールしない）
npxという一時的にモジュールを使用する時に使うコマンド

#### 1.アプリケーションフォルダの作成（ワンライナーでいける）
```shell
$ npx express-generator --view=ejs <アプリケーション名>
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
$ npm start
```
または
```shell
$ node bin\www
```