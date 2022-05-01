---
title: 'Nextをはじめてやってみた、ビルド環境と詰まったところについて'
date: '2022-04-29'
---

ということで、Nuxt2 を長いこと書いてきた人が、はじめて Next を使ってみました。
Nuxt2 のときは行き当たりばったりでやっていきましたが、まずはチュートリアルからやるのが
お作法かなと思ったので、今回は[公式サイト通りのチュートリアル](https://nextjs.org/learn/foundations/about-nextjs)をやってみました。

まぁチュートリアル通りといっても、
JS でやるのはナシだろうと思って TS でやろうとして結構時間かかったんですが。

今回用意したのは下記の通りです。
(上から依存度合いが高い順)

- Node.js v14.17.2
- Yarn 1.22.4
- Next.js 12.1.5
- TypeScript 4.6.3
- ESLint 8.13.0
- Prettier 2.6.2
- Material-UI(入れただけ)
- Storybook(入れただけ)

そして参考にした記事は下記の通りです。
(上から参考にした度合いが高い順)

- [Next.js 公式チュートリアル](https://nextjs.org/learn/)
- [【2022 年】Next.js + TypeScript + ESLint + Prettier の構成でサクッと環境構築する](https://zenn.dev/hungry_goat/articles/b7ea123eeaaa44)
- [【入門】create-next-app で Next.js と TypeScript 環境を構築](https://mo-gu-mo-gu.com/create-next-app-typescript/)
- [【完全版】React / Next.js で Material-UI を使う (w/ TypeScript)](https://qiita.com/tmgauss/items/07d04d78c6df59ba2fb6)
- [React UI フレームワークのトレンド比較](https://qiita.com/yudwig/items/8d8c29467ceb76a91be9)
- [Next.js + TypeScript を簡単に環境構築（入門）](https://qiita.com/dosukoi_man/items/8324a5a712fd36a758f4)
- [Next.js の\_app.tsx を TypeScript で書く](https://qiita.com/S_watana/items/8b6c550f45d8a8fe701e)
- [Next.js + TypeScript 環境構築 v12.1](https://zenn.dev/rabbit/articles/d7175e62dc56a5)
- [Next.js と Stripe ではじめるシンプルな EC サイト開発ワークショップ](https://zenn.dev/stripe/books/stripe-nextjs-use-shopping-cart)

基本的に上記のように資料はいっぱいあります、その分どれを参考にしたものか困ったりします。

今回はとりあえず、[Next+TS+ESLint+Prettier](https://zenn.dev/hungry_goat/articles/b7ea123eeaaa44) を主に参考に環境を設定して、
実際ページを作っていくのは、[Next.js 公式チュートリアル](https://nextjs.org/learn/)を 1 つずつググりながら TS で書いた感じです。

特にめちゃくちゃ引っかかることはなかったのですが、[ある 1 ページ](https://nextjs.org/learn/basics/data-fetching/implement-getstaticprops)だけ公式チュートリアル通りに書くと
TS が Error を吐く部分があり困ったので、その解決策だけ載せておきます。

下記がその詰まったコードになります<br />

```
<li className={utilStyles.listItem} key={id}>
    {title}
    <br />
    {id}
    <br />
    {date}
</li>
```

この通りに書くと
[This JSX tag's 'children' prop expects a single child of type 'Element | undefined', but multiple children were provided](https://stackoverflow.com/questions/62382324/react-typescript-this-jsx-tags-children-prop-expects-a-single-child-of-type)のような警告を TS にいわれてしまうんですよね。

ビルドが成功するのですが TS に怒られるのはモヤる、ということで解決策を 1 時間ほど探したり
いつもの LINE グループで訊いてみたりしたところ
li 要素の中には、そもそも HTML 的には 1 要素しか入れてはいけないというのが仕様らしく
その書き方に沿ってないこのチュートリアル自体が悪いということでした。

んで、どう対応するかというと <> と </> というタグを使って、空要素を作って回避しました。

```
<li className={utilStyles.listItem} key={id}>
    <>
        {title}
        <br />
        {id}
        <br />
        {date}
    </>
</li>
```

まぁ、もっとやりようはありそうですが、今後 `This JSX tag's 'children' prop expects a single child` みたいなエラー出されたらこんな対応をしましょう。

以上で Next チュートリアル終わり、次はちゃんとした Web アプリ作ります。
