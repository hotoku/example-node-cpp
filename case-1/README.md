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

## 実装の詳細 クラスを登録する場合

以下、Object Wrap を選択した場合に yeoman が生成するコードから一部を抜粋したものである。

```cpp
Napi::Function ExampleNodeCpp::GetClass(Napi::Env env) {
  return DefineClass(env, "ExampleNodeCpp",
                     {
                         ExampleNodeCpp::InstanceMethod("greet", &ExampleNodeCpp::Greet),
                     });
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  Napi::String name = Napi::String::New(env, "ExampleNodeCpp");
  exports.Set(name, ExampleNodeCpp::GetClass(env));
  return exports;
}

NODE_API_MODULE(addon, Init)
```

このコードの概要を以下に説明する。※ コードが呼び出される順番に解説するので、上記のソースコードの下から見ていくことになる。

`NODE_API_MODULE`は node-addon-api が提供するマクロ。実態として、ユーザーとしてこのライブラリを使う限りにおいては、この部分はおまじないとして、常に、この文字列を書くものと思っておけば良いだろう。
注意点として、`addon`は、マクロに渡され、展開された先のどこかで使われるソースコード上の文字列（C++としての文字列ではない、ので`"`で囲まれていない）でしかなく、この.cc ファイル上の変数名などでもない。

`Init`は、初期化処理を行う関数である。ここでは、

1. `Napi::Env env`と`Napi::Object exports`という JS の世界のオブジェクトを 2 つ引数として受け取っている
2. `name`という名前で`Napi::String`型の値を作成。このとき、引数の`env`を利用している。node-addon-api において、C++から JS 側のオブジェクトを作るときに、`Env`型を渡すのは、典型的なコードと思われる
3. `exports.Set`関数を呼び出し、先ほどの`name`文字列と`ExampleNodeCpp::GetClass`の呼び出し結果のペアを登録している。これによって、JS の世界のオブジェクト`exports`の属性として"ExampleNodeCpp"という名前で`GetClass`の返り値が登録されていると思われる
4. `ExampleNodeCpp`はユーザーが定義する C++のクラスで、`GetClass`は、その static メソッドである。ここでは、最初に`InstanceMethod`が呼ばれている。これは、`ExampleNodeCpp`の親クラスから継承しているメソッドである。
   これを、さらに、`DefineClass`に渡している。ここの書き方も、ほぼイディオムとみなして良いだろう

## 実装の詳細 関数を登録する場合

以下は、テンプレートとして Hello World を選択した場合に yeoman が生成するコードの抜粋である。

```cpp
Napi::String Method(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, "world");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "ExampleNodeCpp"),
              Napi::Function::New(env, Method));
  return exports;
}

NODE_API_MODULE(addon, Init)
```

クラスを登録する場合と同様に、`Init`という関数で`exports`オブジェクトを受け取り、`Set`メソッドに名前と関数の実態を渡している。クラスの場合とほぼ変わらない手続きである。
