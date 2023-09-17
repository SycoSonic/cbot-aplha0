const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const { OpenAI } = require('langchain/llms/openai');
const { Memory, Callbacks } = require('langchain');  // Import LangChain modules

const app = express();
const port = process.env.NODE_ENV === 'test' ? 3001 : 3000;

// Initialize LangChain Memory and Callbacks
const memory = new Memory();
const callbacks = new Callbacks();

callbacks.on('new_message', (message) => {
  console.log(`New message received: ${message}`);
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
  // This block will only run if this file is started directly (not required as a module)
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}
module.exports = app;  // Export the app