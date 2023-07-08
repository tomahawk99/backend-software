const request = require('supertest');
//const server = require('../../src/app');
const sinon = require('sinon');
const app = require('../../src/app');
const { Enclousures } = require('../../src/models');
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

test('should return all enclousures', async () => {
    const response = await request(server).get('/enclousures/');
    expect(response.status).toBe(200);
  });

test('should return the enclousure with the given ID', async () => {
    const EnclousureId = 13;
    const mockEnclousure= { id: EnclousureId, name: 'deportes uc' };
  
    // Stub the Fields.findByPk() method
    const findByPkStub = sinon.stub(Enclousures, 'findByPk').resolves(mockEnclousure);
  
    const response = await request(server).get(`/enclousures/${EnclousureId}`);
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockEnclousure);
  
  
    // Restore the stubbed method
    findByPkStub.restore();
  });

test('should create a new Enclousure', async () => {
    const mockEnclousure = {
      name: "Deportes UC",
      ownerId: 3,
      address: "Avenida deportes 123",
      district: "Las condes",
      phoneNumber:  "+569 12345678",
      socialMedia: "@deportesuc",
      email: "canchas@deportesuc.cl"
    };
  
    // Make a POST request to create a new field
    const response = await request(server)
      .post('/enclousure/create')
      .send(mockEnclousure);
  
    // Log the error message if the response status is not 200
    if (response.status !== 200) {
      console.error('Error:', response.body.error);
    }
  
    // Expect a successful response
    expect(response.status).toBe(200);
  
  
    // Assert that Users.findByPk() was called with the correct argument
  
  });

  test('should update a enclousure', async () => {
    // Create a mock field
    const mockEnclousure = await Enclousures.create({
      name: "Deportes UC",
      ownerId: 3,
      address: "Avenida deportes 1234",
      district: "Las condes",
      phoneNumber:  "+569 123453678",
      socialMedia: "@deportesssuc",
      email: "canchassss@deportessuc.cl"
    });
  
    // Update the field with new values
    const updatedEnclousure = {
      name: "Deportes UC",
      ownerId: 3,
      address: "Avenida deportes 123",
      district: "Las condes",
      phoneNumber:  "+569 87654321",
      socialMedia: "@deportesuc",
      email: "canchas@deportesuc.cl"
    };
  
    // Send a PUT request to update the field
    const response = await request(server)
      .put(`/enclousures/${mockEnclousure.id}/update`)
      .send(updatedEnclousure);
  
    // Expect a successful response
    expect(response.status).toBe(200);
    //expect(response.body).toEqual(expect.objectContaining(updatedField));
  
    // Retrieve the field from the database to verify the update
    // const field = await Fields.findByPk(mockField.id);
    // expect(field).toEqual(expect.objectContaining(updatedField));
  });

  test('should delete a field', async () => {
    // Create a mock field
    const mockEnclousure = await Enclousures.create({
      name: "Deportes UC2",
      ownerId: 3,
      address: "Avenida deportes 12322",
      district: "Las condes",
      phoneNumber:  "+569 876543212",
      socialMedia: "@deportesuc1",
      email: "canchasss@deportesuc.cl"
    });
  
    // Send a DELETE request to delete the field
    const response = await request(server).delete(`/enclousures/${mockEnclousure.id}/delete`);
  
    // Expect a successful response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Enclousure deleted successfully' });
  
    // Verify that the field is deleted from the database
    const enclousure = await Enclousures.findByPk(mockEnclousure.id);
    expect(enclousure).toBeNull();
  });