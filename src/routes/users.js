
// TO DO:
// create users CRUD

const Router = require('koa-router');

const router = new Router();

const {Users} = require('../models');



// Create a user
router.post('/users', '/create', async (ctx) => {
  try {
    const user = await Users.create({
      name: ctx.request.body.name,
      lastName: ctx.request.body.lastName,
      password: ctx.request.body.password,
      email: ctx.request.body.email,
      type: ctx.request.body.type
    });
    console.log(user);
    ctx.body = user;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to create user' };
  }
});


// Get all users
router.get('/users', '/', async (ctx) => {
  try {
    const users = await Users.findAll();
    console.log(users)
    ctx.body = users;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to retrieve enclousures' };
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