
// TO DO:
// create users CRUD

const Router = require('koa-router');

const router = new Router();

const {Users} = require('../models');



// Get all users
router.get('users', '/', async (ctx) => {
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




module.exports = router;