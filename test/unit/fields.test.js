const request = require('supertest');
const { startServer, closeServer } = require('./server');


beforeAll(startServer);
afterAll(closeServer);

test('Hello world works', async () => {
  const response = await request('http://localhost:3000').get('/');
  expect(response.status).toBe(200);
  expect(response.text).toBe('Hello World!');
});

test('should return all fields', async () => {
  const response = await request('http://localhost:3000').get('/fields/');
  expect(response.status).toBe(200);
});
