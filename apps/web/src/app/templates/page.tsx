import React from 'react';
import { TemplateList } from '@/components/templates/TemplateList';

// Esta função seria substituída por uma chamada de API real
async function getTemplates() {
  // Por enquanto, retornamos dados de exemplo
  return {
    data: [
      {
        id: '1',
        title: 'E-commerce NextJS',
        description: 'Template completo para e-commerce com NextJS, Stripe e gerenciamento de produtos.',
        author: {
          id: '101',
          name: 'João Silva',
          username: 'joaosilva',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
        category: {
          id: '201',
          name: 'E-commerce',
          slug: 'e-commerce',
        },
        tags: [
          { id: '301', name: 'NextJS', slug: 'nextjs' },
          { id: '302', name: 'TypeScript', slug: 'typescript' },
          { id: '303', name: 'Stripe', slug: 'stripe' },
        ],
        likes: 245,
        downloads: 1200,
        rating: 4.7,
        pricing: 'PRO',
        createdAt: '2023-05-10T14:23:00Z',
      },
      {
        id: '2',
        title: 'Dashboard Admin',
        description: 'Template para dashboard administrativo com React, material-UI e gráficos interativos.',
        author: {
          id: '102',
          name: 'Maria Oliveira',
          username: 'mariaoliveira',
          avatar: 'https://i.pravatar.cc/150?img=5',
        },
        category: {
          id: '202',
          name: 'Admin',
          slug: 'admin',
        },
        tags: [
          { id: '304', name: 'React', slug: 'react' },
          { id: '305', name: 'Material-UI', slug: 'material-ui' },
          { id: '306', name: 'Charts', slug: 'charts' },
        ],
        likes: 189,
        downloads: 890,
        rating: 4.5,
        pricing: 'FREE',
        createdAt: '2023-06-22T09:15:00Z',
      },
    ],
    meta: {
      total: 2,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
  };
}

export const metadata = {
  title: 'Templates | Templatesia',
  description: 'Encontre os melhores templates para seus projetos.',
};

export default async function TemplatesPage() {
  const { data: templates } = await getTemplates();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Templates</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Encontre os melhores templates para acelerar o desenvolvimento de seus projetos.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-4">
        <div className="w-full md:w-64">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Filtros</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Categoria</label>
              <select className="w-full p-2 border rounded">
                <option value="">Todas</option>
                <option value="e-commerce">E-commerce</option>
                <option value="admin">Admin</option>
                <option value="landing-page">Landing Page</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Preço</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Gratuito</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Pro</span>
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  React
                </span>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                  NextJS
                </span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  TypeScript
                </span>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Aplicar Filtros
            </button>
          </div>
        </div>
        
        <div className="flex-1">
          <TemplateList templates={templates} />
        </div>
      </div>
    </div>
  );
} 