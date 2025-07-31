# 🥗 Daily Diet API

> [!NOTE]
> While Fastify offers great flexibility in project structure, this project uses a **Modular Architecture** inspired by Clean Architecture. I chose this approach as part of my learning journey with Node.js to gain experience with patterns commonly found in real-world, large-scale applications.

Welcome to the **Daily Diet API**!s

This project is a backend application designed to help users track their daily meals, monitor their diet, and maintain a healthy lifestyle. It's built with a modern, scalable, and maintainable architecture to ensure a great developer experience and a reliable service.

Based on the following [Project Requirements](https://efficient-sloth-d85.notion.site/Desafio-02-be7cdb37aaf74ba898bc6336427fa410)

## ✨ Features

- **User Authentication**: Secure user registration and login using JWT.
- **Meal Tracking**: Create, read, update, and delete meals.
- **Diet Management**: Track whether a meal is within the user's diet plan.
- **Metrics**: Get statistics about your meals, such as total calories and how many meals are in your diet.

## 🛠️ Technologies & Architecture

This project is built with a focus on modern technologies and best practices.

### Core Technologies

- **[Node.js](https://nodejs.org/)**: A powerful JavaScript runtime for building fast and scalable server-side applications.
- **[Fastify](https://www.fastify.io/)**: A high-performance, low-overhead web framework for Node.js.
- **[TypeScript](https://www.typescriptlang.org/)**: For type safety and a better developer experience.
- **[Knex.js](https://knexjs.org/)**: A flexible SQL query builder for Node.js.
- **[Zod](https://zod.dev/)**: For schema declaration and validation.
- **[SQLite](https://www.sqlite.org/index.html)**: A lightweight, serverless, self-contained SQL database engine.

### Architecture

The project follows a **Modular, Layered Architecture** inspired by Clean Architecture principles:

- **Modular Design**: The codebase is organized by features (e.g., `users`, `meals`), making it easy to scale and maintain.
- **Layered Approach**: Each module is separated into three distinct layers:
  - **Controller**: Handles HTTP requests and responses.
  - **Service**: Contains the core business logic.
  - **Repository**: Manages all database interactions.

This structure ensures a clean separation of concerns, making the application highly testable and flexible.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/lucaskraus/daily-diet-api.git
    ```
2.  Create .env file in the root of directory just like `env.example`

3.  Install NPM packages
    ```sh
    npm install
    ```
4.  Run the migrations
    ```sh
    npm run knex -- migrate:latest
    ```
5.  Start the server
    ```sh
    npm run dev
    ```

## 📄 API Endpoints

You can explore and test the API endpoints using the Postman collection included in this project.

1.  Open Postman.
2.  Click on `Import`.
3.  Select the `postman-collection.json` file from the root of this project.

---

Made with ❤️ by [Lucas Kraus](https://github.com/lucaskraus)
