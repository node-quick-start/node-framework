const isObject = require('../../libs/utils/isObject')
const KoaRouter = require('koa-router');
const requireDirectory = require('require-directory');
const router = new KoaRouter();
module.exports = {
	registerRouter (application, routers) {
		isObject(routers) && Object.keys(routers).forEach((key) => {
			let router = routers[key]
			if (router instanceof KoaRouter) {
				application.$koaInstance.use(router.routes()).use(router.allowedMethods());
			} else {
				this.registerRouter(application, router)
			}
		})
	},
	mount (application) {
		Object.defineProperties(application, { "$koaRouter": { "get": () => { return router } } })
		let routers = requireDirectory(module, '../controllers');
		this.registerRouter(application, routers)
	}
}