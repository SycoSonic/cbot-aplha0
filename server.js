const express = require('express');
const cors = require('cors');
const winston = require('winston');
const chatRoutes = require('./routes/chatRoutes');
const { OpenAI } = require('langchain/llms/openai');
const { Memory, Callbacks } = require('langchain');
const { ChromaClient } = require('chromadb');
const { pipeline } = require('@xenova/transformers');

// Initialize Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

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
    logger.error(`Initialization failed: ${error.message}`);
    process.exit(1);
  }
};

callbacks.on('new_message', async (message) => {
  logger.info(`New message received: ${message}`);
  
  if (sentimentAnalysisPipeline) {
    const sentiment = await sentimentAnalysisPipeline(message);
    const doc = { message: message, vector: [0.1, 0.2, 0.3] };
    chatCollection.add(doc);
  } else {
    logger.warn('Sentiment analysis pipeline not initialized yet.');
  }
});

// Middleware for logging requests
app.use((req, res, next) => {
  logger.info(`Request received: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', chatRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Error occurred: ${err.message}`);
  res.status(500).send('Internal Server Error');
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

if (require.main === module) {
  initialize().then(() => {
    app.listen(port, () => {
      logger.info(`Server running at http://localhost:${port}/`);
    });
  });
}

module.exports = app;