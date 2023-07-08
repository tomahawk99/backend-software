const request = require('supertest');
//const server = require('../../src/app');
const sinon = require('sinon');
const app = require('../../src/app');
const { Users } = require('../../src/models');
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

test('should return all users', async () => {
    const response = await request(server).get('/users/');
    expect(response.status).toBe(200);
  });

  test('should return the user with the given ID', async () => {
    const userId = 13;
    const mockUser = { id: userId, name: 'kdb' };
  
    // Stub the Fields.findByPk() method
    const findByPkStub = sinon.stub(Users, 'findByPk').resolves(mockUser);
  
    const response = await request(server).get(`/users/${userId}`);
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  
  
    // Restore the stubbed method
    findByPkStub.restore();
  });
  
test('should create a new user', async () => {
    const mockUser = {
        name: 'leo',
        lastName: 'messi',
        password: '1234',
        email: 'leo@messi.com',
        type: 1
    };
  
    // Make a POST request to create a new field
    const response = await request(server)
      .post('/users/create')
      .send(mockUser);
  
    // Log the error message if the response status is not 200
    if (response.status !== 200) {
      console.error('Error:', response.body.error);
    }
  
    // Expect a successful response
    expect(response.status).toBe(200);
  
  
    // Assert that Users.findByPk() was called with the correct argument
  
  });

  test('should update a user', async () => {
    // Create a mock field
    const mockUser = await Users.create({
        name: 'leo',
        lastName: 'messi',
        password: '1234',
        email: 'leo@messi.com',
        type: 1
    });
  
    const updatedUser = {
        number: 2,
        EnclousureId: 2,
        maxPlayers: 12,
        minPlayers: 6,
        playerAmount: 10,
      };

  
    // Send a PUT request to update the field
    const response = await request(server)
      .put(`/users/${mockUser.id}/update`)
      .send(updatedUser);
  
    // Expect a successful response
    expect(response.status).toBe(200);
    //expect(response.body).toEqual(expect.objectContaining(updatedField));
  
    // Retrieve the field from the database to verify the update
    // const field = await Fields.findByPk(mockField.id);
    // expect(field).toEqual(expect.objectContaining(updatedField));
  });
