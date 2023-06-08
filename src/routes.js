const Router = require('koa-router');

const users = require("./routes/users.js");
const enclousures = require('./routes/enclousures.js');
const fields = require('./routes/fields.js');
const availabilities = require('./routes/availabilities.js');
const bookings = require('./routes/bookings.js');
const auth_middle = require('./middlewares/auth.js');
const auth = require('./routes/auth.js');
const jwt = require('koa-jwt');

const router = new Router();

// RUTAS
router.use('/auth',auth.routes());

router.use('/users', auth_middle, users.routes());
router.use('/enclousures', auth_middle, enclousures.routes());
router.use('/fields', auth_middle, fields.routes());
router.use('/availabilities', auth_middle, availabilities.routes());
router.use('/bookings', auth_middle, bookings.routes());

router.use(jwt({secret : process.env.JWT_SECRET,key: 'tokendata'}));


module.exports = router;