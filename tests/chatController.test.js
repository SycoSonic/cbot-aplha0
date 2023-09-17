const request = require('supertest');
const app = require('../server');  // Import the app
let server;

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

