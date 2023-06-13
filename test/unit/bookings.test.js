const request = require('supertest');
//const server = require('../../src/app');
const sinon = require('sinon');
const app = require('../../src/app');
const { Bookings } = require('../../src/models');
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

test('should return all bookings', async () => {
    const response = await request(server).get('/bookings/');
    expect(response.status).toBe(200);
  });

test('should return the booking with the given ID', async () => {
    const bookingId = 13;
    const mockBooking = { id: bookingId, name: 'Field 1' };
  
    // Stub the Fields.findByPk() method
    const findByPkStub = sinon.stub(Bookings, 'findByPk').resolves(mockBooking);
  
    const response = await request(server).get(`/bookings/${bookingId}`);
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBooking);
  
  
    // Restore the stubbed method
    findByPkStub.restore();
  });

test('should create a new booking', async () => {
    const mockBooking = {
      active: "true",
      playerId: 1,
      availabilityId: 91,
      fieldId: 13,
    };
  
    // Make a POST request to create a new field
    const response = await request(server)
      .post('/bookings/create')
      .send(mockBooking);
  
    // Log the error message if the response status is not 200
    if (response.status !== 200) {
      console.error('Error:', response.body.error);
    }
  
    // Expect a successful response
    expect(response.status).toBe(200);
  
  
    
  });

test('should update a booking', async () => {
    // Create a mock field
    const mockBooking = await Bookings.create({
      active: "true",
      playerId: 1,
      availabilityId: 91,
      fieldId: 13,
    });
  
    // Update the field with new values
    const updatedBooking = {
      active: "false",
      playerId: 1,
      availabilityId: 91,
      fieldId: 13,
    };
  
    // Send a PUT request to update the field
    const response = await request(server)
      .put(`/bookings/${mockBooking.id}/update`)
      .send(updatedBooking);
  
    // Expect a successful response
    expect(response.status).toBe(200);
  
  });

test('should delete a field', async () => {
    // Create a mock field
    const mockBooking = await Bookings.create({
      active: "true",
      playerId: 1,
      availabilityId: 91,
      fieldId: 13,
    });
  
    // Send a DELETE request to delete the field
    const response = await request(server).delete(`/bookings/${mockBooking.id}/delete`);
  
    // Expect a successful response
    expect(response.status).toBe(200);
    //expect(response.body).toEqual({ message: 'booking deleted' });
  
    // Verify that the field is deleted from the database
    const booings = await Bookings.findByPk(mockBooking.id);
    expect(booings).toBeNull();
  });