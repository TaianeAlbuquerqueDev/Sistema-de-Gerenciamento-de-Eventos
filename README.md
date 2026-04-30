# 🎟️ Event-IT — Sistema de Gerenciamento de Eventos

Aplicação frontend desenvolvida com **Angular 21** para gerenciamento e visualização de eventos. Conta com área pública para listagem de eventos e área administrativa protegida por autenticação JWT.

---

## 🛠️ Tecnologias Utilizadas

<p>
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/API_REST-FF6C37?style=for-the-badge&logo=fastapi&logoColor=white"/>
</p>

- **Angular 21.2**
- **TypeScript 5.9**
- **RxJS 7.8** — programação reativa
- **Angular Router** — navegação com rotas protegidas
- **Angular SSR** — Server-Side Rendering com Express
- **HttpClient** — consumo de API REST externa
- **Angular Forms** — formulários reativos
- **Prettier** — formatação de código

---

## 📋 Funcionalidades

- 📋 Listagem pública de eventos com filtros por nome, categoria, data e capacidade
- 🔍 Visualização detalhada de cada evento
- 🔐 Login com autenticação JWT
- 🛡️ Rotas protegidas por **Auth Guard** para área administrativa
- ➕ Criação, edição e exclusão de eventos (área admin)
- 📊 Dashboard administrativo
- 🔄 Interceptor HTTP para envio automático do token nas requisições

---

## 🗺️ Rotas da Aplicação

| Rota | Componente | Acesso |
|------|-----------|--------|
| `/` | Redireciona para `/home` | Público |
| `/home` | Lista de eventos | Público |
| `/events/:id` | Detalhe do evento | Público |
| `/login` | Tela de login | Público |
| `/admin` | Dashboard admin | 🔒 Protegido |
| `/admin/events` | Formulário de eventos | 🔒 Protegido |

---

## 📁 Estrutura do Projeto

```
src/app/
│
├── components/
│   ├── event-card/      # Card de exibição de evento
│   └── navbar/          # Barra de navegação
│
├── guards/
│   └── auth-guard.ts    # Proteção de rotas autenticadas
│
├── interceptors/
│   └── auth-interceptor.ts  # Injeção automática do token JWT
│
├── models/
│   └── event.ts         # Interface do modelo de evento
│
├── pages/
│   ├── admin/
│   │   ├── dashboard/   # Painel administrativo
│   │   └── event-form/  # Formulário de criação/edição
│   ├── event-detail/    # Detalhes do evento
│   ├── event-list/      # Lista pública de eventos
│   └── login/           # Tela de login
│
└── services/
    ├── auth.ts          # Serviço de autenticação (login, logout, token)
    └── event.ts         # Serviço de CRUD de eventos
```

---

## 🌐 API Utilizada

A aplicação consome a API externa:
```
https://api-senai-angular.vercel.app/api
```

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/auth/login` | Autenticação e geração de token |
| `GET` | `/events` | Listar eventos (com filtros) |
| `GET` | `/events/:id` | Buscar evento por ID |
| `POST` | `/admin/events` | Criar evento (autenticado) |
| `PUT` | `/admin/events/:id` | Editar evento (autenticado) |
| `DELETE` | `/admin/events/:id` | Remover evento (autenticado) |

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos
- Node.js 20+
- npm 11+
- Angular CLI

### 1. Clone o repositório
```bash
git clone https://github.com/TaianeAlbuquerqueDev/sistema-de-gerenciamento-de-eventos.git
cd sistema-de-gerenciamento-de-eventos
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento
```bash
npm start
```

### 4. Acesse no navegador
```
http://localhost:4200
```

---

## 📚 Aprendizados

- Desenvolvimento de SPA com **Angular 21** (standalone components)
- Consumo de API REST com **HttpClient** e **RxJS**
- Autenticação com **JWT** e armazenamento em `localStorage`
- Proteção de rotas com **Auth Guard** (`CanActivateFn`)
- Interceptor HTTP para injeção automática do token (`Authorization: Bearer`)
- Roteamento avançado com rotas aninhadas e redirecionamentos
- **Server-Side Rendering (SSR)** com Angular e Express
- Filtros dinâmicos com `HttpParams`

---

## 👩‍💻 Autora

<table>
  <tr>
    <td align="center">
      <b>Taiane Albuquerque</b><br/>
      Desenvolvedora Full Stack<br/>
      <a href="https://www.linkedin.com/in/taiane-albuquerque-78b029175/">LinkedIn</a> •
      <a href="https://github.com/TaianeAlbuquerqueDev">GitHub</a> •
      <a href="mailto:taiane.albuquerque.1994@gmail.com">Email</a>
    </td>
  </tr>
</table>
