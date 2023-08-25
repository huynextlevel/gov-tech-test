jest.mock('@react-native-community/netinfo', () => ({
  useNetInfo: jest.fn(),
  addEventListener: jest.fn(),
  fetch: jest.fn(),
}))