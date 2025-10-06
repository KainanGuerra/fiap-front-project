# 📌 Projeto Front-End Fiap

Front-end desenvolvido em **Next.js** para o projeto tech challenge da FIAP.\
Este repositório contém a interface do usuário (UI), integrando com a
API/back-end para exibir e manipular os dados da aplicação.

## 📄 Documentation

For additional information, authentication credentials, and business rules, refer to the internal documentation:

🔗 [**Google Docs (Fiap Tech Challenge)**](https://docs.google.com/document/d/1z1TGVuseEpAEH6ZGFzFmyrys5lmMWnv5)


## 🚀 Tecnologias

-   [Next.js](https://nextjs.org/) -- Framework React para SSR e SSG
-   [React](https://react.dev/) -- Biblioteca para construção da UI
-   [TypeScript](https://www.typescriptlang.org/) -- Tipagem estática
-   [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) --
    Padrões de código

## 📦 Instalação e uso

Clone o repositório:

``` bash
git clone https://github.com/seu-usuario/fiap-front-project.git
cd fiap-front-project
```

Instale as dependências:

``` bash
npm run install
```

Rodar em ambiente de desenvolvimento:

``` bash
npm run dev
```

Acesse: <http://localhost:3000>

------------------------------------------------------------------------

## ⚙️ Scripts disponíveis

-   `npm run dev` → roda em modo desenvolvimento
-   `npm run build` → gera build de produção
-   `npm run start` → inicia o servidor em produção
-   `npm run lint` → roda o linter

------------------------------------------------------------------------

## 📂 Estrutura de pastas

``` bash
fiap-front-project/
├── public/          # Arquivos estáticos
├── src/
│   ├── components/  # Componentes reutilizáveis
│   ├── pages/       # Páginas Next.js
│   ├── styles/      # Estilos globais e módulos
│   └── utils/       # Funções utilitárias
├── .eslintrc.json   # Configuração ESLint
├── next.config.js   # Configuração Next.js
├── package.json
└── README.md
```

------------------------------------------------------------------------

## 🤝 Contribuição

1.  Fork este repositório
2.  Crie sua feature branch: `git checkout -b minha-feature`
3.  Commit suas alterações: `git commit -m 'feat: Minha nova feature'`
4.  Push para a branch: `git push origin minha-feature`
5.  Abra um Pull Request

------------------------------------------------------------------------

## 📄 Licença

Este projeto está sob a licença MIT.\
Sinta-se livre para usar e modificar.
