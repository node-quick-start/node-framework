const path = require('path')
const ActiveRelation = require('../activerelation')
const config = require('./config')
const ApplicationRecord = require(path.resolve(config.modelsPath, './concerns/ApplicationRecord.js'))
module.exports = class BaseModel extends ApplicationRecord {
	static get newActiveRelation () {
		return new ActiveRelation(this)
	}
	static find (primaryKeyValue) { return this.newActiveRelation.find(primaryKeyValue) }
	static findBy (primaryKeyValue) { return this.newActiveRelation.findBy(primaryKeyValue) }
	
	constructor () {
		super(...arguments)
	}
}