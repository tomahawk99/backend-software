
// TO DO:
// create users CRUD

const Router = require('koa-router');

const router = new Router();

const {Users} = require('../models');
const bcrypt = require('bcrypt');


router.get('user.show', '/profile', async (ctx) => {
  try {
    const session = await ctx.orm.Sessions.findByPk(ctx.session.sessionid);
    const userid = session.userid;
    const user = await ctx.orm.Users.findByPk(userid);
    let userinfo;
    console.log(user.type);
    if (user.type=="player"){
      userinfo = await ctx.orm.Users.findByPk(userid,
        {
          include: [
            { model: ctx.orm.Bookings },
          ],
        },
      );
    }
    else if (user.type=="owner"){
      userinfo = await ctx.orm.Users.findByPk(userid,
        {
          include: [
            { model: ctx.orm.Enclousures }
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


// Get all users
//solo para admin
router.get('/users', '/', async (ctx) => {
  const session = await ctx.orm.Sessions.findByPk(ctx.session.sessionid);
  const userid = session.userid;
  const user = await ctx.orm.Users.findByPk(userid);
  let userinfo;
  console.log(user.type);
  if (user.type=="admin"){
    try {
      const users = await Users.findAll();
      console.log(users)
      ctx.body = users;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Failed to retrieve users' };
    }
  }
  else{
    ctx.status = 403;
    ctx.body = { error: 'Access Denied' };
  }
});

// Get a single user by ID
router.get('/users', '/:id', async (ctx) => {
  try {
    const user = await Users.findByPk(ctx.params.id);
    console.log(user);
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
    } else {
      ctx.body = user;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to retrieve User' };
  }
});


// Update a user
router.put('/users', '/:id/update',  async (ctx) => {
  try {
    const user = await Users.findByPk(ctx.params.id);
    console.log(user);
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
    } else {
      const { name, lastName, password, email, type } = ctx.request.body;
      await user.update({
        name,
        lastName,
        password,
        email,
        type
      });
      ctx.body = user;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to update user' };
  }
});


// Delete a user
router.delete('/users', '/:id/delete', async (ctx) => {
  try {
    const user = await Users.findByPk(ctx.params.id);
    console.log(user);
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
    } else {
      await user.destroy();
      ctx.body = { message: 'User deleted successfully' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to delete User' };
  }
});



module.exports = router;