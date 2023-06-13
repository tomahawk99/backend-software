const request = require('supertest');
//const server = require('../../src/app');
const sinon = require('sinon');
const app = require('../../src/app');
const { Fields, Users } = require('../../src/models');
const orm = require('../../src/models');

let server;

// Set up the server before running the tests
beforeAll(async () => {
  try {
    await orm.sequelize.authenticate(); // Connect to the database
    server = app.listen(3000);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
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


  // Restore the stubbed method
  findByPkStub.restore();
});

test('should create a new field', async () => {
  const mockField = {
    number: 1,
    EnclousureId: 1,
    maxPlayers: 10,
    minPlayers: 5,
    playerAmount: 8,
  };

  // Make a POST request to create a new field
  const response = await request(server)
    .post('/fields/create')
    .send(mockField);

  // Log the error message if the response status is not 200
  if (response.status !== 200) {
    console.error('Error:', response.body.error);
  }

  // Expect a successful response
  expect(response.status).toBe(200);


  // Assert that Users.findByPk() was called with the correct argument

});
  
test('should update a field', async () => {
  // Create a mock field
  const mockField = await Fields.create({
    number: 1,
    EnclousureId: 1,
    maxPlayers: 10,
    minPlayers: 5,
    playerAmount: 8,
  });

  // Update the field with new values
  const updatedField = {
    number: 2,
    EnclousureId: 2,
    maxPlayers: 12,
    minPlayers: 6,
    playerAmount: 10,
  };

  // Send a PUT request to update the field
  const response = await request(server)
    .put(`/fields/${mockField.id}/update`)
    .send(updatedField);

  // Expect a successful response
  expect(response.status).toBe(200);
  //expect(response.body).toEqual(expect.objectContaining(updatedField));

  // Retrieve the field from the database to verify the update
  // const field = await Fields.findByPk(mockField.id);
  // expect(field).toEqual(expect.objectContaining(updatedField));
});

test('should delete a field', async () => {
  // Create a mock field
  const mockField = await Fields.create({
    number: 1,
    EnclousureId: 1,
    maxPlayers: 10,
    minPlayers: 5,
    playerAmount: 8,
  });

  // Send a DELETE request to delete the field
  const response = await request(server).delete(`/fields/${mockField.id}/delete`);

  // Expect a successful response
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ message: 'Field deleted' });

  // Verify that the field is deleted from the database
  const field = await Fields.findByPk(mockField.id);
  expect(field).toBeNull();
});