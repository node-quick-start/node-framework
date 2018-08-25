const config = require('./config')
const path = require('path')
const fs = require('fs')
const ActiveRelation = require('../activerelation')
module.exports = function (models, key) {
	let sequelizeModel = models[key]
	let concernModelPath = path.resolve(config.modelsPath, `./concerns/${key.toLowerCase()}.js`)
	class ConcernModel extends sequelizeModel {}
	if (fs.existsSync(concernModelPath)) {
		ConcernModel = require(concernModelPath)(sequelizeModel)
	}
	return class extends ConcernModel {
		static get newActiveRelation () {
			return new ActiveRelation(this)
		}
		static get sequelize () {
			return models.sequelize
		}
		// Transaction
		static transaction (cb) {
			this.sequelize.transaction(cb)
		}

		// query
		static find (primaryKeyValue) { return this.newActiveRelation.find(primaryKeyValue) }
		static findBy (options) { return this.newActiveRelation.findBy(options) }
		static all () { return this.newActiveRelation.all() }
		static where (options) { return this.newActiveRelation.where(options) }
		static select (attributes) { return this.newActiveRelation.select(attributes) }
		static minAsync (field, options = {}) { return this.newActiveRelation.minAsync(field, options) }
		static maxAsync (field, options = {}) { return this.newActiveRelation.maxAsync(field, options) }
		static select (attributes) { return this.newActiveRelation.select(attributes) }
		static raw () { return this.newActiveRelation.raw() }

		// pagination
		static limit (num) { return this.newActiveRelation.limit(num) }
		static offset (num) { return this.newActiveRelation.offset(num) }

		// order
		static order (options) { return this.newActiveRelation.order(options) }

		// group
		static group (fields) { return this.newActiveRelation.group(fields) }

		constructor () {
			super(...arguments)
		}
	}
}