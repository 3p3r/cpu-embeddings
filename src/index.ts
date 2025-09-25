import { pipeline, env } from "@xenova/transformers";

export async function embeddings(text: string | string[]) {
  env.backends.onnx.wasm.numThreads = 1;
  const input = Array.isArray(text) ? text : [text];
  // todo: make this webpack friendly so it gets included in the bundle
  const embedder = await pipeline(
    "feature-extraction",
    "../../../../src/models/Xenova/all-MiniLM-L6-v2",
    { quantized: true, local_files_only: true },
  );
  const output = await embedder(input, { pooling: "mean", normalize: true });
  return output.data as number[];
}

export default embeddings;
