# ✍️ Escrita Lúdica (Full Stack)

O **Escrita Lúdica** é uma plataforma interativa desenhada para quebrar o bloqueio criativo, unindo uma interface minimalista no React com um servidor robusto em Node.js.

## 🔗 Link do Projeto (Deploy)
🚀 [Acesse a aplicação aqui](https://escrita-ludica-lfix.onrender.com/login)

---

## 🛠️ Stack Tecnológica & Dependências

Para que o projeto funcione corretamente, as seguintes bibliotecas foram utilizadas e precisam ser instaladas:

### **Front-end (React + Vite/CRA)**
* **React & React DOM:** Core da aplicação.
* * **Vite**: Build tool de última geração para um desenvolvimento ultra-rápido.
* **Tailwind CSS:** Estilização via classes utilitárias.
* **Axios:** Comunicação com a API.
* **Lucide React:** (Recomendado) Para ícones de interface.

### **Back-end (Node.js + Express)**
* **Express:** Framework web para as rotas.
* **Cors:** Liberação de segurança para o Front-end acessar o Back-end.
* **Dotenv:** Proteção de chaves de API e portas.
* **Nodemon:** (Dependência de dev) Reinicia o servidor automaticamente ao salvar.


# Banco de Dados🛜
## MongoDB Atlas

# para as imagens🌄
## cloudinary

---

## 🚀 Guia de Instalação Passo a Passo

### 1. Requisitos Prévios
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

## 2. Clonando e Preparando o Back-end

git clone [https://github.com/joaogabriel944ss/escrita-ludica.git](https://github.com/joaogabriel944ss/escrita-ludica.git)
cd escrita-ludica

## Entre na pasta do servidor
cd server 

## Instale as dependências necessárias
npm install express cors dotenv

## Opcional: Instale o nodemon para facilitar o desenvolvimento
npm install -D nodemon

## Inicie o servidor
npm start

###Preparando o Front-end
Abra um novo terminal:


## Entre na pasta do cliente
cd escrita-ludica/client

## Instale as dependências do React e Tailwind
npm install

## Instale o Axios para as requisições
npm install axios

## Rode o projeto
npm run dev

⚙️ Configuração do Ambiente (.env)
Na raiz da pasta /server, crie um arquivo chamado .env e adicione as seguintes variáveis:

Snippet de código
PORT=3001
# Caso use MongoDB ou outro banco:
DATABASE_URL=seu_link_de_conexao


## testes☣️
Tudo foi testado com Cypress🧪

Metodologia Ágil KanBan:
https://miro.com/app/board/uXjVGWbRRB4=/?share_link_id=412812254637

👤 Autor
João Gabriel

GitHub: @joaogabriel944ss
