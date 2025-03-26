# example-node-cpp

C++で node のパッケージを作る方法のサンプル

- case-1: yeoman で scaffold した結果を、ほぼ、そのまま
- case-2: TypeScript + Chai/Mocha によるテスト
- case-3: CMake.js でビルド

## メモ

確認したいこと

- string 以外の型の受け渡し: int, double, bool
- 配列の受け渡し
- gyp
  - gyp で外部リンクをする方法
- cmake-js でのビルド[link][cmake-js]
  - cmake-js で外部ライブラリをリンクできるか
- 例外の扱い: C++内の例外と、node の世界に投げる例外
- 型の不一致があった場合に、何が起こるか

[cmake-js]: https://github.com/nodejs/node-addon-api/blob/main/doc/cmake-js.md
