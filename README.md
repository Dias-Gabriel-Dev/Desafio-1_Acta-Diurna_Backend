# Desafio 1 — Acta Diurna

## Sobre o desafio

Neste desafio, você vai construir uma API REST simples para divulgação de vagas usando **Node.js**, **TypeScript** e **Express**.

A proposta aqui é trabalhar a base do backend: rotas, requisições, respostas, validação básica e organização do projeto.

Os dados devem ser mantidos **em memória**. Não use banco de dados neste desafio.

O nome Acta Diurna vem dos boletins públicos da Roma Antiga, usados para divulgar registros e acontecimentos de interesse público. Neste desafio, a ideia é construir uma API REST simples para publicação, consulta, atualização e remoção de vagas.
---

## Stack obrigatória

- Node.js
- TypeScript
- Express

---

## Rotas obrigatórias

A aplicação deve ter estas rotas:

- `GET /jobs`
- `GET /jobs/:id`
- `POST /jobs`
- `PATCH /jobs/:id`
- `DELETE /jobs/:id`

---

## Estrutura mínima da vaga

Cada vaga deve ter, no mínimo, os campos:

- `id`
- `title`
- `company`
- `location`
- `isOpen`

---

## Requisitos

### `GET /jobs`
Deve retornar a lista de vagas cadastradas.

### `GET /jobs/:id`
Deve retornar uma vaga com base no `id`.

Se a vaga não existir, a API deve responder com um HTTP status code apropriado.

### `POST /jobs`
Deve cadastrar uma nova vaga.

Regras:
- `title` é obrigatório
- `company` é obrigatório
- `location` é obrigatório
- `isOpen` é obrigatório e deve ser booleano

Se os dados enviados forem inválidos, a API deve responder com um HTTP status code apropriado.

### `PATCH /jobs/:id`
Deve atualizar parcialmente uma vaga existente.

Se a vaga não existir, a API deve responder com um HTTP status code apropriado.

Os campos enviados devem ser validados. Não aceite tipos inválidos ou campos fora da estrutura esperada da vaga.

### `DELETE /jobs/:id`
Deve remover uma vaga existente.

Se a vaga não existir, a API deve responder com um HTTP status code apropriado.

---

## Regras gerais

- Use **TypeScript**
- Mantenha os dados **em memória**
- Retorne **HTTP status codes coerentes** para cada situação
- O projeto deve rodar sem erro em desenvolvimento
- O projeto deve passar nos comandos de verificação e build

---

## Restrições

Neste desafio, não use:

- banco de dados
- ORM
- autenticação
- NestJS
- ferramentas que montem toda a estrutura de API

---

## Organização do projeto

Você não precisa montar uma arquitetura complexa.

Ainda assim, espera-se alguma organização mínima.  
Evite concentrar tudo em um único arquivo sem necessidade.

Uma estrutura simples com separação entre servidor, aplicação, rotas e tipos já é suficiente.

---

## Opcionais

Você pode adicionar melhorias além do mínimo pedido.

Alguns exemplos:

- `description`
- `createdAt`
- filtro por status, como `GET /jobs?isOpen=true`
- busca por título ou empresa
- middleware de erro
- validação com Zod
- separação mais clara entre rotas e lógica

---

## O que será avaliado

- entendimento de HTTP
- uso apropriado de métodos e HTTP status codes
- implementação das rotas
- validação básica de dados
- tratamento de erros simples
- organização do projeto
- legibilidade do código
- funcionamento geral da aplicação

---

## Como rodar o projeto

Instale as dependências:

```bash
npm install
````

Rode em desenvolvimento:

```bash
npm run dev
```

Verifique os tipos:

```bash
npm run type-check
```

Gere o build:

```bash
npm run build
```

Execute a versão compilada:

```bash
npm run start
```
