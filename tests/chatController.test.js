const request = require('supertest');
const app = require('../server');  // Import the app
let server;

// Mock specific methods of LangChain modules
jest.mock('langchain', () => ({
  Memory: jest.fn(),
  Callbacks: jest.fn().mockImplementation(() => {
    return { on: jest.fn() };
  })
}));

// Mock ChromaDB
jest.mock('chromadb', () => {
  return jest.fn().mockImplementation(() => {
    return {
      config: jest.fn(),
      createCollection: jest.fn().mockReturnValue({
        add: jest.fn()
      })
    };
  });
});

// Start the server before all tests
beforeAll(() => {
  server = app.listen(3001);
});

// Close the server after all tests
afterAll((done) => {
  server.close(done);
});

test('GET /api/chat', async () => {
  const response = await request(app).get('/api/chat');
  expect(response.status).toBe(200);
  // Add more assertions as needed
});

test('POST /api/chat', async () => {
  const response = await request(app).post('/api/chat').send({ message: 'Hello' });
  expect(response.status).toBe(200);
  // Add more assertions as needed
});