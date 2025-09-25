import { describe, test, expect } from "vitest";
import { embeddings } from "./index";

describe("embeddings", () => {
  describe("sanity checks", () => {
    test("should pass basic sanity test", () => {
      expect(true).toBe(true);
      expect(1 + 1).toBe(2);
      expect("hello").toBe("hello");
    });
  });

  describe("functionality", () => {
    test("should return a 768 element array for 2 input sentences", async () => {
      const result = await embeddings(["Hello, world!", "How are you?"]);
      expect(result.length).toBe(768);
    });

    test("should return a 1x384 matrix for a single input sentence", async () => {
      const result = await embeddings("Hello, world!");
      expect(result.length).toBe(384);
    });

    test("should return different embeddings for different sentences", async () => {
      const result1 = await embeddings("Hello, world!");
      const result2 = await embeddings("How are you?");
      expect(result1).not.toEqual(result2);
    });

    test("should return similar embeddings for similar sentences", async () => {
      const result1 = await embeddings("Hello, world!");
      const result2 = await embeddings("Hello, everyone!");
      // Compute cosine similarity
      const dotProduct = result1.reduce(
        (sum, val, i) => sum + val * result2[i],
        0,
      );
      const magnitude1 = Math.sqrt(
        result1.reduce((sum, val) => sum + val * val, 0),
      );
      const magnitude2 = Math.sqrt(
        result2.reduce((sum, val) => sum + val * val, 0),
      );
      const cosineSimilarity = dotProduct / (magnitude1 * magnitude2);
      expect(cosineSimilarity).toBeGreaterThan(0.5); // Similar sentences should have high cosine similarity
    });
  });
});
