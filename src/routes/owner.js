const Router = require('koa-router');
const router = new Router();
const { Enclousures, Users } = require('../models');



// Get all Enclousures
router.get('/owner', '/enclousures', async (ctx) => {
    try {
        const session = await ctx.orm.Sessions.findByPk(ctx.session.sessionid);
        const userid = session.userid;
        const enclousures = await Enclousures.findAll({
            where: {
                ownerId: userid
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
  
  router.post('/owner', '/createenclosure', async (ctx) => {
    try {
      // const ownerId = ctx.state.user.id;
      const session = await ctx.orm.Sessions.findByPk(ctx.session.sessionid);
      const userid = session.userid;
      const owner = await Users.findByPk(userid); // hardcoded for now
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
  
  // Get a single enclousure by ID
  router.get('/owner', '/enclousure/:id', async (ctx) => {
    try {
        const session = await ctx.orm.Sessions.findByPk(ctx.session.sessionid);
        const userid = session.userid;
        const enclousure = await Enclousures.findByPk(ctx.params.id);
        console.log(enclousure);
        if (!enclousure || userid!=enclousure.ownerId) {
            ctx.status = 404;
            ctx.body = { error: 'Enclousure not found' };
        } 
        else {
            ctx.body = enclousure;
        }
    } 
    catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Failed to retrieve enclousure' };
    }
  });
  
  
  // Update an enclousure
  router.put('/owner', '/enclousure/:id',  async (ctx) => {
    try {
        const session = await ctx.orm.Sessions.findByPk(ctx.session.sessionid);
        const userid = session.userid;
        const enclousure = await Enclousures.findByPk(ctx.params.id);
        console.log(enclousure);
        if (!enclousure || userid!=enclousure.ownerId) {
            ctx.status = 404;
            ctx.body = { error: 'Enclousure not found' };
        } 
        else {
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
  router.delete('/owner', '/enclousure/:id', async (ctx) => {
    try {
        const session = await ctx.orm.Sessions.findByPk(ctx.session.sessionid);
        const userid = session.userid;
        const enclousure = await Enclousures.findByPk(ctx.params.id);
        console.log(enclousure);
        if (!enclousure || userid!=enclousure.ownerId) {
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
  