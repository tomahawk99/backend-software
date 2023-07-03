const session = require("koa-session");

module.exports = async (ctx, next) => {

    const sessionid = ctx.session.sessionid | ctx.headers.authorization;
    console.log(ctx.session.sessionid)
    console.log(ctx.headers.authorization)
    console.log(sessionid)
    ctx.session.sessionid = sessionid;
    if (!sessionid) {
        ctx.throw(401,"You have to Log In");
    }

    try {
        const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
        if (session) {
            await next();
        } else {
            ctx.throw('Invalid Session, please Log In again');
        }
    } catch (error) {
        ctx.throw(error);
    }
};