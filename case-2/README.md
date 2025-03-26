# case-2

TypeScript と Chai / Mocha による単体テスト。

ポイント

- `lib/binding.js`で、ネイティブモジュールを`require`する。さらに、必要なオブジェクトを `module.exports` に登録する。
- `lib/binding.d.ts`で、型を提供する。`module.exports`に登録されているオブジェクトを`export`する。
