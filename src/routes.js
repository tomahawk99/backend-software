const Router = require('koa-router');

const users = require("./routes/users.js");

const router = new Router();

router.use('/users',users.routes())






module.exports = router;