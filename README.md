# cpu-embeddings

Embeddings generated on CPU for lightweight classification tasks using the Xenova Transformers library.

## Features

- **CPU-based**: Runs entirely on CPU without requiring GPU acceleration.
- **Embedded Model**: Includes a pre-trained quantized ONNX model (`all-MiniLM-L6-v2`) bundled with the package for convenience.
- **Lightweight**: Optimized for small-scale classification tasks.
- **TypeScript Support**: Fully typed for better development experience.

## Installation

```bash
npm install cpu-embeddings
```

## API Reference

### `EmbeddingsOptions`

Interface for embedding options.

- `modelName?: string` - Model name (default: "Xenova/all-MiniLM-L6-v2")
- `modelPath?: string` - Local model path (default: "models")
- `numThreads?: number` - Number of threads for ONNX (default: 1)

### `embeddings(text: string | string[], opts?: EmbeddingsOptions): Promise<number[]>`

Generates embeddings for the given text(s).

- **Parameters**:
  - `text`: A single string or an array of strings to embed
  - `opts`: Optional embedding options
- **Returns**: A promise that resolves to an array of numbers representing the embeddings. For a single string, returns 384 numbers. For an array of n strings, returns 384 * n numbers.

## Implementation Details

Uses the [Xenova Transformers](https://huggingface.co/docs/transformers.js/index) library to run transformer models in Node.js without Python. Runs on CPU with ONNX Runtime WebAssembly, using a quantized `all-MiniLM-L6-v2` model with mean pooling and L2 normalization. Model files are bundled for offline use.

## Useful Commands

### Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the library
npm run build

# Format code
npm run format

# Start development server
npm run dev
```

### Release

```bash
# Patch release
npm run release:patch

# Minor release
npm run release:minor

# Major release
npm run release:major
```

## License

MIT
