const Router = require('koa-router');

const users = require("./routes/users.js");
const enclousures = require('./routes/enclousures.js');
const fields = require('./routes/fields.js');
const availabilities = require('./routes/availabilities.js');
const bookings = require('./routes/bookings.js');

const router = new Router();

// RUTAS
router.use('/users',users.routes())
router.use('/enclousures',enclousures.routes())
router.use('/fields',fields.routes());
router.use('/availabilities',availabilities.routes());
router.use('/bookings',bookings.routes());




module.exports = router;