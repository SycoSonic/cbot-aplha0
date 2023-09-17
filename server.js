const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const { OpenAI } = require('langchain/llms/openai');

const app = express();
const port = process.env.NODE_ENV === 'test' ? 3001 : 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Initialize LangChain modules
// TODO: Initialize LangChain Memory and Callbacks here

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
