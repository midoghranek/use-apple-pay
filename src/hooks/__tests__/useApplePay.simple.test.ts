/**
 * Tests for useApplePay hook
 * Simplified tests for Node environment
 */

describe('useApplePay', () => {
  it('should export useApplePay function', () => {
    const { useApplePay } = require('../useApplePay');
    expect(typeof useApplePay).toBe('function');
  });

  it('should be importable', () => {
    expect(() => {
      require('../useApplePay');
    }).not.toThrow();
  });
});
