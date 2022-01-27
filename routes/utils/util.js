const H5ByMiniCompiler = require('../lib/h5ByMiniCompiler.js');

async function buildH5ByMini(str) {
  const h5ByMiniCompiler = new H5ByMiniCompiler({source: str});
  const code = await h5ByMiniCompiler.run();
  return code;
}


module.exports = { buildH5ByMini };
