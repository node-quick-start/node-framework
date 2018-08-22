const Koa = require('koa')
const EnvConfig = require('./env.json') || {}
class Application {
	
	static runApp (cusConfig = {}) {
		const envConfig = Object.assign(EnvConfig, cusConfig)
		const application = new Application(envConfig)
		const koaInstance = new Koa()
		// response
		koaInstance.use(function (ctx) {
			ctx.body = 'Hello Koa';
			console.log(this)
		}.bind(application));
		
		koaInstance.listen(3000)
		console.log('app run', application.$envConfig)
	}
	
	constructor(envConfig) {
		this._$envConfig$_ = envConfig
	}
	
	get $envConfig () {
		return this._$envConfig$_
	}
}
module.exports = Application
