const Router = require('koa-router');
const router = new Router();
const {  Users, Bookings } = require('../models');

// Get all Bookings
router.get('/player', '/getbookings', async (ctx) => {
    try {
        const session = await ctx.orm.Sessions.findByPk(ctx.session.sessionid);
        const userid = session.userid;
        const bookings = await Bookings.findAll({        
            where: {
            playerId: userid
        }},);
        console.log(bookings)
        ctx.body = bookings;
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to get bookings' };
    }
  });


// create Booking for player
router.post('/player', '/booking', async (ctx) => {
    try {
    const session = await ctx.orm.Sessions.findByPk(ctx.session.sessionid);
    const userid = session.userid;
      const booking = await Bookings.create({
        active: true,
        playerId: userid,
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
router.get('/player', '/booking/:id', async (ctx) => {
    try {
        const session = await ctx.orm.Sessions.findByPk(ctx.session.sessionid);
        const userid = session.userid;
        const booking = await Bookings.findByPk(ctx.params.id);

      if (!booking) {
        ctx.status = 404;
        ctx.body = { error: 'booking not found' };
      } 
      else {
        if(booking.playerId == userid){
            ctx.body = booking;
            ctx.status = 201;
        }
        else{
            ctx.status = 404;
            ctx.body = { error: 'wrong booking' };
        }
      }
    } catch (error) {
        console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to find booking' };
    }
  });

  // Update booking //TODO
router.put('/player', '/booking/:id',  async (ctx) => {
    try {
        const session = await ctx.orm.Sessions.findByPk(ctx.session.sessionid);
        const userid = session.userid;
        const booking = await Bookings.findByPk(ctx.params.id);
        if (!booking) {
            ctx.status = 404;
            ctx.body = { error: 'booking not found' };
        }     
        else {
            const { active } = ctx.request.body;
            if (booking.playerId == userid){
                await booking.update({
                active
                });
                ctx.body = booking;
                ctx.status = 201;
            }
            else{
                ctx.status = 404;
                ctx.body = { error: 'wrong booking' };
            }
      }
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to update' };
    }
  });

//DETELE
router.delete('/player', '/booking/:id', async (ctx) => {
    try {
        const session = await ctx.orm.Sessions.findByPk(ctx.session.sessionid);
        const userid = session.userid;
        const booking = await Bookings.findByPk(ctx.params.id);
        if (!booking) {
            ctx.status = 404;
            ctx.body = { error: 'booking not found' };
        }     
        else {
            if (booking.playerId == userid){
                await booking.destroy();
                ctx.body = { message: 'booking deleted' };
                ctx.status = 201;
            }
            else{
                ctx.status = 404;
                ctx.body = { error: 'wrong booking' };
            }
        }   
    } catch (error) {
     console.error(error)
      ctx.status = 500;
      ctx.body = { error: 'Error' };
    }
  });

module.exports = router;