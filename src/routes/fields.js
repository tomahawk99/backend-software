const Router = require('koa-router');
const router = new Router();
const { Enclousures, Users, Fields } = require('../models');

// Get all Fields
router.get('/fields', '/', async (ctx) => {
    console.log("aca");
    try {
      const fields = await Fields.findAll();
      console.log(fields)
      ctx.body = fields;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Failed get fields' };
    }
  });


// Create a field
router.post('/fields', '/create', async (ctx) => {
    try {
      // const ownerId = ctx.state.user.id;
      const owner = await Users.findByPk(1); 
      console.log(owner);
      ownerId = owner.id;
      const field = await Fields.create({
        number: ctx.request.body.number,
        EnclousureId: ctx.request.body.EnclousureId,
        maxPlayers: ctx.request.body.maxPlayers,
        minPlayers: ctx.request.body.minPlayers,
        playerAmount: ctx.request.body.playerAmount,
      });
      ctx.body = field;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error };
    }
  });

  // Get one field
router.get('/fields', '/:id', async (ctx) => {
    try {
      const field = await Fields.findByPk(ctx.params.id);
      if (!field) {
        ctx.status = 404;
        ctx.body = { error: 'field not found' };
      } else {
        ctx.body = field;
      }
    } catch (error) {
        console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to find field' };
    }
  });

  // Update 
router.put('/fields', '/:id/update',  async (ctx) => {
    try {
      const field = await Fields.findByPk(ctx.params.id);
      if (!field) {
        ctx.status = 404;
        ctx.body = { error: 'Field not found' };
      } else {
        const { number, EnclousureId, maxPlayers, minPlayers, playerAmount } = ctx.request.body;
        await field.update({
            number,
            EnclousureId,
            maxPlayers,
            minPlayers,
            playerAmount
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
router.delete('/fields', '/:id/delete', async (ctx) => {
    try {
      const field = await Fields.findByPk(ctx.params.id);
      if (!field) {
        ctx.status = 404;
        ctx.body = { error: 'Field not found' };
      } else {
        await field.destroy();
        ctx.body = { message: 'Field deleted' };
      }
    } catch (error) {
     console.error(error)
      ctx.status = 500;
      ctx.body = { error: 'Error' };
    }
  });

module.exports = router;