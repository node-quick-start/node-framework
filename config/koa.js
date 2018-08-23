const Koa = require('koa')
module.exports = {
	runKoa (application) {
		const koaInstance = new Koa()
		// response
		koaInstance.use(async function (ctx) {
			// ctx.body = 'Hello Koa';
			console.log(111)
			let user = await this.User.find(1)
			ctx.body = user;
		}.bind(application));
		koaInstance.listen(application.$envConfig.PORT || 3000)
		console.log('app run', application.$envConfig)
	}
}