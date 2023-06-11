const Router = require('koa-router');
const router = new Router();
const {  Users, Bookings } = require('../models');

// Get all Bookings
router.get('/bookings', '/', async (ctx) => {
    console.log("aca");
    try {
      const bookings = await Bookings.findAll();
      console.log(bookings)
      ctx.body = bookings;
    } catch (error) {
        console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Failed get bookings' };
    }
  });


// Create a field
router.post('/bookings', '/create', async (ctx) => {
    try {
      const booking = await Bookings.create({
        active: ctx.request.body.active,
        playerId: ctx.request.body.playerId,
        availabilityId: ctx.request.body.availabilityId,
        fieldId: ctx.request.body.fieldId,
      });
      ctx.body = booking;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error };
    }
  });

  // Get one field
router.get('/bookings', '/:id', async (ctx) => {
    try {
      const booking = await Bookings.findByPk(ctx.params.id);
      if (!booking) {
        ctx.status = 404;
        ctx.body = { error: 'booking not found' };
      } else {
        ctx.body = booking;
      }
    } catch (error) {
        console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to find booking' };
    }
  });

  // Update 
router.put('/bookings', '/:id/update',  async (ctx) => {
    try {
      const field = await Bookings.findByPk(ctx.params.id);
      if (!field) {
        ctx.status = 404;
        ctx.body = { error: 'Field not found' };
      } else {
        const { active, playerId, availabilityId, fieldId } = ctx.request.body;
        await field.update({
            active,
            playerId,
            availabilityId,
            fieldId
        });
        ctx.body = field;
      }
    } catch (error) {
        console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to update' };
    }
  });

//DETELE
router.delete('/bookings', '/:id/delete', async (ctx) => {
    try {
      const booking = await Bookings.findByPk(ctx.params.id);
      if (!booking) {
        ctx.status = 404;
        ctx.body = { error: 'booking not found' };
      } else {
        await booking.destroy();
        ctx.body = { message: 'booking deleted' };
      }
    } catch (error) {
     console.error(error)
      ctx.status = 500;
      ctx.body = { error: 'Error' };
    }
  });

module.exports = router;