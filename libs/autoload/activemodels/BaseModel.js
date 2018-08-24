const ActiveRelation = require('../activerelation')
module.exports = class BaseModel {
	static get newActiveRelation () {
		return new ActiveRelation(this)
	}
	static find (primaryKeyValue) { return this.newActiveRelation.find(primaryKeyValue) }
	static findBy (options) { return this.newActiveRelation.findBy(options) }
	static all () { return this.newActiveRelation.all() }
	static where (options) { return this.newActiveRelation.where(options) }
	
	constructor () {
	}
}