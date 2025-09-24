import { CPUEmbeddings } from "./index";

describe("CPUEmbeddings", () => {
  let embeddings: CPUEmbeddings;

  beforeEach(() => {
    embeddings = new CPUEmbeddings();
  });

  describe("initialization", () => {
    it("should create an instance", () => {
      expect(embeddings).toBeDefined();
      expect(embeddings).toBeInstanceOf(CPUEmbeddings);
    });

    it("should start uninitialized", () => {
      expect(embeddings.isInitialized()).toBe(false);
    });

    it("should initialize correctly", () => {
      embeddings.initialize();
      expect(embeddings.isInitialized()).toBe(true);
    });
  });

  describe("embedding generation", () => {
    beforeEach(() => {
      embeddings.initialize();
    });

    it("should generate embeddings for text input", () => {
      const text = "Hello, World!";
      const embedding = embeddings.generateEmbedding(text);

      expect(embedding).toBeDefined();
      expect(Array.isArray(embedding)).toBe(true);
      expect(embedding.length).toBe(128);
    });

    it("should generate different embeddings for different text", () => {
      const text1 = "Hello";
      const text2 = "World";

      const embedding1 = embeddings.generateEmbedding(text1);
      const embedding2 = embeddings.generateEmbedding(text2);

      expect(embedding1).not.toEqual(embedding2);
    });

    it("should generate consistent embeddings for same text", () => {
      const text = "Consistent test";

      const embedding1 = embeddings.generateEmbedding(text);
      const embedding2 = embeddings.generateEmbedding(text);

      expect(embedding1).toEqual(embedding2);
    });

    it("should throw error when not initialized", () => {
      const uninitializedEmbeddings = new CPUEmbeddings();

      expect(() => {
        uninitializedEmbeddings.generateEmbedding("test");
      }).toThrow("System not initialized. Call initialize() first.");
    });
  });

  describe("sanity checks", () => {
    it("should pass basic sanity test", () => {
      expect(true).toBe(true);
      expect(1 + 1).toBe(2);
      expect("hello").toBe("hello");
    });

    it("should have proper types", () => {
      embeddings.initialize();
      const embedding = embeddings.generateEmbedding("test");

      expect(typeof embeddings.isInitialized()).toBe("boolean");
      expect(typeof embedding).toBe("object");
      expect(embedding.every(val => typeof val === "number")).toBe(true);
    });
  });
});
