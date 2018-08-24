const KoaRouter = require('koa-router');
const router = new KoaRouter();
module.exports = {
	mount (application) {
		Object.defineProperties(application, { "$koaRouter": { "get": () => { return router } } })
		let api = require('./api')
		for(let k1 in api) {
			for (let k2 in api[k1]) {
				let router = api[k1][k2]
				application.$koaInstance.use(router.routes()).use(router.allowedMethods());
			}
		}
	}
}