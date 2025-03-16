'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
          </svg>
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Desenvolva com IA e Compartilhe com a Comunidade
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Templatesia une IA especializada em código com uma comunidade ativa de desenvolvedores para criar aplicações melhores e mais rápidas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium text-lg transition-colors shadow-lg">
                  Criar Conta Grátis
                </Link>
                <Link href="/templates" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium text-lg transition-colors">
                  Explorar Templates
                </Link>
              </div>
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"></div>
                  ))}
                </div>
                <p className="ml-4 text-blue-100">
                  <span className="font-bold">+1000</span> desenvolvedores ativos
                </p>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-white p-2 rounded-xl shadow-2xl">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-md p-4 font-mono text-sm">
                    <p className="text-gray-800">
                      <span className="text-purple-600">const</span>{" "}
                      <span className="text-blue-600">app</span> ={" "}
                      <span className="text-purple-600">createApp</span>({"{"}
                    </p>
                    <p className="text-gray-800 ml-4">
                      <span className="text-green-600">name</span>:{" "}
                      <span className="text-orange-600">'Meu Projeto'</span>,
                    </p>
                    <p className="text-gray-800 ml-4">
                      <span className="text-green-600">template</span>:{" "}
                      <span className="text-orange-600">'next-tailwind-auth'</span>,
                    </p>
                    <p className="text-gray-800 ml-4">
                      <span className="text-green-600">author</span>:{" "}
                      <span className="text-orange-600">'templatesia'</span>
                    </p>
                    <p className="text-gray-800">{"});"}</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-yellow-400 rounded-lg transform rotate-6 z-[-1]"></div>
              <div className="absolute -left-4 -top-4 w-16 h-16 bg-blue-400 rounded-lg transform -rotate-12 z-[-1]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recursos Poderosos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tudo o que você precisa para desenvolver, compartilhar e evoluir seus projetos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Templates",
                description: "Acesse centenas de templates verificados e testados pela comunidade",
                icon: "📚"
              },
              {
                title: "Chat IA",
                description: "Converse com nossa IA especializada em desenvolvimento de software",
                icon: "🤖"
              },
              {
                title: "Community",
                description: "Conecte-se com desenvolvedores e receba feedback sobre seus projetos",
                icon: "👥"
              },
              {
                title: "Analytics",
                description: "Acompanhe o desempenho e uso dos seus templates compartilhados",
                icon: "📊"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Desenvolvedores Confiam em Nós</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Junte-se a milhares de desenvolvedores que usam Templatesia diariamente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Templatesia revolucionou meu fluxo de trabalho. Economizo horas toda semana usando os templates da comunidade.",
                author: "Maria Silva",
                role: "Desenvolvedora Frontend"
              },
              {
                quote: "O Chat IA me ajuda a resolver problemas complexos de código em minutos. É como ter um mentor sênior sempre disponível.",
                author: "João Oliveira",
                role: "Desenvolvedor Full Stack"
              },
              {
                quote: "Compartilhar meus templates me conectou com desenvolvedores incríveis e abriu novas oportunidades profissionais.",
                author: "Ana Costa",
                role: "Arquiteta de Software"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-yellow-500">
                    {"★".repeat(5)}
                  </div>
                  <p className="text-gray-700 mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Comece a Desenvolver Melhor Hoje</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se à comunidade Templatesia e leve seu desenvolvimento ao próximo nível
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!session && (
              <>
                <Link href="/signup" className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-3 rounded-lg font-medium text-lg transition-colors shadow-lg">
                  Criar Conta Grátis
                </Link>
                <Link href="/login" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium text-lg transition-colors">
                  Entrar
                </Link>
              </>
            )}
            {session && (
              <Link href="/dashboard" className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-3 rounded-lg font-medium text-lg transition-colors shadow-lg">
                Acessar Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
} 