const router = require('koa-router')();


router.get('/', async (ctx, next) => {
    await ctx.render("index")
});

router.get('/page/aes', async (ctx, next) => {
    await ctx.render("aes")
});

router.get('/page/babelMinToH5', async (ctx, next) => {
    await ctx.render("babelMinToH5")
});

router.get('/page/colorFormat', async (ctx, next) => {
    await ctx.render("colorFormat")
});

router.get('/page/cssFormat', async (ctx, next) => {
    await ctx.render("cssFormat")
});

router.get('/page/customerMessage', async (ctx, next) => {
    await ctx.render("customerMessage")
});


router.get('/page/excelExport', async (ctx, next) => {
    await ctx.render("excelExport")
});

router.get('/page/imageFormat', async (ctx, next) => {
    await ctx.render("imageFormat")
});

router.get('/page/jsonFormat', async (ctx, next) => {
    await ctx.render("jsonFormat")
});

router.get('/page/jsRun', async (ctx, next) => {
    await ctx.render("jsRun")
});

router.get('/page/md5', async (ctx, next) => {
    await ctx.render("md5")
});

router.get('/page/rsa', async (ctx, next) => {
    await ctx.render("rsa")
});

router.get('/page/urlDecode', async (ctx, next) => {
    await ctx.render("urlDecode")
});

router.get('/page/urlFormat', async (ctx, next) => {
    await ctx.render("urlFormat")
});


module.exports = router;
