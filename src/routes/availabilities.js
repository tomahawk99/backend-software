const Router = require('koa-router');
const router = new Router();
const { Availabilities, Users, Fields } = require('../models');

// Get all Fields
router.get('/availabilities', '/', async (ctx) => {
    try {
      const availabilities = await Availabilities.findAll();
      ctx.body = availabilities;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Failed get availabilities' };
    }
  });


// Create a field
router.post('/availabilities', '/create', async (ctx) => {
    try {
        console.log("availabiltyyy");
      const availbility = await Availabilities.create({
        fieldId: ctx.request.body.fieldId,
        timestart: ctx.request.body.timestart,
        timeend: ctx.request.body.timeend,
        available: ctx.request.body.available,
      });
      ctx.body = availbility;
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = { error };
    }
  });

  // Get one field
router.get('/availabilities', '/:id', async (ctx) => {
    try {
      const availability = await Availabilities.findByPk(ctx.params.id);
      if (!availability) {
        ctx.status = 404;
        ctx.body = { error: 'availability not found' };
      } else {
        ctx.body = availability;
      }
    } catch (error) {
        console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to find field' };
    }
  });

  // Update 
router.put('/availabilities', '/:id/update',  async (ctx) => {
    try {
      const updated_availabilty = await Availabilities.findByPk(ctx.params.id);
      if (!updated_availabilty) {
        ctx.status = 404;
        ctx.body = { error: 'Availability not found' };
      } else {
        const { fieldId, timestart, timeend, available} = ctx.request.body;
        await updated_availabilty.update({
            fieldId,
            timestart,
            timeend,
            available
        });
        ctx.body = updated_availabilty;
      }
    } catch (error) {
        console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to update' };
    }
  });

//DETELE
router.delete('/availabilities', '/:id/delete', async (ctx) => {
    try {
      const availability = await Availabilities.findByPk(ctx.params.id);
      if (!availability) {
        ctx.status = 404;
        ctx.body = { error: 'availability not found' };
      } else {
        await availability.destroy();
        ctx.body = { message: 'availability deleted' };
      }
    } catch (error) {
     console.error(error)
      ctx.status = 500;
      ctx.body = { error: 'Error' };
    }
  });

module.exports = router;