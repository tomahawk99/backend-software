module.exports = async (ctx, next) => {
    try {
        const session = await ctx.orm.Sessions.findByPk(ctx.session.sessionid);
        const userid = session.userid;
        const user = await ctx.orm.Users.findByPk(userid);
        if (!user.type!="admin") {
            ctx.throw(403,"Access Denied");
        }
    } catch (error) {
        ctx.throw(error);
    }
};