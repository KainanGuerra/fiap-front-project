# 📌 Projeto Front-End Fiap

Front-end desenvolvido em **Next.js** para o projeto tech challenge da FIAP.\
Este repositório contém a interface do usuário (UI), integrando com a
API/back-end para exibir e manipular os dados da aplicação.



## 🚀 Tecnologias

-   [Next.js](https://nextjs.org/) -- Framework React para SSR e SSG
-   [React](https://react.dev/) -- Biblioteca para construção da UI
-   [TypeScript](https://www.typescriptlang.org/) -- Tipagem estática
-   [Yarn](https://yarnpkg.com/) -- Gerenciador de pacotes
-   [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) --
    Padrões de código
-   [Docker](https://www.docker.com/) -- Containerização (opcional, se
    usar)


## 📦 Instalação e uso

Clone o repositório:

``` bash
git clone https://github.com/seu-usuario/fiap-front-project.git
cd fiap-front-project
```

Instale as dependências:

``` bash
yarn install
```

Rodar em ambiente de desenvolvimento:

``` bash
yarn dev
```

Acesse: <http://localhost:3000>

------------------------------------------------------------------------

## 🐳 Usando com Docker (opcional)

``` bash
docker build -t fiap-front-project .
docker run -p 3000:3000 fiap-front-project
```

------------------------------------------------------------------------

## ⚙️ Scripts disponíveis

-   `yarn dev` → roda em modo desenvolvimento
-   `yarn build` → gera build de produção
-   `yarn start` → inicia o servidor em produção
-   `yarn lint` → roda o linter

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
