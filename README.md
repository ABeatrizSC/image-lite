# Project Image Lite  


https://github.com/user-attachments/assets/13879340-90ef-4022-acb0-30c7cd1772ff


## About  
This project functions as an image repository developed with Spring Boot, ReactJS, and NextJS, allowing users to create accounts, upload JPEG, PNG, and GIF images, view and download them.  

## Project Structure  
- `imagelite`: This folder contains the front-end code of the application, built with TypeScript, ReactJS, and NextJS.  
- `imageliteapi`: Stores the back-end code for the REST API developed using Java and Spring Boot.  

## Features  
- User creation  
- View uploaded images  
- Add new images  
- Download images  

## Technologies Used  

* **Java**: A high-level, object-oriented programming language widely used for building server-side applications, web services, and Android applications.

* **TypeScript**: A superset of JavaScript that adds static typing, making code easier to read, debug, and maintain.

* **Spring Boot**: A framework that simplifies the development of Java applications by providing built-in features for dependency injection, configuration, and microservices support.

* **ReactJS**: A JavaScript library for building user interfaces, focusing on creating reusable UI components and managing the view layer in web applications.

* **Next.js**: A React framework that enables server-side rendering (SSR) and static site generation (SSG) for optimized web applications, along with built-in routing and API handling.

* **PostgreSQL**: A powerful, open-source relational database system known for its robustness, extensibility, and advanced features such as JSON support and full ACID compliance.

* **Docker**: A platform that allows developers to automate the deployment of applications inside lightweight containers, ensuring consistency across different environments and simplifying the setup process.

* **Spring Security**: A powerful and customizable authentication and access control framework for Java applications.

* **JWT (JSON Web Token)**: A compact, URL-safe means of representing claims to be transferred between two parties. In this application, JWT is used for securely transmitting information about the user’s identity and for maintaining stateless authentication in a microservices architecture.

* **TailwindCSS**: A utility-first CSS framework that allows developers to build modern, responsive designs by composing utility classes directly in the HTML.

* **Lombok**: A Java library that reduces boilerplate code by generating common methods like getters, setters, constructors, and more through annotations.

* **MapStruct**: A code generator that simplifies the mapping of Java bean properties, making it easier to convert between different object models and reducing the amount of manual mapping code required.

* **JPA**: The Java Persistence API, a specification that provides object-relational mapping (ORM) to manage relational data in Java applications.

* **Formik**: A library for building and managing forms in React, providing features like validation, state management, and submission handling.

* **JWT-Decode**: A small library for decoding JSON Web Tokens, allowing easy extraction of information from the token payload.

* **React-Toastify**: A React library for displaying customizable toast notifications in a simple and consistent manner.

* **Yup**: A JavaScript schema validation library, commonly used with Formik to define validation schemas for forms.

* **Postman**: A tool used for API testing and development, enabling users to send HTTP requests, inspect responses, and automate API tests.

## Requirements  
To run the project on your machine, the following tools must be installed and configured beforehand:  

- Docker  
- Git  

Optional for local development or testing:  

- Java Development Kit (JDK) 17  
- Apache Maven  
- Node.js  
- Postman  

## Installation guide
Follow the steps below to download, configure, and run the project in your environment:

1. **Clone the repository**
```bash
git clone https://github.com/ABeatrizSC/image-lite.git
 ```

2. **Navigate to the project directory**

```bash
cd image-lite
 ```

3. **Initialize the docker container**

 ```bash
docker-compose up
 ```

## Endpoints - Back-End API

### Summary of Endpoints  

| **Endpoint**                    | **HTTP Method** | **Description**                                                                                   | **Parameters/Request Body**                                                      |
|----------------------------------|-----------------|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| `/v1/images`                    | POST            | Uploads an image with metadata (name and tags). Requires authentication with a bearer token.      | - `file`: Multipart file <br> - `name`: String <br> - `tags`: List of strings    |
| `/v1/images/{id}`               | GET             | Retrieves the binary content of an image by its ID.  | - `id`: Path variable (String)                                                  |
| `/v1/images`                    | GET             | Searches for images based on extension and query string.                                          | - `extension`: Query parameter (optional, default: "") <br> - `query`: Query parameter (optional) |
| `/v1/users`                     | POST            | Creates a new user.                                                                               | - Request body: `UserDTO`                                                       |
| `/v1/users/auth`                | POST            | Authenticates a user and returns a JWT token.                                                    | - Request body: `CredentialsDTO`                                                |

### User Registration
* Endpoint: /v1/users
* HTTP method: POST

#### Request Body
```json
{
    "name": "user",
    "email": "user@email.com",
    "password": "user1234"
}
 ```

#### Response Body (Success) 
`201 Created`

#### Possible responses to errors and exceptions
`409 Conflict`
```json
{
    "error": "User already exists!"
}
 ```

### User Authentication
* Endpoint: /users/auth
* HTTP method: POST

#### Request Body
```json
{
    "email": "user@email.com",
    "password": "user1234"
}
 ```

#### Response Body (Success)
```json
{
  "accessToken": "your Bearer Token appears here"
}
 ```

#### Possible responses to errors and exceptions
`401 Unauthorized`: Incorrect email or password.

### Save images
* Endpoint: /v1/images
* HTTP method: POST
* You must be authenticated

#### Request Body - form-data
![alt text](/src/images/image.png)

#### Request Authorization
`Bearer Token`

![alt text](/src/images/image-1.png)

#### Response Body (Success)
`201 Created`

#### Possible responses to errors and exceptions
`403 Forbidden`: Invalid token.

### Get images
* Endpoint: /v1/images
* HTTP method: GET

#### Response Body (Success)
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

### Search an image
* Endpoint: /v1/images?extension=:extension&query=:query
* HTTP method: GET

#### Query Params
- `extension`: Query parameter (optional, default: "")
- `query`: Query parameter (optional, default: "")

![alt text](/src/images/image-2.png)

#### Response Body (Success)
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

### Get an image by Id
* Endpoint: /v1/images/:id
* HTTP method: GET

#### Response Body (Success)
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

#### Possible responses to errors and exceptions
`404 Not Found`

## Contact
* GitHub: [ABeatrizSC](https://github.com/ABeatrizSC)
* Linkedin: [Ana Beatriz Santucci Carmoni](www.linkedin.com/in/ana-carmoni)
* Email: [anabeatrizscarmoni@gmail.com](mailto:anabeatrizscarmoni@gmail.com)
