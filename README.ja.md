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

まず、Genkit プロジェクトの初期化を行います。

```sh
% npm init -y
% npm i -D genkit-cli
% npm i genkit @genkit-ai/googleai @genkit-ai/vertexai
% mkdir src && touch src/index.ts
```

以下の初期設定のコードを `src/index.ts` に貼り付けます。

```typescript
import { genkit, z } from 'genkit';
import { vertexAI } from '@genkit-ai/vertexai';
import { gemini15Flash } from '@genkit-ai/vertexai';

const ai = genkit({
  model: gemini15Flash,
  plugins: [vertexAI({ location: 'us-central1' })],
});

export const mainFlow = ai.defineFlow(
  {
    name: 'mainFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const { text } = await ai.generate(prompt);
    return text;
  }
);

ai.startFlowServer({ flows: [mainFlow] });
```

## Google 検索の有効化

Google Search を有効化するには、以下のコードのように gemini15Flash モデルに対して withConfig で googleSearchRetrieval を指定します。

```typescript
const ai = genkit({
  model: gemini15Flash.withConfig({ googleSearchRetrieval: {}}),
  plugins: [vertexAI({ location: 'us-central1' })],
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
