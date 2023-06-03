const Router = require('koa-router');

const users = require("./routes/users.js");
const enclousures = require('./routes/enclousures.js');

const router = new Router();

router.use('/users',users.routes())

router.use('/enclousures',enclousures.routes())






module.exports = router;