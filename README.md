# **Desafio Técnico Blue** 

**Olá, este desafio consiste em desenvolver uma API com armazenamento em nuvem. Utilizando a Integração Backend + Mongo Atlas + Heroku.** 

**Onde existirá apenas 1 rota principal:** 

 **Rota Usuários.** 



 **Dentro da rota `Usuários`temos as seguintes sub-rotas:**

 `/add` 	

`/listid`  

`/listall ` 	

 `/update ` 	

`/delete`  



**A rota usuário  `/users`**  **, necessita de:**

​				**`/add`** 

- ​	**Usado para adicionar um novo usuário ao banco de dados na nuvem.**

- ​    **Exemplo:**    `/users/add`

- ​    **Para adicionar um usuário dentro do banco, necessita passar todos os dados com suas devidas informações a seguir:**

  ```javascript
  {
  	"nome": "Felipe", //(Type: String)
  	"user":  "Felipao13", //(Type: String)
  	"password": "12345" //(Type: String)
  }
  ```
  
  
  
- ​    **Se for adicionado retornará um .json com uma mensagem de confirmação e um status 200.**

  ```javascript
  res.status(200).json({message: "Cadastrado com sucesso"});
  ```

  

- ​    **Caso contrário não for inserido no banco, retornará uma mensagem de erro e um status 400.**

  ```javascript
  res.status(400).json({message: "Algo esta errado"});
  ```



​				**`/listall`** 

- ​	**Usado para visualizar todos os usuários cadastrados no banco.**

- ​    **Exemplo:**    `/users/listall`

- ​	**Após ser executado, retornará um .json com todos os usuários INCLUINDO UM ID, cada user possui seu ID criado automaticamente pelo banco.**

  ```javascript
  {
      "_id": "619638ac1226f20f6c0dacb4",
      "nome": "Felipe",
      "user": "Felipao13",
      "password": "12345",
      "dataCriacao": "2021-11-18T11:27:40.388Z",
      "__v": 0
    }
  ```
  
- **Caso não tenha nada cadastrado no banco, irá retornar um .json vazio.**

  ```javascript
  [];
  ```

  

​				**`/listid/:id`** 

- ​	**/:id  , Na url precisamos passar o id do item que deseja visualizar, o ID passado na url tem de ter 24 caracteres**  

  **Exemplo:**      `/users/listid/619638ac1226f20f6c0dacb4`

  ```javascript
  {
      "_id": "619638ac1226f20f6c0dacb4",
      "nome": "Felipe",
      "user": "Felipao13",
      "password": "12345",
      "dataCriacao": "2021-11-18T11:27:40.388Z",
      "__v": 0
    }
  ```

  

- ​	**Usado quando o usuário deseja achar um país específico usando apenas seu id, sem necessitar de outras informações.**

- ​     **Caso o id passado na url, não tenha 24 caracteres ele não te deixará continuar, retornando um código de erro, e um status 400**

  ```javascript
  res.status(400).json({message: "Parâmetro incorreto"});
  ```

  

-    **Caso não exista nenhum país cadastrado no banco com o id procurado, irá retornar um código de erro.**

  ```javascript
  res.status(204).json({message: "Nada foi encontrado"});
  ```



​			**`/update/:id`** 

- ​	**/:id  , Na url precisamos passar o id do item em que deseja atualizar, sendo esse FIXO, INALTERÁVEL**

  **Exemplo:**      `/users/update/619638ac1226f20f6c0dacb4`

-    **Usado para atualizar informações já existentes no banco de dados na nuvem.**

- **Para atualizar esses dados é necessário passar todos os dados a seguir , porém com as novas informações que você deseja atualizar:**

  ```javascript
  {
  	"nome": "", //(Type: String)
  	"user": "", //(Type: String)
  	"password": "" //(Type: String)
  }
  
  ```

  

- ​     **Se for atualizado retornará um .json com uma mensagem de confirmação e um status 200.**

  ```javascript
  res.status(200).json({message: "Atualizado com sucesso"});
  ```

- **Caso contrário não for atualizado no banco, retornará uma mensagem de erro e um status 400.**

  ```javascript
  res.status(400).json({message: "Algo esta errado"});
  ```

  

​		**`/delete/:id`** 

- ​	**/:id  , Na url precisamos passar o id do item em que deseja atualizar, sendo esse FIXO, INALTERÁVEL**

  **Exemplo:**      `/users/delete/619638ac1226f20f6c0dacb4`

-    **Utilizamos o delete quando queremos remover algum país já cadastrado no banco.**

- **Caso o ID passado exista no banco, ele irá remove-lô do banco, ação irreversível e retornará uma mensagem de confirmação com o status 200.**

  ```javascript
  res.status(200).json({message: "Deletado com sucesso"});
  ```

  

- ​     **Porém se o ID passado na url não existir no banco, ele não irá achar nada para deletar assim retornando uma mensagem de erro com status 400.**

  ```javascript
  res.status(400).json({message: "Algo esta errado"});
  ```





## **Para Iniciar o Projeto Local Foi Necessário Instalar Os Seguintes Comandos**

**`npm init -y`**      (inicia um projeto node).

**`npm i express`**     (instala as dependências do express).

**`npm i nodemon`**  (criará a pasta node módulos).

**`npm i mongoose`**    (instala a lib para trabalhar com mongo db).

**`npm i dotenv`**     (instala a lib para tratativa de var de ambiente).

## Subindo para o Mongo Atlas na Nuvem

- Primeiro deve criar sua conta no Mongo Atlas, após isso:

  ​                     **Importando o mongoose no arquivo index.js da pasta conn que fica dentro de outra pasta chamada model**:

  ```javascript
  const mongoose = require("mongoose"); 
  ```

  ****

​                            **Então deve definir a string de conexão local ou atlas:**

```javascript
async function Conn(){
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_BASE}`,{ // Informações definidas no seu .env (PRIVADAS)	
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {  // tudo certo faz isso
        console.log("MongoDB esta conectado");
    }).catch((err) => {  // caso de erro faz isso
        console.error(err);
    });
};

module.exports = Conn;
```

## **Na pasta model temos 1 arquivo com suas seguintes definições e valores:**

​                                                                             **`usuario.js`**

```javascript
const mongoose = require("mongoose");   //importando o mongoose

const usuariosModel = new mongoose.Schema({  //criando nosso modelo do banco
    nome: { type: String, required: true },  // chave/ valor: tipo do valor e se é obrigatorio
    user: { type: String, required: true }, 
    password: { type: String, required: true }, 
    dataCriacao: { type: Date, default: Date.now }  //default, valor padrao caso nao seja passado
});

const Usuario = mongoose.model("usuarios", usuariosModel);  // a criacao do modelo na colection Cidades

module.exports = Usuario;  //exportando o modelo pronto
```

​      

###                                                                                                    Trabalho Realizado Solo:

##                                                                              **Felipe Pereira de Pádua**

######                      Espero ter ajudado na compreensão básica de como funciona este projeto e o que consta em suas dependências internas.

