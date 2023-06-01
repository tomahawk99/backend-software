
// TO DO:
// create users CRUD

const Router = require('koa-router');

const router = new Router();

const user = {player:"userById"};

router.get('users.ById', '/', async (ctx) => {
    ctx.body = JSON.stringify(user);
  });






module.exports = router;