const router = require('koa-router')();


router.get('/', async (ctx, next) => {
    await ctx.render("index")
});

router.get('/page/babelMinToH5', async (ctx, next) => {
    await ctx.render("babelMinToH5")
});

module.exports = router;
