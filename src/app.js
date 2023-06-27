const Koa = require('koa');
const { koaBody } = require('koa-body');
const KoaLogger = require('koa-logger');
const cors = require('@koa/cors');
const router = require('./routes');
const orm = require('./models');
const session = require('koa-session');
const koaJWT = require('koa-jwt');

const app = new Koa();

app.use(cors({
  'Access-Control-Allow-Headers': ['cookie'],
  'Access-Control-Allow-Credentials' :true,
  'Access-Control-Allow-Origin': ['http://localhost:3001/','https://front-software2023-production.up.railway.app/']
}));
app.context.orm = orm;

app.use(KoaLogger());
app.use(koaBody());

app.keys = [`${process.env.SECRET_KEY}`];
const config = {
  httpOnly: false,

};
app.use(session(config,app))


app.use(router.routes());

app.use(async (ctx, next) => {
  ctx.body = 'Hello World!';
  ctx.set('Access-Control-Allow-Credentials', 'true');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, withcredentials'); // Asegúrate de incluir 'withcredentials' aquí
  await next();

});

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log('server is running at http://localhost:3000');
});


module.exports = app;
