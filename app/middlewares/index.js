let responseTime = require('./responseTime')
module.exports = {
	mount (application) {
		application.$koaInstance.use(responseTime)
	}
}