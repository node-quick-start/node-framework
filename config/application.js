const {activemodels} = require('../libs/autoload')
const envValues = require('./env.json') || {}
class Application {
	
	static runApp (cusConfig = {}) {
		const envConfig = Object.assign({}, envValues, cusConfig)
		const application = new Application({envConfig})
		setApplicationGlobalVars(application)
		require('./koa').runKoa(application)
	}
	
	constructor({envConfig}) {
		Object.defineProperties(this, { "$models": { "get": () => { return activemodels } } })
		Object.defineProperties(this, { "$envConfig": { "get": () => { return envConfig } } })
		for (let modelKey in activemodels) {
			Object.defineProperties(this, {
				[modelKey]: { "get": () => { return activemodels[modelKey] } }
			})
		}
	}
}

function  setApplicationGlobalVars (application) {
	Object.defineProperties(global, { "$application": { "get": () => { return application } } })
	for (let modelKey in application.$models) {
		Object.defineProperties(global, {
			[modelKey]: { "get": () => { return activemodels[modelKey] } }
		})
	}
}
module.exports = Application
