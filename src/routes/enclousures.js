const Router = require('koa-router');
const router = new Router();
const { enclousures, users } = require('../models');




// Create an enclousure
router.post('/enclousures', '/', async (ctx) => {
  try {
    // const ownerid = ctx.state.user.id;
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const userid = session.userid;
    const owner = await users.findByPk(userid); 
    console.log(owner);
    ownerid = owner.id;
    const enclousure = await ctx.orm.enclousures.create({
      name: ctx.request.body.name,
      ownerid: ownerid,
      address: ctx.request.body.address,
      district: ctx.request.body.district,
      phonenumber:  ctx.request.body.phonenumber,
      socialmedia: ctx.request.body.socialmedia,
      maxplayers: ctx.request.body.maxplayers,
      manager: ctx.request.body.manager,
      price: ctx.request.body.price,
      email: ctx.request.body.email
    });
    const unselected = ctx.request.body.unselected;
    unselected.forEach(element => {
      console.log(element);
      let availability = ctx.orm.availabilities.create({
        fieldid: enclousure.id,
        available: true,
        hour: element
      })
    });
    console.log(enclousure);
    ctx.body = enclousure;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to create enclousure' };
  }
});


// Get all enclousures
router.get('/enclousures', '/', async (ctx) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const userid = session.userid;
    console.log(userid)
    const enclousures = await ctx.orm.enclousures.findAll({
        where: {
            ownerid: userid
        }
    });
    console.log(enclousures)
    ctx.body = enclousures;
  } 
  catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to retrieve enclousures' };
  }
});


// Get a single enclousure by ID
router.get('/enclousures', '/:id', async (ctx) => {
  try {
    const enclousure = await ctx.orm.enclousures.findByPk(ctx.params.id);
    console.log(enclousure);
    if (!enclousure) {
        ctx.status = 404;
        ctx.body = { error: 'Enclousure not found for user' };
    } 
    else {
      ctx.body = enclousure;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to retrieve enclousure' };
  }
});


// Update an enclousure
router.put('/enclousures', '/:id',  async (ctx) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const userid = session.userid;
    const enclousure = await ctx.orm.enclousures.findByPk(ctx.params.id);
    console.log(enclousure);
    if (!enclousure) {
        ctx.status = 404;
        ctx.body = { error: 'Enclousure not found' };
    } 
    else {
      if(userid!=enclousure.ownerid){
        ctx.status = 401;
        ctx.body = { error: 'enclousure doesnt belong to user' };
      }
      else{
      const { name, address, district, phonenumber, socialmedia, email } = ctx.request.body;
      await enclousure.update({
        name,
        address,
        district,
        phonenumber,
        socialmedia,
        email,
        maxplayers,
        manager,
        price
      });
      ctx.body = enclousure;
    }
  }
} catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to update enclousure' };
  }
});



// Delete an enclousure
router.delete('/enclousures', '/:id', async (ctx) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const userid = session.userid;
    const enclousure = await enclousures.findByPk(ctx.params.id);
    console.log(enclousure);
    if (!enclousure) {
        ctx.status = 404;
        ctx.body = { error: 'Enclousure not found for user' };
    } else {
      if(userid!=enclousure.ownerid){
        ctx.status = 401;
        ctx.body = { error: 'enclousure doesnt belong to user' };
      }
      else{
        await enclousure.destroy();
        ctx.body = { message: 'Enclousure deleted successfully' };
      }
  }
} catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to delete enclousure' };
  }
});




module.exports = router;
