const Koa = require('koa');
const { koaBody } = require('koa-body');
const KoaLogger = require('koa-logger');

const app = new Koa();

app.use(KoaLogger());
app.use(koaBody());

app.use(async (ctx, next) => {
  ctx.body = 'Hello World!';
});

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});