'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validação de senha
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      setIsLoading(false);
      return;
    }

    try {
      // Chamada para a API para criar o usuário
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      // Verificar se a resposta é JSON válido
      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.error('Erro ao analisar resposta JSON:', e);
        throw new Error('Erro ao processar resposta do servidor. Verifique os logs para mais detalhes.');
      }

      // Verificar se a resposta foi bem-sucedida
      if (!response.ok) {
        // Se temos uma mensagem de erro específica da API, use-a
        if (data && data.message) {
          throw new Error(data.message);
        }

        // Se temos erros de validação, formatar uma mensagem
        if (data && data.errors) {
          const errorMessages = Object.entries(data.errors)
            .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
            .join('; ');
          throw new Error(errorMessages || 'Erro de validação');
        }

        // Mensagem genérica para outros erros
        throw new Error('Erro ao criar conta. Por favor, tente novamente.');
      }

      // Se chegou aqui, o registro foi bem-sucedido
      console.log('Usuário registrado com sucesso:', data);

      // Redirecionar para a página de login com mensagem de sucesso
      router.push('/login?registered=true');
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      setError(error.message || 'Ocorreu um erro ao criar sua conta. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-100 rounded-full opacity-50"></div>

        <div className="relative">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Crie sua conta</h1>
          <p className="text-center text-gray-600 mb-8">Junte-se à comunidade Templatesia</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <Input
                id="name"
                name="name"
                type="text"
                label="Nome completo"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div className="mb-5">
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="mb-5">
              <Input
                id="password"
                name="password"
                type="password"
                label="Senha"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo de 8 caracteres"
                minLength={8}
                required
              />
            </div>

            <div className="mb-6">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirmar senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme sua senha"
                minLength={8}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              variant="gradientSecondary"
              size="xl"
              className="w-full"
            >
              {isLoading ? (
                <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Entrar
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-300 w-full"></div>
              <div className="bg-white px-4 text-sm text-gray-500">ou continue com</div>
              <div className="border-t border-gray-300 w-full"></div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              >
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
              >
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 