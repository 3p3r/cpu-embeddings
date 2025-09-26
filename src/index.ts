import { pipeline, env } from "@xenova/transformers";

export interface EmbeddingsOptions {
  readonly modelName?: string;
  readonly modelPath?: string;
  readonly numThreads?: number;
}

export const DefaultEmbeddingsOptions: Required<EmbeddingsOptions> = {
  modelName: "Xenova/all-MiniLM-L6-v2",
  modelPath: "models",
  numThreads: 1,
};

export async function embeddings(
  text: string | string[],
  opts = DefaultEmbeddingsOptions,
): Promise<number[]> {
  const options = { ...DefaultEmbeddingsOptions, ...opts };
  env.localModelPath = options.modelPath;
  env.allowRemoteModels = false;
  env.backends.onnx.wasm.numThreads = options.numThreads;
  const input = Array.isArray(text) ? text : [text];
  // todo: make this webpack friendly so it gets included in the bundle
  const embedder = await pipeline("feature-extraction", options.modelName, {
    quantized: true,
    local_files_only: true,
  });
  const output = await embedder(input, { pooling: "mean", normalize: true });
  return output.data as number[];
}

export default embeddings;
