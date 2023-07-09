
// TO DO:
// create users CRUD

const Router = require('koa-router');

const router = new Router();

//const {users} = require('../models');
const bcrypt = require('bcrypt');


router.get('/ratings', '/info', async (ctx) => {
  try {
    const sessionid = ctx.session.sessionid || ctx.headers.authorization;
    const session = await ctx.orm.sessions.findByPk(sessionid);
    const userid = session.userid;
    const user = await ctx.orm.users.findByPk(userid);
    let userinfo;
    console.log(user.type);
    if (user.type=="player"){
      userinfo = await ctx.orm.users.findByPk(userid,
        {
          include: [
            { model: ctx.orm.bookings },
          ],
        },
      );
    }
    else if (user.type=="owner"){
      userinfo = await ctx.orm.users.findByPk(userid,
        {
          include: [
            { model: ctx.orm.enclousures }
          ],
        },
      );
    }
    ctx.body = userinfo;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});


// Get players from a booking?????
// TO DO
router.get('/ratings', '//:id', async (ctx) => {
  try {
    
    

  } catch (error) {
    console.log(error);
    ctx.throw(500);
  }
});




// Rate a player
router.post('/ratings', '/player/:id', async (ctx) => {
  try {
    playerId = ctx.params.id;
    const player = await ctx.orm.users.findByPk(playerId);
    
    if (!player) {
      ctx.status = 404;
      ctx.body = { error: 'Player not found' };
    }

    else {
      data = {
        ratedid: playerId,
        rating: ctx.request.body.rating,
        type: 'player',
      };

      const rating = await ctx.orm.ratings.create(data);
      ctx.body = rating;
      ctx.status = 201;
    }

  } catch (error) {
    console.log(error);
    ctx.throw(500);
  }
});



// Rate a Enclousure
router.post('/ratings', '/enclousures/:id', async (ctx) => {
  try {
    enclousureId = ctx.params.id;
    const enclousure = await ctx.orm.enclousures.findByPk(enclousureId);
    
    if (!enclousure) {
      ctx.status = 404;
      ctx.body = { error: 'Enclousure not found' };
    }

    else {
      data = {
        ratedid: enclousureId,
        rating: ctx.request.body.rating,
        type: 'enclousure',
      };

      const rating = await ctx.orm.ratings.create(data);
      ctx.body = rating;
      ctx.status = 201;
    }

  } catch (error) {
    console.log(error);
    ctx.throw(500);
  }
});



// Get Ratings of a player
router.get('/ratings', '/players/:id', async (ctx) => {
  try {
    playerId = ctx.params.id;
    const player = await ctx.orm.users.findByPk(playerId);
    
    if (!player) {
      ctx.status = 404;
      ctx.body = { error: 'Player not found' };
    }

    else {
      const ratings = await ctx.orm.ratings.findAll({
        where: {
          ratedid: playerId,
          type: 'player',
        },
      });

      if (ratings.length == 0){
        console.log("no ratings")
        ctx.status = 204;
      }

      else {
        ctx.body = ratings;
        ctx.status = 210;
      }

      
    }

  } catch (error) {
    console.log(error);
    ctx.throw(500);
  }

});



// Get Ratings of an Enclousure
router.get('/ratings', '/enclousures/:id', async (ctx) => {
  try {
    enclousureId = ctx.params.id;
    const enclousure = await ctx.orm.enclousures.findByPk(enclousureId);
    
    if (!enclousure) {
      ctx.status = 404;
      ctx.body = { error: 'Enclousure not found' };
    }

    else {
      const ratings = await ctx.orm.ratings.findAll({
        where: {
          ratedid: enclousureId,
          type: 'enclousure',
        },
      });

      if (ratings.length == 0){
        console.log("no ratings")
        ctx.status = 204;
      }

      else {
        ctx.body = ratings;
        ctx.status = 210;
      }
    }

  } catch (error) {
    console.log(error);
    ctx.throw(500);
  }

});





// Update a player
router.put('/ratings', '/update',  async (ctx) => {
    try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const userid = session.userid;
    const user = await ctx.orm.users.findByPk(userid);
    console.log(user);
    if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
    }
    else {
        const { name, lastname, password, email, type } = ctx.request.body;
        await user.update({
          name,
          lastname,
          password,
          email,
          type
        });
        ctx.body = user;
    }
    } 
    catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Failed to update user' };
    }
  });
  
  //TODO
  // Delete a player
  router.delete('/ratings', '/delete',  async (ctx) => {
    try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const userid = session.userid;
    console.log(userid);
    const user = await ctx.orm.users.findByPk(userid);
      console.log(user);
      if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
      } else {
        await user.destroy({
          where: {
              id: userid
          }
      });
        ctx.body = { message: 'User deleted successfully' };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Failed to delete User' };
    }
  });





module.exports = router;