# Projeto Image Lite  

https://github.com/user-attachments/assets/13879340-90ef-4022-acb0-30c7cd1772ff

[README: en-us](/README.md)

## Sobre  
Este projeto consiste em um repositório de imagens desenvolvido com Spring Boot, ReactJS e NextJS, permitindo que os usuários criem contas, façam upload de imagens nos formatos JPEG, PNG e GIF, visualizem e as baixem.

## Estrutura do Projeto  
- **`imagelite`**: Pasta contendo o código front-end da aplicação, desenvolvido com TypeScript, ReactJS e NextJS.  
- **`imageliteapi`**: Pasta que armazena o código back-end da API REST desenvolvida em Java e Spring Boot.  

## Funcionalidades  
- Criação de usuários;  
- Visualização/Busca de imagens postadas;  
- Adição de novas imagens;  
- Download de imagens.  

## Tecnologias Utilizadas  
- **Java**: Linguagem de programação orientada a objetos amplamente utilizada para criar aplicações no servidor, serviços web e aplicações Android.  

- **TypeScript**: Um superset do JavaScript que adiciona tipagem estática.  
- **Spring Boot**: Um framework que simplifica o desenvolvimento de aplicações Java, oferecendo recursos integrados para injeção de dependência, configuração e suporte a microsserviços.  
- **ReactJS**: Uma biblioteca JavaScript para construir interfaces de usuário, com foco na criação de componentes reutilizáveis e no gerenciamento da camada de visualização em aplicações web.  
- **Next.js**: Um framework React que permite renderização no lado do servidor (SSR) e geração de sites estáticos (SSG) para otimização de aplicações web, além de roteamento e manipulação de APIs embutidos.  
- **PostgreSQL**: Um sistema de banco de dados relacional open-source.  
- **Docker**: Uma plataforma que permite aos desenvolvedores automatizar a implantação de aplicações dentro de contêineres leves, garantindo consistência entre diferentes ambientes e simplificando o processo de configuração.  
- **Spring Security**: Um framework poderoso e personalizável para autenticação e controle de acesso em aplicações Java.  
- **JWT (JSON Web Token)**: Padrão aberto que permite a transmissão segura de informações de autenticação.  
- **TailwindCSS**: Um framework CSS baseado em utilitários que permite construir designs modernos e responsivos compondo classes diretamente no HTML.  
- **Lombok**: Uma biblioteca Java que reduz o código repetitivo gerando métodos comuns como getters, setters, construtores e mais através de anotações.  
- **JPA**: A API de Persistência Java, uma especificação que fornece mapeamento objeto-relacional (ORM) para gerenciar dados relacionais em aplicações Java.  
- **Formik**: Uma biblioteca para construir e gerenciar formulários no React, oferecendo recursos como validação, gerenciamento de estado e manipulação de submissões.  
- **Yup**: Uma biblioteca de validação de schemas JavaScript, frequentemente usada com o Formik para definir esquemas de validação para formulários.  
- **React-Toastify**: Uma biblioteca React para exibir notificações toast personalizáveis de maneira simples e consistente.  
- **JWT-Decode**: Uma pequena biblioteca para decodificar JSON Web Tokens, facilitando a extração de informações do payload do token.  
- **Postman**: Uma ferramenta utilizada para teste e desenvolvimento de APIs, permitindo enviar requisições HTTP, inspecionar respostas e automatizar testes de API.  

## Requisitos  
Para executar o projeto em sua máquina, é necessário que as seguintes ferramentas estejam instaladas e configuradas previamente:  

- Docker  
- Git  

Opcional para desenvolvimento local ou testes:  

- Java Development Kit (JDK) 17  
- Apache Maven  
- Node.js  
- Postman  

## Guia de Instalação  
Siga o passo a passo abaixo para clonar e executar o projeto em sua máquina:

1. **Clone o repositório**  
```bash
git clone https://github.com/ABeatrizSC/image-lite.git
 ```

2. **Navegue até o diretório do projeto**

```bash
cd image-lite
 ```

3. **Inicie o container Docker**

 ```bash
docker-compose up
 ```

## Front-End - Screens/Pages
-  `/login`: Página onde o usuário pode fazer login ou se registrar.

-  `/galery`: Nesta página, os usuários podem visualizar todas as imagens postadas, fazer download ao clicar nelas, buscar e aplicar filtros para encontrar outras imagens. Além disso, ao clicar no botão "Adicionar Novo", os usuários são redirecionados para a página /form para publicar uma nova imagem. O usuário só poderá acessar esta página se estiver autenticado (logado em sua conta).

