const router = require('koa-router')();
const util = require('./utils/util');

router.post('/changeMiniToH5', async (ctx, next) => {
  let value = ctx.request.body.value;
  const result = await util.buildH5ByMini(value);
  ctx.body = { result: result};;
});

module.exports = router;
