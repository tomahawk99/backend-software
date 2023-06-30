const Router = require('koa-router');
const router = new Router();

// Get all fields
router.get('/fields', '/', async (ctx) => {
    console.log("aca");
    try {
      const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
      const userid = session.userid;
      const fields = await ctx.orm.fields.findAll({
          where: {
              ownerid: userid
          }
      });
      console.log(fields)
      ctx.body = fields;
  } 
  catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Failed to retrieve fields of owner' };
  }
  });


// Create a field
router.post('/fields', '/', async (ctx) => {
    try {
      // const ownerid = ctx.state.user.id;
      const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
      const userid = session.userid;
//testing
      const user = await ctx.orm.users.findByPk(userid);
      console.log(user.name);
//testing
      //sin check de tipo de usuario
      const field = await ctx.orm.fields.create({
        name: ctx.request.body.name,
        number: ctx.request.body.number,
        enclousureid: ctx.request.body.enclousureid,
        maxplayers: ctx.request.body.maxplayers,
        minplayers: ctx.request.body.minplayers,
        playeramount: ctx.request.body.playeramount,
        ownerid : userid,
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
      //const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
      //const userid = session.userid;
      const field = await ctx.orm.fields.findByPk(ctx.params.id);
      if (!field) {
        ctx.status = 404;
        ctx.body = { error: 'field not found' };
      } else {
        // if (field.ownerid != userid) {
        //   ctx.status = 401;
        //   ctx.body = { error: 'field doesnt belong to user' };
        // }
        // else{
          ctx.body = field;
        //}
      }
    } catch (error) {
        console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to find field' };
    }
  });

  // Update 
router.put('/fields', '/:id',  async (ctx) => {
    try {
      const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
      const userid = session.userid;
      const field = await ctx.orm.fields.findByPk(ctx.params.id);
      if (!field) {
        ctx.status = 404;
        ctx.body = { error: 'Field not found' };
      } 
      else {
        if (field.ownerid != userid) {
           ctx.status = 401;
           ctx.body = { error: 'field doesnt belong to user' };
        }
        else{
          const { name, number, enclousureid, maxplayers, minplayers, playeramount } = ctx.request.body;
          await field.update({
              number,
              name,
              enclousureid,
              maxplayers,
              minplayers,
              playeramount
          });
          ctx.body = field;
        }
      }
    } catch (error) {
        console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to update' };
    }
  });

//DETELE
router.delete('/fields', '/:id', async (ctx) => {
    try {
      const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
      const userid = session.userid;
      const field = await ctx.orm.fields.findByPk(ctx.params.id);
      if (!field) {
        ctx.status = 404;
        ctx.body = { error: 'Field not found' };
      } else {
        if (field.ownerid != userid) {
          ctx.status = 401;
          ctx.body = { error: 'field doesnt belong to user' };
       }
       else{
          await field.destroy();
          ctx.body = { message: 'Field deleted' };
       }
      }
    } catch (error) {
     console.error(error)
      ctx.status = 500;
      ctx.body = { error: 'Error' };
    }
  });

module.exports = router;