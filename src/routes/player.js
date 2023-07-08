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


router.get('/player', '/dates/:id', async(ctx) => {
  console.log("aca");
  const canchaId = ctx.params.cancha_id;
  const enclousure_id = canchaId;


  try{
    ctx
    const Enclousure = await ctx.orm.enclousures.findByPk(enclousure_id);
    //console.log(Enclousure);
    let dates = await ctx.orm.availabilities.findAll({
      where: {
        fieldid: Enclousure.id,
        available: true
      }
    })
    ctx.body = dates;
  }
  catch(error){
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to get data' };
  }
});

// LISTOO
router.get('/player', '/datesinfo/:id/:fecha', async(ctx) => {
  console.log("datesinfo");
  const canchaId = ctx.params.id;
  const fecha = ctx.params.fecha.toString();
  try{
    let new_dictionary = {};
    const Enclousure = await ctx.orm.enclousures.findByPk(canchaId);
    const Date = fecha;

    console.log(Date);
    let dates = await ctx.orm.availabilities.findAll({
      where: {
        fieldid: Enclousure.id
      }
    })
    console.log(Object.keys(dates).length);
    // Element = availability
    dates.forEach(element => {
      if (element.hour === null){
       return;
      }
      let hour = element.hour
      console.log("INFOOO");
      console.log(element.hour);
      console.log(element.id);
      const n_bookings =  (async () => {
        let n =await ctx.orm.bookings.count({ where: { availabilityid: element.id } });
        console.log(element.hour, n);
        return n
      })();
      console.log("a");
      console.log(n_bookings);
      console.log("b");
      let variable = {quantity_bookings: n_bookings, hour: hour, EnclousureId: Enclousure.id, date: Date, availability_id: element.id };
      
      new_dictionary[hour] = variable;
      
    });
    ctx.body = new_dictionary;
  }
  catch(error){
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to get data' };
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

// Revisar
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
      let availability = await ctx.orm.availabilities.findByPk(ctx.request.body.availabilityid);
      await availability.update({
        available: false
      })
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

  // Revisar
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

    // Revisar
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
                const availability = await ctx.orm.availabilities.findByPk(booking.availabilityid)
                await availability.update({
                  available: true
                })
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