import '@testing-library/jest-dom';

// Mock Apple Pay SDK globals
Object.defineProperty(window, 'ApplePaySession', {
  value: undefined,
  writable: true,
});

// Setup fetch mock for tests
global.fetch = jest.fn();

// Mock HTMLElement methods for JSDOM
Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  value: jest.fn(),
  writable: true,
});

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});
