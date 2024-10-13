# Genkit の Google Search 対応で、より高精度のレスポンスを生成できるようになった

## はじめに

Genkit の version 0.5.9 で Genkit から Google 検索の利用が可能になりました。Google 検索を用いることで最新の情報や特定分野のニッチな情報にもアクセスできるようになり、より高精度なレスポンスが可能になります。

以下にその導入方法を説明します。

## Vertex AI の有効化

Google 検索機能を利用するためには Vertex AI が有効化された Google Cloud プロジェクトが必要です。以下の手順で Vertex AI の有効化とローカル環境と Google Cloud との紐づけを行います。

1. In the Cloud console, [Enable the Vertex AI API](https://console.cloud.google.com/apis/library/aiplatform.googleapis.com?project=_) for your project.
2. 環境変数の設定

```sh
export GCLOUD_PROJECT=<your project ID>
export GCLOUD_LOCATION=us-central1
```

3. gcloud ログイン

```sh
gcloud auth application-default login
```

## Genkit プロジェクトの初期化

まず、Genkit プロジェクトの初期化を行います。Genkit のバージョンを 0.5.9 以上にする必要があるので、genkit のインストールから行います。Google 検索は Vertex AI の機能を用いるので `model provider` として `Google Cloud Vertext AI` を選択します。

```sh
% npm i -g genkit
% mkdir genkit-google-search-sample
% cd genkit-google-search-sample

% genkit init 
? Select a runtime to initialize a Genkit project: Node.js
? Select a model provider: Google Cloud Vertex AI
? Would you like to generate a sample flow? (Y/n) Y
? Would you like to generate a sample flow? Yes
✔ Successfully generated sample file (src/index.ts)
Run the following command to enable Vertex AI in your Google Cloud project:

  gcloud services enable aiplatform.googleapis.com

Genkit successfully initialized.
```

## Google 検索の有効化

generate メソッドの config に `googleSearchRetrieval: {}` を足すだけで有効化できます。合わせて `prompt` は入力テキストをそのまま渡すように変更します。

```typescript
const llmResponse = await generate({
  model: gemini15Flash,
  prompt,
  config: {
    temperature: 1,
    googleSearchRetrieval: {}, // Add this line
  },
});
```

## 挙動の確認

以下を実行して Genkit Developer Tools を起動します。

```
% genkit start -o
```

現在の東京の天気について聞いてみましょう。

[Genkit x Google 検索で東京の天気について質問する - Flow]()

[Genkit x Google 検索で東京の天気について質問する - View Trace]()

レスポンスが返ってきました。 View Trace ボタンをクリックしてレスポンスを見てみると `weather in Tokyo today` という言葉で Google 検索が行われ、検索結果を用いて回答が生成されたことが分かります。

## まとめ

1 行追加するだけで簡単に Google 検索を試すことができました。サンプルコードは以下の GitHub にあげていますので、みなさんも是非試してみてください。

https://github.com/tanabee/genkit-google-search-sample

## 参考リンク

https://github.com/firebase/genkit/releases/tag/0.5.9

https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview

https://youtu.be/TjxJnQQCS_A?si=fCByVODvxFcCkWox
