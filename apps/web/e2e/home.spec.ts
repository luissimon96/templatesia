import { test, expect } from '@playwright/test';

test.describe('Página Inicial', () => {
  test('deve mostrar os elementos principais', async ({ page }) => {
    await page.goto('/');

    // Verifica título principal
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Bem-vindo ao Templatebuilderia'
    );

    // Verifica seções de recursos
    const features = ['Templates', 'Chat IA', 'Community', 'Analytics'];
    for (const feature of features) {
      await expect(page.getByText(feature)).toBeVisible();
    }

    // Verifica botões de ação
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Criar Conta' })).toBeVisible();
  });

  test('deve redirecionar para dashboard quando autenticado', async ({ page }) => {
    // Simula usuário autenticado
    await page.route('**/api/auth/session', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          user: {
            name: 'Test User',
            email: 'test@example.com'
          },
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        })
      });
    });

    await page.goto('/');

    // Verifica redirecionamento
    await expect(page).toHaveURL('/dashboard');
  });
}); 