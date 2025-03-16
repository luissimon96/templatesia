'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '../../components/ui/button';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se o usuário está autenticado
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      setIsLoading(false);
    }
  }, [status, router]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <Button variant="outline" onClick={handleSignOut}>
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Bem-vindo, {session?.user?.name || 'Usuário'}!</h2>
          <p className="text-gray-600 mb-4">
            Esta é sua área de dashboard. Aqui você pode gerenciar seus templates e acessar recursos exclusivos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">Meus Templates</h3>
              <p className="text-blue-600 mb-4">Gerencie seus templates criados</p>
              <Button variant="default" className="w-full" onClick={() => router.push('/dashboard/templates')}>
                Ver Templates
              </Button>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
              <h3 className="font-medium text-purple-800 mb-2">Chat IA</h3>
              <p className="text-purple-600 mb-4">Converse com nossa IA especializada</p>
              <Button variant="secondary" className="w-full" onClick={() => router.push('/dashboard/chat')}>
                Iniciar Chat
              </Button>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <h3 className="font-medium text-green-800 mb-2">Comunidade</h3>
              <p className="text-green-600 mb-4">Conecte-se com outros desenvolvedores</p>
              <Button variant="outline" className="w-full" onClick={() => router.push('/dashboard/community')}>
                Explorar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 