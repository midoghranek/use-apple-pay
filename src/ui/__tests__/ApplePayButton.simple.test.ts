/**
 * Tests for ApplePayButton component
 * Simplified tests for Node environment
 */

describe('ApplePayButton', () => {
  it('should export ApplePayButton component', () => {
    const { ApplePayButton } = require('../ApplePayButton');
    expect(typeof ApplePayButton).toBe('function');
  });

  it('should be importable', () => {
    expect(() => {
      require('../ApplePayButton');
    }).not.toThrow();
  });
});
