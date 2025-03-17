# example-node-cpp

Node.js のアドオンパッケージを C++で実装する方法のメモ。

（おおざっぱな）方針

- パッケージには typescript で型を付ける
- node-addon-api を使う
- class を export する方法、関数を export する方法の両者を調べる

## scaffold

yeoman というツールで、パッケージのスケルトンを作成することができる。
Node-API 用のパッケージを作成するためには、generator-napi-module が必要なので、これらをインストールする。

```shell
sudo npm install -g yo generator-napi-module
```

パッケージ開発用のフォルダを作り、その中で yo コマンドを実行する。

```shell
mkdir example-node-cpp
cd $_
yo napi-module
```

対話的に、以下のような項目を聞かれる。

```shell
package name: (example-node-cpp)
version: (1.0.0)
description:
git repository:
keywords:
author:
license: (ISC)
```

これらの選択肢は、デフォルトのままで良い。これらに答えると、package.json が作られる。さらに、以下の 2 つを聞かれるので、コメント(`#`)の右側に記載の選択肢を選ぶ。

```shell
? Choose a template # Object Wrap
? Would you like to generate TypeScript wrappers for your module? # Yes
```

Choose a template に対しては、以下の 2 種類の選択肢が用意されている。

- Hello World: 関数を export する例が作成される
- Object Wrap: クラスを export する例が作成される

## コードツリーの構造、ビルド、テスト

yo によって、以下のようなツリーが生成される。

```shell
$ tree --gitignore
.
├── README.md
├── binding.gyp
├── lib
│   └── binding.ts
├── package-lock.json
├── package.json
├── src
│   ├── example_node_cpp.cc
│   └── example_node_cpp.h
├── test
│   └── test_binding.js
└── tsconfig.json

3 directories, 9 files
```

- src 以下に、c++のコード
- lib 以下に、ts のコード
- test 以下に、js のテストコード

が入っている。パッケージをビルドするには、以下を実行する。

```shell
npm i
```

このとき、node-gyp というパッケージを使って c++のコードがビルドされる。
node-gyp の設定は binding.gyp ファイルに書かれている。
c++プログラムのビルドに関する設定を変更する必要があるときには、これを編集する。

node-gyp は、gyp というツールのラッパーなので、場合によっては gyp のマニュアルを見る必要がある。
また、gyp は Python で書かれているので、python の実行環境が必要となる。

以下のコマンドにより、テストが実行される。

```shell
npm test
```

これが正常終了すれば、OK。
