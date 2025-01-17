# Sistema de gerenciamento de cursos

Para instalar as dependências:

```bash
bun install
```

Para rodar o projeto:

```bash
bun run dev
```

------------------------------------------------------------------------------------------

## Documentação


#### Registrar um novo usuário

<details>
 <summary><code>POST</code> <code><b>/users</b></code> <code>cria um novo usuário na base de dados</code></summary>

##### Body params

> | Nome      |  Obrigatório     | Tipo do dado               | Descrição                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name      |  Sim | string   | Nome do usuário a ser criado  |
> | email      |  Sim | string   | Email do usuário a ser criado  |
> | password      |  Sim | string   | Senha do usuário a ser criado  |


##### Responses

> | HTTP code     | Content-type                      | Resposta                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `{"id": string, "name": string, "createdAt": string, "email": string}`                                                |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |


</details>

#### Achar um usuário por identificador

<details>
 <summary><code>GET</code> <code><b>/users/:userId</b></code> <code>busca pelo usuário com o identificador enviado</code></summary>

##### Path params

> | Nome      |  Obrigatório     | Tipo do dado               | Descrição                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | userId      |  Sim | string   | Identificador do usuário a ser buscado  |


##### Responses

> | HTTP code     | Content-type                      | Resposta                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"id": string, "name": string, "createdAt": string, "email": string}`                                 |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request", "context": Object}`                            |


</details>

------------------------------------------------------------------------------------------


#### Criar um curso

<details>
 <summary><code>POST</code> <code><b>/courses</b></code> <code>cria um novo curso na base de dados</code></summary>

##### Body params

> | Nome      |  Obrigatório     | Tipo do dado               | Descrição                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | title       |  Sim | string   | Título do novo curso  |
> | description |  Sim | string   | Descrição do novo curso  |
> | hours       |  Sim | string   | Horário do novo curso  |


##### Responses

> | HTTP code     | Content-type                      | Resposta                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `{"id": string, "title": string, "createdAt": string, "description": string, "hours": string}`                                 |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request", "context": Object}`                            |


</details>


#### Listar os cursos

<details>
 <summary><code>GET</code> <code><b>/courses</b></code> <code>lista todos os cursos cadastrados</code></summary>



##### Responses

> | HTTP code     | Content-type                      | Resposta                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"id": string, "title": string, "createdAt": string, "description": string, "hours": string}[]`                                 |             |

</details>

------------------------------------------------------------------------------------------


#### Matricular um usuário

<details>
 <summary><code>POST</code> <code><b>/enrollments</b></code> <code>matricula um usuário em um curso existente</code></summary>

##### Body params

> | Nome      |  Obrigatório     | Tipo do dado               | Descrição                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | userId       |  Sim | string   | Identificador de um usuário existente  |
> | courseId |  Sim | string   | Identificador de um curso existente  |


##### Responses

> | HTTP code     | Content-type                      | Resposta                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"id": string, "userId": string, "enrolledAt": string, "courseId": string}`                                 |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request", "context": Object}`                            |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found", "context": Object}`                            |

</details>

#### Listar matrículas de um usuário

<details>
 <summary><code>GET</code> <code><b>/enrollments/:userId</b></code> <code>lista matrículas de um usuário existente</code></summary>

##### Path params

> | Nome      |  Obrigatório     | Tipo do dado               | Descrição                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | userId       |  Sim | string   | Identificador de um usuário existente  |


##### Responses

> | HTTP code     | Content-type                      | Resposta                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"id": string, "userId": string, "enrolledAt": string, "courseId": string}`                                 |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request", "context": Object}`                            |
> | `404`         | `application/json`                | `{"code":"404","message":"Not Found", "context": Object}`                            |

</details>

------------------------------------------------------------------------------------------


## Projeto

> O projeto foi realizado utilizando express com bun. Além disso, escolhi o zod para a validação de dados nas requisições e utilizei o drizzle como ORM (a versão de integração do drizzle com o Neon, que hospeda o banco de dados postgreSQL)