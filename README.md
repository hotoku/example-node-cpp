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

Choose a template は、

- Hello World
- Object Wrap

の 2 種類の選択肢がある。Hello World を選ぶと関数を export する例、Object Wrap を選ぶとクラスを export する例が得られる。
