# High-Precision Responses with Genkit's Google Search Integration

## Introduction

With the release of Genkit version 0.5.9, it is now possible to leverage Google Search directly through Genkit. By using Google Search, Genkit can access the latest information, including niche details from specific domains, leading to more accurate responses.

This article explains how to set up Google Search integration for Genkit.

## Enabling Vertex AI

To use the Google Search feature, you need a Google Cloud project with Vertex AI enabled. Follow these steps to enable Vertex AI and link your local environment with Google Cloud:

1. In the Cloud console, Enable the Vertex AI API for your project.
2. Set environment variables:

```sh
export GCLOUD_PROJECT=<your project ID>
export GCLOUD_LOCATION=us-central1
```

3. Authenticate with gcloud:

```sh
gcloud auth application-default login
```

## Initializing a Genkit Project

Next, initialize your Genkit project. Make sure you are using Genkit version 0.5.9 or higher. Install Genkit and set up a new project using `Google Cloud Vertex AI` as the model provider.

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

## Enabling Google Search

To enable Google Search, simply add googleSearchRetrieval: {} to the config of the generate method. Update the prompt parameter to pass the input text directly.

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

## Run locally

Launch the Genkit Developer Tools with the following command:

```sh
% genkit start -o
```

Try asking about the current weather in Tokyo.

[Ask about Tokyo's weather using Genkit x Google Search - Flow]()

[View Trace for Tokyo's weather query - View Trace]()

A response will be returned. Clicking the "View Trace" button reveals that Google Search was used with the phrase weather in Tokyo today, and the response was generated based on the search results.

## Summary

Enabling Google Search integration in Genkit is as easy as adding one line of code. You can find the sample code on GitHub, so feel free to try it out.

https://github.com/tanabee/genkit-google-search-sample

## References

https://github.com/firebase/genkit/releases/tag/0.5.9

https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview

https://youtu.be/TjxJnQQCS_A?si=fCByVODvxFcCkWox