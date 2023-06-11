const Router = require('koa-router');
const router = new Router();
const { Enclousures, Users } = require('../models');




// Create an enclousure
router.post('/enclousures', '/create', async (ctx) => {
  try {
    // const ownerId = ctx.state.user.id;
    const owner = await Users.findByPk(1); // hardcoded for now
    console.log(owner);
    ownerId = owner.id;
    const enclousure = await Enclousures.create({
      name: ctx.request.body.name,
      ownerId: ownerId,
      address: ctx.request.body.address,
      district: ctx.request.body.district,
      phoneNumber:  ctx.request.body.phoneNumber,
      socialMedia: ctx.request.body.socialMedia,
      email: ctx.request.body.email
    });
    console.log(enclousure);
    ctx.body = enclousure;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to create enclousure' };
  }
});


// Get all Enclousures
router.get('/enclousures', '/', async (ctx) => {
  try {
    const enclousures = await Enclousures.findAll();
    console.log(enclousures)
    ctx.body = enclousures;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to retrieve enclousures' };
  }
});


// Get a single enclousure by ID
router.get('/enclousures', '/:id', async (ctx) => {
  try {
    const enclousure = await Enclousures.findByPk(ctx.params.id);
    console.log(enclousure);
    if (!enclousure) {
      ctx.status = 404;
      ctx.body = { error: 'Enclousure not found' };
    } else {
      ctx.body = enclousure;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to retrieve enclousure' };
  }
});


// Update an enclousure
router.put('/enclousures', '/:id/update',  async (ctx) => {
  try {
    const enclousure = await Enclousures.findByPk(ctx.params.id);
    console.log(enclousure);
    if (!enclousure) {
      ctx.status = 404;
      ctx.body = { error: 'Enclousure not found' };
    } else {
      const { name, address, district, phoneNumber, socialMedia, email } = ctx.request.body;
      await enclousure.update({
        name,
        address,
        district,
        phoneNumber,
        socialMedia,
        email
      });
      ctx.body = enclousure;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to update enclousure' };
  }
});



// Delete an enclousure
router.delete('/enclousures', '/:id/delete', async (ctx) => {
  try {
    const enclousure = await Enclousures.findByPk(ctx.params.id);
    console.log(enclousure);
    if (!enclousure) {
      ctx.status = 404;
      ctx.body = { error: 'Enclousure not found' };
    } else {
      await enclousure.destroy();
      ctx.body = { message: 'Enclousure deleted successfully' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to delete enclousure' };
  }
});




module.exports = router;
