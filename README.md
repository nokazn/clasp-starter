# clasp-starter

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

## Usage

```bash
$ git clone https://github.com/nokazn/clasp-starter
# パッケージのインストール
$ npm i

# ログイン (~/.clasprc.json に認証情報が保存される)
$ npx clasp login
```

Apps Script プロジェクトを作成し、プロジェクト ID を`.clasp.json.scriptId`に設定する。
`rootDir`を`src/`配下にすることで、clasp が`node_modules`などを見にいかないようにしている。

```json
{
  "scriptId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "rootDir": "src/",
  "fileExtension": "ts"
}
```

`src/` ディレクトリ配下にスクリプトを書く。

push する前に、[設定 - Apps Script](https://script.google.com/home/usersettings) から Apps Script API を有効化しておく。

```bash
$ npx clasp push

# or

$ npm run push
```

を実行して GAS にアップロードする。

## Tips

### `Console`

GAS 側の `Console` と `node_modules/typescript/lib/lib.dom.d.ts` の `Console` の型宣言が二重にされていて、

```bash
$ tsc --noEmit **/*.ts

node_modules/@types/google-apps-script/google-apps-script.base.d.ts:517:13 - error TS2403: Subsequent variable declarations must have the same type.  Variable 'console' must be of type 'Console', but here has type 'console'.

517 declare var console: GoogleAppsScript.Base.console;
                ~~~~~~~

  node_modules/typescript/lib/lib.dom.d.ts:19729:13
    19729 declare var console: Console;
                      ~~~~~~~
    'console' was also declared here.
```

DOM のライブラリで宣言されている `Console` と重複して宣言してしまっているのが原因で、上記のように型チェックを行おうとするとエラーが発生する。

`tsconfig.json` 内で `target: es5` と指定し、`lib` オプションを指定しない場合、デフォルトで

- DOM
- ES5
- ScriptHost

のライブラリが読み込まれてしまう。

`DOM` ライブラリを読み込ませないために、`tsconfig.json` 内の `lib` オプションを変更し、`types` オプションで `@types/node` を読み込まないよう設定している。

```json

```

[参考](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/32585)

### モジュール

ESModules のノリで普通に`export`すると、GAS側では

```js
var exports = exports || {};
```

で定義されたグローバル変数`exports`に入れられてしまう。

GAS ではファイルごとのモジュールをでやり取りする仕組みがなく、ファイルのトップレベルのスコープがそのままグローバルスコープである。
そのため、単に`export hoge`とするだけでは、他のファイルで上書きされてしまう可能性がある。

ファイルごとにスコープを区切るためには、全体を`namespace`で囲めばよい。

```ts
// ./getYear.ts
export namespace getYear {
  export const handler = () => {
    const date = new Date();
    return date.getFullYear();
  };
}
```

```ts
// ./main.ts
import { getYear } from './getYear';

function main() {
  const year = getYear.handler();
  console.log(`This year is ${year}`);
}
```

上記のように書くと、TypeScript の型システムの恩恵を受けながらモジュール化を実現することができる。

## 参考

[google/clasp: 🔗 Command Line Apps Script Projects](https://github.com/google/clasp/)

## License

MIT
