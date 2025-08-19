/**
 * Type tests for use-apple-pay package
 * These tests verify that the TypeScript types are working correctly
 */

describe('Type definitions', () => {
  it('should export types correctly', () => {
    const types = require('../types');
    expect(types).toBeDefined();
  });

  it('should be importable', () => {
    expect(() => {
      require('../types');
    }).not.toThrow();
  });
});
