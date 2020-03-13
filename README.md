# clasp-starter

## usage

```bash
$ git clone https://github.com/nokazn/clasp-starter
$ npm i
```

Apps Script プロジェクトを作成し、プロジェクトIDを`.clasp.json.scriptId`に設定する。
`rootDir`を`src/`配下にすることで、clasp が`node_modules`などを見にいかないようにしている。

```json
{
  "scriptId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "rootDir": "src/"
}
```

`./src/`ディレクトリ配下にスクリプトを書き、

```bash
$ clasp push
```

または

```
$ npm run push
```

として GAS にアップロードする。

## tips

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

こうすることで、TypeScript の型システムの恩恵を受けながらモジュール化を実現することができる。

## 参考

[google/clasp: 🔗 Command Line Apps Script Projects](https://github.com/google/clasp/)