- `/form`: Formulário com todos os campos obrigatórios para publicação de uma nova imagem. O usuário só poderá acessar esta página se estiver autenticado (logado em sua conta).

**Se o usuário não estiver autenticado ou acessar um caminho diferente dos mencionados acima, será exibida a página 404 Not Found.**

## Back-End - Endpoints da API

Se você deseja testar a API usando o Postman, aqui estão todos os endpoints, requisições, respostas e outras informações importantes.

### Resumo dos Endpoints  

| **Endpoint**                    | **Método HTTP** | **Descrição**                                                                                   | **Parâmetros/Corpo da Requisição**                                                      |
|----------------------------------|-----------------|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| `/v1/images`                    | POST            | Faz upload de uma imagem com metadados (nome e tags). Requer autenticação com token bearer.      | - `file`: Arquivo Multipart <br> - `name`: String <br> - `tags`: Lista de strings       |
| `/v1/images/{id}`               | GET             | Recupera o conteúdo binário de uma imagem pelo seu ID.                                           | - `id`: Variável de caminho (String)                                                  |
| `/v1/images`                    | GET             | Pesquisa por imagens com base na extensão e na string de consulta.                               | - `extension`: Parâmetro de consulta (opcional, padrão: "") <br> - `query`: Parâmetro de consulta (opcional) |
| `/v1/users`                     | POST            | Cria um novo usuário.                                                                            | - Corpo da requisição: `UserDTO`                                                       |
| `/v1/users/auth`                | POST            | Autentica um usuário e retorna um token JWT.                                                     | - Corpo da requisição: `CredentialsDTO`                                                |

### Criar um usuário
* Endpoint: /v1/users
* Método HTTP: POST

#### Request Body
```json
{
    "name": "user",
    "email": "user@email.com",
    "password": "user1234"
}
 ```

#### Response Body (Sucesso) 
`201 Created`

#### Possíveis respostas a erros e exceções
`409 Conflict`
```json
{
    "error": "User already exists!"
}
 ```

### Autenticar usuário
* Endpoint: /users/auth
* Método HTTP: POST

#### Request Body
```json
{
    "email": "user@email.com",
    "password": "user1234"
}
 ```

#### Response Body (Sucesso)
```json
{
  "accessToken": "your Bearer Token appears here"
}
 ```

#### Possíveis respostas a erros e exceções
`401 Unauthorized`: Incorrect email or password.

### Salvar uma imagem
* Endpoint: /v1/images
* Método HTTP: POST
* **Você precisa estar autenticado para acessar este endpoint**

#### Request Body - form-data
![alt text](/src/images/image.png)

#### Request Authorization
`Bearer Token`

![alt text](/src/images/image-1.png)

#### Response Body (Sucesso)
`201 Created`

#### Possíveis respostas a erros e exceções
`403 Forbidden`: Invalid token.

### Obter todas as images
* Endpoint: /v1/images
* Método HTTP: GET

#### Response Body (Sucesso)
`200 OK`
```json
[
    {
        "url": "imageURL",
        "name": "imageName",
        "extension": "PNG",
        "size": 8474,
        "uploadDate": "15/01/2025",
        "tags": "tag1, tag2"
    }
]
 ```

### Procurar uma imagem pela extensão, nome ou tag
* Endpoint: /v1/images?extension=:extension&query=:query
* Método HTTP: GET

#### Query Params
- `extension`: Query parameter (opcional, padrão: "")
- `query`: Query parameter (opcional, padrão: "")

![alt text](/src/images/image-2.png)

#### Response Body (Sucesso)
`200 OK`
```json
[
    {
        "url": "imageURL",
        "name": "imageName",
        "extension": "PNG",
        "size": 8474,
        "uploadDate": "15/01/2025",
        "tags": "tag1, tag2"
    }
]
```

### Obter uma imagem pelo seu ID
* Endpoint: /v1/images/:id
* Método HTTP: GET

#### Response Body (Sucesso)
`200 OK`
```json
[
    {
        "url": "imageURL",
        "name": "imageName",
        "extension": "PNG",
        "size": 8474,
        "uploadDate": "15/01/2025",
        "tags": "tag1, tag2"
    }
]
```

#### Possíveis respostas a erros e exceções
`404 Not Found`

## Contato
* GitHub: [ABeatrizSC](https://github.com/ABeatrizSC)
* Linkedin: [Ana Beatriz Santucci Carmoni](www.linkedin.com/in/ana-carmoni)
* Email: [anabeatrizscarmoni@gmail.com](mailto:anabeatrizscarmoni@gmail.com)
