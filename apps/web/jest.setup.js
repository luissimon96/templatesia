// Importar as extensões do Jest para o DOM
import '@testing-library/jest-dom';

// Mock para o next/router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    pathname: '/',
    query: {},
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock para next-auth
jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  return {
    __esModule: true,
    ...originalModule,
    signIn: jest.fn(),
    signOut: jest.fn(),
    useSession: jest.fn(() => {
      return {
        data: {
          user: {
            id: 'user-id',
            name: 'Test User',
            email: 'test@example.com',
          },
          expires: new Date(Date.now() + 2 * 86400).toISOString(),
        },
        status: 'authenticated',
      };
    }),
  };
});

// Limpar todos os mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
}); 