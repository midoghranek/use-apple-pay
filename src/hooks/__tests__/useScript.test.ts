/**
 * Tests for useScript hook
 * Simplified tests for Node environment
 */

// Simple test without React Testing Library for now
describe('useScript', () => {
  it('should export useScript function', () => {
    const { useScript } = require('../useScript');
    expect(typeof useScript).toBe('function');
  });

  it('should be importable', () => {
    expect(() => {
      require('../useScript');
    }).not.toThrow();
  });
});
