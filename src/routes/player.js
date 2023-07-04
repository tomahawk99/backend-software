const Router = require('koa-router');
const router = new Router();

// Get all bookings
router.get('/player', '/getenclousures', async (ctx) => {
  try {
      const enclosureList = await ctx.orm.enclousures.findAll();
      console.log(enclosureList)
      ctx.body = enclosureList;
  } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to get enclousures' };
  }
});

router.get('/player', '/getavailabilities/:id ', async (ctx) => {
  try {
      const availabilitiesList = await ctx.orm.availabilities.findAll({
        where: {
            fieldid: ctx.params.id
        }
    });
      console.log(availabilitiesList)
      ctx.body = availabilitiesList;
  } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to get availabilities' };
  }
});


router.get('/player', '/getbookings', async (ctx) => {
    try {
        const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
        const userid = session.userid;
        const Bookings = await ctx.orm.bookings.findAll({        
            where: {
            playerid: userid
        }},);
        console.log(Bookings)
        ctx.body = Bookings;
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to get bookings' };
    }
  });


// create Booking for player
router.post('/player', '/booking', async (ctx) => {
    try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const userid = session.userid;
      const booking = await ctx.orm.bookings.create({
        active: true,
        playerid: userid,
        availabilityid: ctx.request.body.availabilityid,
        fieldid: ctx.request.body.fieldid,
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
        const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
        const userid = session.userid;
        const booking = await ctx.orm.bookings.findByPk(ctx.params.id);

      if (!booking) {
        ctx.status = 404;
        ctx.body = { error: 'booking not found' };
      } 
      else {
        if(booking.playerid == userid){
            ctx.body = booking;
            ctx.status = 201;
        }
        else{
            ctx.status = 401;
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
        const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
        const userid = session.userid;
        const booking = await ctx.orm.bookings.findByPk(ctx.params.id);
        if (!booking) {
            ctx.status = 404;
            ctx.body = { error: 'booking not found' };
        }     
        else {
            const { active } = ctx.request.body;
            if (booking.playerid == userid){
                await booking.update({
                active
                });
                ctx.body = booking;
                ctx.status = 201;
            }
            else{
                ctx.status = 401;
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
        const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
        const userid = session.userid;
        const booking = await ctx.orm.bookings.findByPk(ctx.params.id);
        if (!booking) {
            ctx.status = 404;
            ctx.body = { error: 'booking not found' };
        }     
        else {
            if (booking.playerid == userid){
                await booking.destroy();
                ctx.body = { message: 'booking deleted' };
                ctx.status = 201;
            }
            else{
                ctx.status = 401;
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