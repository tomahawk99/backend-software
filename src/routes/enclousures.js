const Router = require('koa-router');
const router = new Router();
const { Enclousures } = require('../models');




// Create an enclousure
// FALTA COMPROBAR QUE FUNCIONE, en vola necesito obtener el ownerId
router.post('/enclousures', async (ctx) => {
  try {
    const { name, address, district, phoneNumber, socialMedia, email } = ctx.request.body;
    // const ownerId = ctx.state.user.id;
    const enclousure = await Enclousures.create({
      name,
      // ownerId,
      address,
      district,
      phoneNumber,
      socialMedia,
      email
    });
    console.log(enclousure);
    ctx.body = enclousure;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to create enclousure' };
  }
});


// Get all Enclousures
router.get('enclousures', '/', async (ctx) => {
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



module.exports = router;
