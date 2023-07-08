const request = require('supertest');
//const server = require('../../src/app');
const sinon = require('sinon');
const app = require('../../src/app');
const { Availabilities, Fields } = require('../../src/models');
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


test('should return all availabilities', async () => {
    const response = await request(server).get('/availabilities/');
    expect(response.status).toBe(200);
  });

  test('should return the availability with the given ID', async () => {
    const availabilityId = 1;
    const mockAvailability = { id: availabilityId, name: 'Field 1' };
  
    // Stub the Fields.findByPk() method
    const findByPkStub = sinon.stub(Availabilities, 'findByPk').resolves(mockAvailability);
  
    const response = await request(server).get(`/availabilities/${availabilityId}`);
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAvailability);
  
  
    // Restore the stubbed method
    findByPkStub.restore();
  });
  
  test('should create a new availability', async () => {
    const mockAvailability = {
        fieldId: 91,
        timestart: Date.now(),
        timeend: Date.now(),
        available: true
    };
  
    // Make a POST request to create a new field
    const response = await request(server)
      .post('/availabilties/create')
      .send(mockAvailability);
  
    // Log the error message if the response status is not 200
    if (response.status !== 200) {
      console.error('Error:', response.body.error);
    }
  
    // Expect a successful response
    expect(response.status).toBe(200);
  
  
    // Assert that Users.findByPk() was called with the correct argument
  
  });

  test('should update a availability', async () => {
    try {
        const mockField = await Fields.create({
            number: 1,
            EnclousureId: 1,
            maxPlayers: 10,
            minPlayers: 5,
            playerAmount: 8,
          });
      // Create a mock availability
      const mockAvailability = await Availabilities.create({
        fieldId: mockField.id,
        timestart: Date.now(),
        timeend: Date.now(),
        available: true
      });
  
      // Update the availability with new values
      const updatedAvailability = {
        fieldId: 13,
        timestart: Date.now(),
        timeend: Date.now(),
        available: false
      };
  
      // Send a PUT request to update the availability
      const response = await request(server)
        .put(`/availabilities/${mockAvailability.id}/update`)
        .send(updatedAvailability);
  
      // Expect a successful response
      expect(response.status).toBe(200);
      // expect(response.body).toEqual(expect.objectContaining(updatedAvailability));
  
      // Retrieve the availability from the database to verify the update
      // const availability = await Availabilities.findByPk(mockAvailability.id);
      // expect(availability).toEqual(expect.objectContaining(updatedAvailability));
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  });
  
  test('should delete a availability', async () => {
    // Create a mock field
    const mockField = await Fields.create({
      number: 1,
      EnclousureId: 1,
      maxPlayers: 10,
      minPlayers: 5,
      playerAmount: 8,
    });

    const mockAvailability = await Availabilities.create({
        fieldId: mockField.id,
        timestart: Date.now(),
        timeend: Date.now(),
        available: true
      });
  
    // Send a DELETE request to delete the field
    const response = await request(server).delete(`/availabilities/${mockAvailability.id}/delete`);
  
    // Expect a successful response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'availability deleted' });
  
    // Verify that the field is deleted from the database
    const availability = await Availabilities.findByPk(mockAvailability.id);
    expect(availability).toBeNull();
  });