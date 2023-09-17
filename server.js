const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const { OpenAI } = require('langchain/llms/openai');
const { Memory, Callbacks } = require('langchain');
const { ChromaClient } = require('chromadb');  // Make sure this matches the installed package name

const app = express();
const port = process.env.NODE_ENV === 'test' ? 3001 : 3000;

// Initialize LangChain Memory and Callbacks
const memory = new Memory();
const callbacks = new Callbacks();

// Initialize Chroma
//const chromaDB = new ChromaClient({ path: 'http://localhost:8000' }); // Comment this line UNTIL CHROMA ACC SETUP
// chromaDB.config({ dimensions: 300, metric: 'euclidean' }); // Comment this line UNTIL CHROMA ACC SETUP

// Create a collection
//const chatCollection = chromaDB.createCollection('chat'); // Comment this line UNTIL CHROMA ACC SETUP

callbacks.on('new_message', (message) => {
  console.log(`New message received: ${message}`);
  // Add a document to the collection
  //const doc = { message: message, vector: [0.1, 0.2, 0.3] };  // Replace vector with actual data // Comment this line UNTIL CHROMA ACC SETUP
  //chatCollection.add(doc); // Comment this line UNTIL CHROMA ACC SETUP
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use Routes
app.use('/api', chatRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}

module.exports = app;