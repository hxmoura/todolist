
# 🎯 TODOLIST

  

<img  src="preview.png"  alt="preview"  style="border-radius: 25px">


## 📝 Sobre

Projeto fullstack com as funções de CRUD - ( CREATE, READ, UPDATE, DELETE ), sistema de cadastro e login com área privada para usuários logados, inclui ainda um sistema de Dark Mode e Light Mode, e uma simples filtragem de tarefas em um menu lateral.


## 🔍 Tecnologias utilizadas

``Front-end:`` ReactJS, SASS, Axios

######

``Back-end:`` Node, Bcrypt, Express, JSONWebtoken, Mongoose, MongoDB Atlas


## 🔧 Configuração

Execute os seguintes passos para a configuração do projeto:

**Back-end**
1. Execute o comando ``npm install``
2. Crie o arquivo ``.env`` na pasta raiz do **Backend**
3. Adicione as variaveis ***SECRET*** e ***DB_CONNECT***, seguidos pelo símbolo de igual, segue o exemplo abaixo:

```


SECRET=
DB_CONNECT=

```

Para **SECRET**, você poderá digitar qualquer coisa, uma vez que isso é uma chave única e que somente você terá acesso.
Para **DB_CONNECT**, você irá informar a URL que forneça acesso a um banco de dados.

Ao final, seu arquivo ``.env`` deverá ser algo semelhante a isso:

```


SECRET=ed9733e-5t80-436e-e046-347cj9d4d4k4
DB_CONNECT=mongodb+srv://user:password@cluster.yoyurat.mongodb.net/?retryWrites=true&w=majority

```

**Front-end**
1. Execute o comando ``npm install``
2. Dentro da pasta **frontend**, acesse o seguinte caminho: ``src > api > axios.js``
3. No arquivo **axios.js** você irá informar a URL do backend, para que o frontend possa acessar o backend
4. Siga os passos seguintes para **acesso local** e **acesso remoto**:

****Acesso remoto****
- Substitua a URL da *linha 5* pela URL do backend hospedado

****Acesso local****
- Remova a *linha 5*
- Remova as duas barras iniciais da *linha 4*



## 🚀 Funcionamento

  

Execute o comando para iniciar o projeto em localHost:

**Back-end**
```
npm run dev
```

**Front-end**
```
npm start
```

  

## 🤝 Colaboradores

  

<table>

<tr>

<td  align="center">

<a  href="https://github.com/hxmoura"  width="100px;">

<img  src="https://github.com/hxmoura.png"  width="130px;"  alt="Foto de Henrique Moura"/>

<br>

<strong>Henrique Moura</strong>

</a>

</td>

</tr>

</table>