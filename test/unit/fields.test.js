const request = require('supertest');
const server = require('../../src/app');
const sinon = require('sinon');
const { Fields } = require('../../src/models');

// Set up the server before running the tests
beforeAll((done) => {
  const { port } = server.address();
  done();
}, 10000);

// Close the server after all tests are done
afterAll((done) => {
  server.close(done);
});

test('Hello world works', async () => {
  const response = await request(server).get('/');
  expect(response.status).toBe(200);
  expect(response.text).toBe('Hello World!');
});

test('should return all fields', async () => {
  const response = await request(server).get('/fields/');
  expect(response.status).toBe(200);
});

test('should return the field with the given ID', async () => {
  const fieldId = 13;
  const mockField = { id: fieldId, name: 'Field 1' };

  // Stub the Fields.findByPk() method
  const findByPkStub = sinon.stub(Fields, 'findByPk').resolves(mockField);

  const response = await request(server).get(`/fields/${fieldId}`);

  expect(response.status).toBe(200);
  expect(response.body).toEqual(mockField);

  // Assert that Fields.findByPk() was called with the correct argument
  //sinon.assert.calledWithExactly(findByPkStub, fieldId);

  // Restore the stubbed method
  findByPkStub.restore();
});
