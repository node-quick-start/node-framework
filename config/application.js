const {activemodels} = require('../libs/autoload')
const envValues = require('./env.json') || {}
class Application {
	
	static runApp (cusConfig = {}) {
		const envConfig = Object.assign({}, envValues, cusConfig)
		const application = new Application(envConfig)
		require('./koa').runKoa(application)
	}
	
	constructor(envConfig) {
		Object.defineProperties(this, { "$envConfig": { "get": () => { return envConfig } } })
		Object.defineProperties(this, { "$models": { "get": () => { return activemodels } } })
		for (let modelKey in activemodels) {
			Object.defineProperties(this, {
				[modelKey]: { "get": () => { return activemodels[modelKey] } }
			})
		}
	}
}
module.exports = Application
