const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const { OpenAI } = require('langchain/llms/openai');
const { Memory, Callbacks } = require('langchain');
const { ChromaClient } = require('chromadb');
const { pipeline } = require('@xenova/transformers');

const app = express();
const port = process.env.NODE_ENV === 'test' ? 3001 : 3000;

const memory = new Memory();
const callbacks = new Callbacks();

let sentimentAnalysisPipeline;
let chromaDB;
let chatCollection;

const initialize = async () => {
  try {
    sentimentAnalysisPipeline = await pipeline('sentiment-analysis');
    chromaDB = new ChromaClient({ path: 'http://localhost:8000' });
    chromaDB.config({ dimensions: 300, metric: 'euclidean' });
    chatCollection = chromaDB.createCollection('chat');
  } catch (error) {
    console.error("Initialization failed:", error);
    process.exit(1);
  }
};

callbacks.on('new_message', async (message) => {
  console.log(`New message received: ${message}`);
  
  if (sentimentAnalysisPipeline) {
    const sentiment = await sentimentAnalysisPipeline(message);
    const doc = { message: message, vector: [0.1, 0.2, 0.3] };
    chatCollection.add(doc);
  } else {
    console.log("Sentiment analysis pipeline not initialized yet.");
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', chatRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

if (require.main === module) {
  initialize().then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  });
}

module.exports = app;
