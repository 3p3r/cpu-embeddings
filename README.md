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

## Usage

### Basic Example

```typescript
import { embeddings } from 'cpu-embeddings';

const text = "Hello, world!";
const embedding = await embeddings(text);
console.log(embedding); // Array of 384 numbers
```

### Batch Processing

```typescript
import { embeddings } from 'cpu-embeddings';

const texts = ["Hello, world!", "How are you?", "Goodbye!"];
const embeddingsArray = await embeddings(texts);
console.log(embeddingsArray); // Flattened array of 384 * 3 = 1152 numbers
```

### Classification Example

```typescript
import { embeddings } from 'cpu-embeddings';

// Sample training data
const trainingTexts = [
  "I love this product",
  "This is amazing",
  "Great quality",
  "Terrible experience",
  "Worst purchase ever",
  "Awful service"
];
const trainingLabels = [1, 1, 1, 0, 0, 0]; // 1 = positive, 0 = negative

// Get embeddings for training data
const trainingEmbeddings = await embeddings(trainingTexts);

// Simple cosine similarity classifier
function classify(text: string): number {
  const testEmbedding = await embeddings(text);
  let bestSimilarity = -1;
  let bestLabel = 0;
  
  for (let i = 0; i < trainingEmbeddings.length / 384; i++) {
    const trainEmbedding = trainingEmbeddings.slice(i * 384, (i + 1) * 384);
    const similarity = cosineSimilarity(testEmbedding, trainEmbedding);
    if (similarity > bestSimilarity) {
      bestSimilarity = similarity;
      bestLabel = trainingLabels[i];
    }
  }
  
  return bestLabel;
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

// Usage
const result = await classify("This is fantastic!");
console.log(result); // 1 (positive)
```

## Implementation Details

This library uses the [Xenova Transformers](https://huggingface.co/docs/transformers.js/index) JavaScript library, which allows running transformer models directly in the browser or Node.js without Python dependencies. The implementation:

- Runs on CPU using ONNX Runtime WebAssembly backend
- Uses a quantized version of the `all-MiniLM-L6-v2` model for efficiency
- Applies mean pooling and L2 normalization to generate sentence embeddings
- Bundles the model files directly in the package for offline usage

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

## API Reference

### `embeddings(text: string | string[]): Promise<number[]>`

Generates embeddings for the given text(s).

- **Parameters**:
  - `text`: A single string or an array of strings to embed
- **Returns**: A promise that resolves to an array of numbers representing the embeddings. For a single string, returns 384 numbers. For an array of n strings, returns 384 * n numbers.

## License

MIT
