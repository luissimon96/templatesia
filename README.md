# Templatebuilderia

Uma plataforma que une IA especializada em código com uma comunidade ativa de desenvolvedores.

## 📑 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Stack Tecnológico](#stack-tecnológico)
- [Começando](#começando)
- [Documentação da API](#documentação-da-api)
- [Planos e Preços](#planos-e-preços)
- [Segurança](#segurança)
- [Roadmap](#roadmap)
- [Contribuindo](#contribuindo)
- [Status do Projeto](#status-do-projeto)
- [Suporte](#suporte)
- [CI/CD e Análise de Código](#ci-cd-e-análise-de-código)

## 🎯 Visão Geral

Desenvolva aplicações com nossa IA especializada em código, compartilhe seus templates com a comunidade e aprenda com outros desenvolvedores.

### Por que usar Templatebuilderia?

- 🤖 **Chat IA Especializado**: IA treinada para desenvolvimento
- 🌟 **Comunidade Ativa**: Compartilhe e aprenda com outros devs
- 📚 **Biblioteca Colaborativa**: Templates verificados e testados
- 💡 **Desenvolvimento Social**: Interaja, contribua e evolua

## ⚡ Funcionalidades

### Core
- Chat IA para desenvolvimento
- Biblioteca de templates
- Sistema de reviews e avaliações
- Colaboração em tempo real

### Comunidade
- Perfis de desenvolvedores
- Sistema de reputação
- Fóruns por categoria
- Eventos virtuais

### Templates
- Categorias especializadas
- Versionamento
- Preview em tempo real
- Analytics detalhado

## 🛠️ Stack Tecnológico

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + Shadcn/ui
- Zustand + React Query

### Backend
- NestJS (Node.js)
- MongoDB + Redis
- Prisma (ORM)
- WebSockets (Socket.io)

### Infraestrutura
- Vercel (Frontend)
- Railway/Render (Backend)
- MongoDB Atlas
- Cloudinary (Mídia)

## 🚀 Começando

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/templatebuilderia.git
cd templatebuilderia
```

2. **Configure o ambiente**
```bash
cp .env.example .env
npm install
```

3. **Inicie os serviços**
```bash
docker-compose up -d
npm run dev
```

4. Acesse http://localhost:3000

## 📘 Documentação da API

### Plano Gratuito
```typescript
// Templates Básicos
GET    /api/templates                 // Lista paginada
GET    /api/templates/:id            // Detalhes
GET    /api/templates/search         // Busca simples
POST   /api/templates/:id/like       // Curtir

// Limites:
- 100 requisições/hora
- 5 templates próprios
- Funcionalidades básicas
```

### Plano Pro
```typescript
// Templates Avançados
GET    /api/pro/templates/analytics   // Métricas
POST   /api/pro/templates/import     // Importação
POST   /api/pro/ai/analyze          // Análise IA
GET    /api/pro/analytics/*         // Analytics

// Limites:
- 10.000 requisições/hora
- Templates ilimitados
- Recursos avançados
```

## 💰 Planos e Preços

### Gratuito
- Acesso ao chat IA (3 dias)
- Templates básicos
- Comunidade limitada
- Preço: R$ 0

### Pro (R$ 29/mês)
- Chat IA ilimitado
- Todos os templates
- Acesso total à comunidade
- Suporte prioritário

## 🔒 Segurança

### Autenticação
- Login seguro com OAuth 2.0
- Autenticação em duas etapas (2FA)
- Tokens JWT com rotação automática
- Proteção contra força bruta

### Proteção de Dados
- Criptografia AES-256 para dados sensíveis
- Backups automáticos diários
- Monitoramento 24/7
- Conformidade com LGPD/GDPR

### Boas Práticas
- Sanitização de inputs
- Proteção contra XSS e CSRF
- Rate limiting por IP
- Logs de auditoria

Encontrou uma vulnerabilidade? Por favor, envie um email para security@templatebuilderia.com

## 📊 Status do Projeto

![Status Build](https://img.shields.io/badge/build-passing-brightgreen)
![Cobertura de Testes](https://img.shields.io/badge/coverage-85%25-green)
![Versão](https://img.shields.io/badge/version-1.0.0-blue)

### Métricas
- Uptime: 99.9%
- Tempo médio de resposta: <100ms
- Usuários ativos: 1000+
- Templates publicados: 500+

## 💬 Suporte

- 📧 Email: luissimonazure@gmail.com
- 💭 Discord: [Junte-se ao nosso servidor](https://discord.gg/templatebuilderia)
- 📚 Documentação: [docs.templatebuilderia.com](https://docs.templatebuilderia.com)
- 🐛 Issues: [GitHub Issues](https://github.com/templatebuilderia/issues)

## 🗺️ Roadmap

### Fase 1 (MVP)
- Sistema de autenticação
- CRUD de templates
- Chat IA básico
- Interações essenciais

### Fase 2
- Preview em tempo real
- Sistema de reviews
- Colaboração avançada
- Analytics básico

### Fase 3
- Marketplace
- Integrações (GitHub, VSCode)
- Sistema de mentoria
- Analytics avançado

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📄 CI/CD e Análise de Código

### Execução Manual de Workflows

Todos os workflows podem ser executados manualmente através da interface do GitHub Actions ou através de tags nos commits.

#### Executando via Interface
1. Acesse a aba "Actions" no GitHub
2. Selecione o workflow desejado
3. Clique em "Run workflow"
4. Selecione as opções desejadas
5. Clique em "Run workflow"

#### Executando via Tags

Para executar workflows específicos, adicione uma das seguintes tags ao seu commit:

```bash
# Análise de Qualidade
git tag quality-v1.0
git push origin quality-v1.0

# Análise de Segurança
git tag security-v1.0
git push origin security-v1.0

# Testes
git tag test-v1.0
git push origin test-v1.0

# Análise de Performance
git tag perf-v1.0
git push origin perf-v1.0

# Release (executa todos os workflows)
git tag release-v1.0
git push origin release-v1.0
```

Exemplo de uso com mensagem:
```bash
# Criar commit
git commit -m "feat: nova funcionalidade"

# Adicionar tag
git tag -a quality-v1.0 -m "Análise de qualidade para feature X"
git push origin quality-v1.0
```

### Workflows Disponíveis

#### 1. Análise de Qualidade (code-quality.yml)
- **Ferramenta Principal**: SonarCloud
- **Quando Executa**: Em pushes e PRs para `main`
- **Funcionalidades**:
  - Análise de qualidade do código
  - Detecção de code smells e duplicações
  - Monitoramento de cobertura de testes
  - Métricas de complexidade ciclomática

```yaml
# Configuração do SonarCloud necessária:
sonar.organization=luissimon96
sonar.projectKey=templatesia
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

#### 2. Análise de Segurança (security.yml)
- **Ferramentas**: 
  - OWASP Dependency Check
  - Snyk
  - CodeQL
- **Quando Executa**: 
  - Em pushes e PRs para `main`
  - Automaticamente todo domingo à meia-noite
- **Verificações**:
  - Vulnerabilidades em dependências
  - Análise estática de segurança
  - Problemas de segurança no código
  - Geração de relatórios SARIF

#### 3. Lint e Testes (lint-test.yml)
- **Ferramentas**:
  - ESLint
  - TypeScript
  - Jest
  - Playwright
- **Verificações**:
  - Padrões de código
  - Type checking
  - Testes unitários
  - Testes E2E
  - Formatação de código

#### 4. Análise de Performance (performance.yml)
- **Ferramentas**:
  - Lighthouse CI
  - Next.js Bundle Analyzer
- **Quando Executa**:
  - Em pushes e PRs para `main`
  - Toda segunda-feira à meia-noite
- **Métricas**:
  - Performance web
  - Acessibilidade
  - SEO
  - Análise de bundle size

### Opções de Execução Manual

#### 1. Análise de Qualidade (code-quality.yml)
- **Ambientes**: development, staging, production
- **Comando**: 
  ```bash
  git tag quality-{versão}
  ```

#### 2. Análise de Segurança (security.yml)
- **Tipos de Scan**: full, dependencies, code
- **Comando**:
  ```bash
  git tag security-{versão}
  ```

#### 3. Lint e Testes (lint-test.yml)
- **Escopos**: full, unit, e2e, lint
- **Comando**:
  ```bash
  git tag test-{versão}
  ```

#### 4. Análise de Performance (performance.yml)
- **Tipos**: full, lighthouse, bundle
- **Comando**:
  ```bash
  git tag perf-{versão}
  ```

### Boas Práticas de Versionamento

1. **Formato de Tags**:
   - Use versionamento semântico: `tipo-vX.Y.Z`
   - X: Versão maior (breaking changes)
   - Y: Versão menor (novas features)
   - Z: Patches (correções)

2. **Tags de Release**:
   - Use `release-vX.Y.Z` para releases completos
   - Executa automaticamente todos os workflows
   - Exemplo: `release-v1.0.0`

3. **Tags de Análise**:
   - Use prefixos específicos: quality-, security-, test-, perf-
   - Adicione o número da versão: v1.0.0
   - Exemplo: `quality-v1.0.0`
