Introduction 1.2a

This is a chatbot project that leverages LangChain and other technologies to provide a seamless conversational experience. This README aims to guide you through the setup process and provide an overview of the project.

Prerequisites

- Node.js: Download and Install
- Yarn: Download and Install
- Yarn add express
- Yarn add ws
- Yarn add axios
- Yarn add chromadb
- yarn add @xenova/transformers
- yarn add onnxjs
- OpenAI API key

Installation (CMD line):
- Clone the repository: 
	- git clone https://github.com/SycoSonic/cbot-aplha0.git
	- cd cbot-aplha0

- Install Node.js dependencies: 
	- npm install

- Install Yarn: 
	- yarn install
	- yarn add cors
	- yarn add express ws axios
	- yarn add chromadb

- Install LangChain: 
	- yarn add langchain

- Run Tests: 
	- yarn add --dev jest supertest
	- yarn test

Project Structure:
server.js: Entry point for the server
/routes: Contains API routes
/controllers: Handles API requests
/tests: Contains Jest test files

Environment Variables:

- NODE_ENV: Set to development or production
- PORT: Default is 3000

Testing:
We use Jest for unit testing and Supertest for API testing. 
Run tests using:
- yarn test


Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

License

This project is licensed under the MIT License - see the LICENSE.md file for details.
