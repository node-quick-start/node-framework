const Koa = require('koa')
let controllers = require('../app/controllers')
let middlewares = require('../app/middlewares')
let koaInstance = new Koa()
module.exports = {
	runKoa (application) {
		koaInstance['defaultUse'] = koaInstance['use']
		koaInstance['use'] = function (middleware) { return koaInstance.defaultUse(middleware.bind(application)) }
		Object.defineProperties(application, { "$koaInstance": { "get": () => { return koaInstance } } })
		middlewares.mount(application)
		controllers.mount(application)
		application.$koaInstance.listen(application.$envConfig.PORT || 3000)
		console.log('app run', application.$envConfig)
	}
}