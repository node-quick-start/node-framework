require('./initializers')
const reform = require('../app/reform')
const {activemodels, Query} = require('../libs/autoload')
const envValues = require('./env.json') || {}
class Application {
	
	static runApp (cusConfig) {
		const { skipKoa } = cusConfig
		const envConfig = Object.assign({}, envValues, cusConfig)
		const application = new Application({envConfig})
		reform.mount(application)
		setApplicationGlobalVars(application)
		if (!skipKoa) {
			require('./koa').runKoa(application)
		}
	}
	
	constructor({envConfig}) {
		Object.defineProperties(this, { "$models": { "get": () => { return activemodels } } })
		Object.defineProperties(this, { "$Query": { "get": () => { return Query } } })
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
	Object.defineProperties(global, {
		'$Query': { "get": () => { return application.$Query } }
	})
	Object.defineProperties(global, {
		'$reform': { "get": () => { return application.$reform } }
	})
}
module.exports = Application
