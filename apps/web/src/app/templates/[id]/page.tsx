import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Esta função seria substituída por uma chamada de API real
async function getTemplate(id: string) {
  // Por enquanto, retornamos dados de exemplo
  return {
    id,
    title: 'E-commerce NextJS',
    description: 'Template completo para e-commerce com NextJS, Stripe e gerenciamento de produtos.',
    content: `
# E-commerce NextJS

Um template completo para criar lojas online modernas e performáticas usando Next.js, Tailwind CSS e Stripe.

## Características

- ✅ Design responsivo
- ✅ Carrinho de compras
- ✅ Pagamentos com Stripe
- ✅ Autenticação de usuários
- ✅ Painel administrativo
- ✅ SEO otimizado
- ✅ Análise de performance

## Como usar

1. Clone o repositório
2. Instale as dependências
3. Configure as variáveis de ambiente
4. Execute o servidor de desenvolvimento

\`\`\`bash
npm install
npm run dev
\`\`\`

## Estrutura do projeto

\`\`\`
├── components/       # Componentes reutilizáveis
├── pages/            # Páginas da aplicação
├── public/           # Arquivos estáticos
├── styles/           # Estilos CSS
├── lib/              # Funções utilitárias
└── ...
\`\`\`
    `,
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
    pricing: 'PRO' as const,
    createdAt: '2023-05-10T14:23:00Z',
    reviews: [
      {
        id: '401',
        author: {
          id: '102',
          name: 'Maria Oliveira',
          username: 'mariaoliveira',
          avatar: 'https://i.pravatar.cc/150?img=5',
        },
        rating: 5,
        comment: 'Excelente template! Muito bem estruturado e fácil de personalizar.',
        createdAt: '2023-06-15T10:30:00Z',
      },
      {
        id: '402',
        author: {
          id: '103',
          name: 'Carlos Mendes',
          username: 'carlosmendes',
          avatar: 'https://i.pravatar.cc/150?img=8',
        },
        rating: 4,
        comment: 'Muito bom, mas poderia ter mais opções de customização.',
        createdAt: '2023-07-01T14:45:00Z',
      },
    ],
  };
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const template = await getTemplate(params.id);
  
  return {
    title: `${template.title} | Templatesia`,
    description: template.description,
  };
}

export default async function TemplatePage({ params }: { params: { id: string } }) {
  const template = await getTemplate(params.id);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Informações do template */}
        <div className="lg:w-2/3">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
              <Link href="/templates" className="hover:underline">
                Templates
              </Link>
              <span>/</span>
              <Link href={`/categories/${template.category.slug}`} className="hover:underline">
                {template.category.name}
              </Link>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{template.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">{template.rating.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>{template.likes}</span>
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>{template.downloads}</span>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {template.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {template.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/tags/${tag.slug}`}
                  className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1 rounded-full text-sm"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image
                  src={template.author.avatar}
                  alt={template.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div>
                <Link href={`/users/${template.author.username}`} className="font-medium hover:underline">
                  {template.author.name}
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(template.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Preview</h2>
            <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Ver demo completa
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Descrição</h2>
            <div className="prose dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap">{template.content}</pre>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Avaliações</h2>
            
            {template.reviews.length > 0 ? (
              <div className="space-y-6">
                {template.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                        <Image
                          src={review.author.avatar}
                          alt={review.author.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <span className="font-medium">{review.author.name}</span>
                        <div className="flex items-center text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Nenhuma avaliação ainda. Seja o primeiro a avaliar!
              </p>
            )}
          </div>
        </div>
        
        {/* Barra lateral */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 sticky top-4">
            <div className="mb-4">
              {template.pricing === 'PRO' ? (
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-sm px-3 py-1 rounded-full inline-block mb-2">
                  PRO
                </div>
              ) : (
                <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full inline-block mb-2 dark:bg-green-900 dark:text-green-100">
                  FREE
                </div>
              )}
              
              {template.pricing === 'PRO' ? (
                <div className="text-3xl font-bold mb-2">R$ 149,00</div>
              ) : (
                <div className="text-3xl font-bold mb-2">Gratuito</div>
              )}
            </div>
            
            <div className="mb-6">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download
              </button>
              
              <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-4 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Favoritar
              </button>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="font-bold mb-4">Detalhes</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Categoria</span>
                  <Link href={`/categories/${template.category.slug}`} className="text-blue-600 hover:underline">
                    {template.category.name}
                  </Link>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Framework</span>
                  <span>Next.js</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Linguagem</span>
                  <span>TypeScript</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Versão</span>
                  <span>1.2.0</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Última atualização</span>
                  <span>30/05/2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 