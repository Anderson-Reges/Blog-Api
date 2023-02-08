# Boas-vindas ao repositório do projeto API de Blogs!

  <summary><strong><g-emoji class="g-emoji" alias="man_technologist" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f468-1f4bb.png"><img class="emoji" alt="man_technologist" height="20" width="20" src="https://github.githubassets.com/images/icons/emoji/unicode/1f468-1f4bb.png"></g-emoji> O que foi desenvolvido nesse projeto</strong></summary>
<p dir="auto">Neste projeto foi desenvolvido uma API e um banco de dados para a produção de conteúdo para um blog!</p>
<p dir="auto">Foi usado para desenvolver a aplicação: o <code>Node.js</code> usando o pacote <code>sequelize</code>, utilizando as operações basicas de desenvolvimento conhecido como<code>CRUD</code></p>
<ol dir="auto">
<li>
<p dir="auto">Foi desenvolvido endpoints que estarão conectados ao seu banco de dados seguindo os princípios do REST;</p>
</li>
<li>
<p dir="auto">Para fazer um post é necessário usuário e login, portanto foi trabalhada a <strong>relação entre</strong> <code>user</code> e <code>post</code>;</p>
</li>
<li>
<p dir="auto">Foi necessário a utilização de categorias para os posts, trabalhando, assim, a <strong>relação de</strong> <code>posts</code> para <code>categories</code> e de <code>categories</code> para <code>posts</code>.</p>
</li>
<li>
<p dir="auto">Banco de dados usado foi o <code>MySQL</code>.</p>
</li>
</ol>
<br>

<br>

<details>
  <summary><strong>🐋 Rodando o projeto</strong></summary>
  
  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior.**


  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.

  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;

  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;

  - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;

  > :information_source: Use o comando `docker exec -it blogs_api bash`.

  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`. (Instale dentro do container)
  
  - **:warning: Atenção:** No Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 
</details>


<details>
  <summary  id="diagrama"><strong>🎲 Diagrama ER e Entidades</strong></summary>

  #### Diagrama de Entidade-Relacionamento

  Para orientar sobre as tabelas, utilize o *DER* a seguir:

  ![DER](./public/der.png)

  ---

  #### Formato das entidades

  No projeto foi usado `ORM Sequelize` para criar e atualizar o seu banco de dados. 

  - Uma tabela chamada **users**, contendo dados com a seguinte estrutura:

    | id  | display_name    | email           | password | image                                                                                   |
    | --- | --------------- | --------------- | -------- | --------------------------------------------------------------------------------------- |
    | 1   | Brett Wiltshire | brett@email.com // tem quer ser único | 123456   | http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png |

  - Uma tabela chamada **categories**, contendo dados com a seguinte estrutura:

    | id  | name |
    | --- | ---- |
    | 18  | News |

  - Uma tabela chamada **blog_posts**, contendo dados com a seguinte estrutura:

    | id  | title                      | content                                                | user_id | published                | updated                  |
    | --- | -------------------------- | ------------------------------------------------------ | ------- | ------------------------ | ------------------------ |
    | 21  | Latest updates, August 1st | The whole text for the blog post goes here in this key | 14  // Chave estrangeira, referenciando o id de `users`    | 2011-08-01T19:58:00.000Z | 2011-08-01T19:58:51.947Z |


  - Uma tabela chamada **posts_categories**, contendo uma **chave primária composta** utilizando os dois atributos da estrutura:

    | post_id | category_id |
    | ------- | ----------- |
    | 50 // Chave primária e estrangeira, referenciando o id de `BlogPosts`     | 20  // Chave primária e estrangeira, referenciando o id de `Categories`     |


    *Os dados acima são fictícios, e estão aqui apenas como exemplo*
    ---

    #### Dicas de scripts prontos

    - Deleta o banco de dados:
    ```json
    "drop": "npx sequelize-cli db:drop"
    ```

    - Cria o banco e gera as tabelas:
    ```json
    "prestart": "npx sequelize-cli db:create && npx sequelize-cli db:migrate"
    ```

    - Insere dados/Popula a tabela:
    ```json
    "seed": "npx sequelize-cli db:seed:all"
    ```

<br />
</details>
