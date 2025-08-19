// Simple smoke test to verify test setup
describe('Package Tests', () => {
  it('should pass basic test', () => {
    expect(true).toBe(true);
  });

  it('should have access to basic jest matchers', () => {
    expect('hello').toMatch(/ello/);
    expect(42).toBeGreaterThan(40);
  });
});
