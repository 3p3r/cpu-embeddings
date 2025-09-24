/**
 * CPU Embeddings - Main entry point
 * Embeddings generated on CPU for lightweight classification tasks
 */

export class CPUEmbeddings {
  private initialized: boolean = false;

  constructor() {
    console.log("CPU Embeddings initialized");
  }

  /**
   * Initialize the embeddings system
   */
  public initialize(): void {
    this.initialized = true;
    console.log("CPU Embeddings system ready");
  }

  /**
   * Check if the system is initialized
   */
  public isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Generate embeddings for input text
   * @param text - Input text to generate embeddings for
   * @returns Simple placeholder embedding vector
   */
  public generateEmbedding(text: string): number[] {
    if (!this.initialized) {
      throw new Error("System not initialized. Call initialize() first.");
    }

    // Placeholder implementation - returns a simple hash-based embedding
    const embedding = new Array(128);
    for (let i = 0; i < 128; i++) {
      // Use both text content and position to generate different embeddings
      const hash = this.simpleHash(text + i.toString());
      embedding[i] = Math.sin(hash * 0.01) * 0.5;
    }

    return embedding;
  }

  /**
   * Simple hash function for generating different values from text
   */
  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
}

// Default export for easy importing
export default CPUEmbeddings;

// Example usage when run directly
if (require.main === module) {
  const embeddings = new CPUEmbeddings();
  embeddings.initialize();

  const result = embeddings.generateEmbedding("Hello, World!");
  console.log(`Generated embedding with ${result.length} dimensions`);
  console.log("First 5 values:", result.slice(0, 5));
}
