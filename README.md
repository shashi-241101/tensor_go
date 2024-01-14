******Project Setup Guide******
This guide will help you set up and run the client-side of your project using Vite.

*****Prerequisites*****
Before you begin, ensure you have the following installed on your machine:

Node.js (v14.0.0 or higher)
npm (v7.0.0 or higher)
*****Installation***
Clone the repository to your local machine:

git clone <repository-url>
Change to the project directory:
cd client
Install project dependencies:
npm install
****Usage*****
Development
To run the development server:
npm run dev
This will start the development server, and you can view your app at http://localhost:3000

****Project Structure*****
src: Contains the main source code of your React application.
public: Contains static assets like images, icons, etc.
vite.config.js: Configuration file for Vite.

****Dependencies****
axios: HTTP client for making requests.
esbuild: JavaScript bundler used by Vite.
node-sass: Sass compiler for styling.
react: JavaScript library for building user interfaces.
react-dom: DOM-specific methods for React.
react-router-dom: Library for routing in React applications.
react-transition-group: Helps with animations during component lifecycle changes.
uuidv4: Utility for generating UUIDs.

*****Dev Dependencies*****
@types/react: TypeScript type definitions for React.
@types/react-dom: TypeScript type definitions for React DOM.
@vitejs/plugin-react: Vite plugin for React.
eslint: JavaScript and TypeScript linter.
eslint-plugin-react: ESLint plugin for React.
eslint-plugin-react-hooks: ESLint plugin for React hooks.
eslint-plugin-react-refresh: ESLint plugin for React Refresh.
sass: Sass preprocessor for styling.
vite: Build tool for modern web development.

****Server Setup Guide****
This guide will assist you in setting up and running the server-side of your project using Node.js and Express.

*******Prerequisites******
Before you begin, ensure you have the following installed on your machine:

Node.js (v14.0.0 or higher)
npm (v7.0.0 or higher)
******Installation********
Clone the repository to your local machine:
git clone <repository-url>
Change to the project directory:
cd server

****Install project dependencies:***
npm install

******Development****
To run the development server using nodemon:
npm run dev
This will start the server, and you can access it at http://localhost:3001.

****Production****
To run the server in production mode:

npm start
This will start the server using node.

******Project Structure******
index.js: Main entry point for your Express application.
routes: Directory containing route files for different parts of your application.
models: Directory for MongoDB schema models.
db: Directory for MongoDB connection and setup.
middlewares: Directory for custom middleware functions.
config: Directory for configuration files, such as environment variables.
public: Directory for static assets.
views: Directory for server-rendered views (if applicable).
scripts: Directory for scripts (e.g., database seed scripts).

******Dependencies******
axios: HTTP client for making requests.
cookie-session: Middleware for handling session data in cookies.
cors: Middleware for enabling Cross-Origin Resource Sharing.
dotenv: Loads environment variables from a .env file.
express: Web framework for building server-side applications.
express-session: Middleware for handling sessions in Express.
mongoose: MongoDB object modeling for Node.js.
nodemon: Utility that monitors for changes and restarts the server.
passport: Authentication middleware for Node.js.
passport-google-oauth2: Passport strategy for authenticating with Google using OAuth2.0.
