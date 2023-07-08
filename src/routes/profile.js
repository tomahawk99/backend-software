
// TO DO:
// create users CRUD

const Router = require('koa-router');
const bcrypt = require('bcrypt');

const router = new Router();

//const {users} = require('../models');


router.get('/profile', '/info', async (ctx) => {
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
    else if (user.type=="admin"){
      const playersCount = await ctx.orm.users.count({ where: { type: "player" } });
      const ownersCount = await ctx.orm.users.count({ where: { type: "owner" } });
      const fieldsCount = await ctx.orm.fields.count();

      userinfo = {
        "players": playersCount,
        "owners": ownersCount,
        "fields": fieldsCount
      }
    }

    ctx.body = userinfo;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});


router.get('/profile', '/infoadmin', async (ctx) => {
  try {
    const sessionid = ctx.session.sessionid || ctx.headers.authorization;
    const session = await ctx.orm.sessions.findByPk(sessionid);
    const userid = session.userid;
    const user = await ctx.orm.users.findByPk(userid);
    let userinfo;
    console.log(user.type);

    const playersCount = await ctx.orm.users.count({ where: { type: "player" } });
    const ownersCount = await ctx.orm.users.count({ where: { type: "owner" } });
    const fieldsCount = await ctx.orm.fields.count();

    userinfo = {
      "players": playersCount,
      "owners": ownersCount,
      "fields": fieldsCount
    }
    
    ctx.body = userinfo;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

// Update a player
router.put('/profile', '/update',  async (ctx) => {
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
        console.log(ctx.request.body)
        const hashPassword = await bcrypt.hash(ctx.request.body.password, 5);
        const { name, email, password, type, phonenumber } = ctx.request.body;
        const updatedProperties = {
          name: user.name,
          password: user.password,
          email: user.email,
          type: user.type,
          phonenumber: user.phonenumber,
        };
  
        if (name!="") {
          updatedProperties.name = name;
        }
        if (email!="") {
          updatedProperties.email = email;
        }
        if (phonenumber!="") {
          updatedProperties.phonenumber = phonenumber;
        }
        if (password!="") {
          updatedProperties.password = hashPassword;
        }
        await user.update(updatedProperties);
        /*
        await user.update({
          name: name,
          password: user.password,
          email: email,
          type: user.type,
          phonenumber: phonenumber,
        });
        */
        console.log(user.name)
        console.log(user.phonenumber)
        ctx.body = user;
        console.log("var3")
    }
    } 
    catch (error) {
      console.log("yapisima3")
      ctx.status = 500;
      ctx.body = { error: 'Failed to update user' };
    }
  });
  
  //TODO
  // Delete a player
  router.delete('/profile', '/delete',  async (ctx) => {
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