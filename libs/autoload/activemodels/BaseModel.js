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
	class BaseModel extends ConcernModel {
		static get newActiveRelation () { return new ActiveRelation(BaseModel) }
		static get sequelizeModel () { return sequelizeModel }
		static get sequelize () { return models.sequelize }
		static get Sequelize () { return models.Sequelize }
		// Transaction
		// https://itbilu.com/nodejs/npm/EJO6CcCM-.html
		static transaction (tranCb) {
			return Promise.resolve(this.sequelize.transaction(tranCb))
		}

		// query
		static find (primaryKeyValue) { return this.newActiveRelation.find(primaryKeyValue) }
		static findBy (options) { return this.newActiveRelation.findBy(options) }
		static all () { return this.newActiveRelation.all() }
		static where (options) { return this.newActiveRelation.where(options) }
		static minAsync (field, options = {}) { return this.newActiveRelation.minAsync(field, options) }
		static maxAsync (field, options = {}) { return this.newActiveRelation.maxAsync(field, options) }
		static select (attributes) { return this.newActiveRelation.select(attributes) }
		static raw () { return this.newActiveRelation.raw() }
		static lock () { return this.newActiveRelation.lock() }

		// pagination
		static limit (num) { return this.newActiveRelation.limit(num) }
		static offset (num) { return this.newActiveRelation.offset(num) }
		static paginate (page = 1, perPage = 20) { return this.newActiveRelation.paginate(page, perPage) }

		// order
		static order (options) { return this.newActiveRelation.order(options) }

		// group
		static group (fields) { return this.newActiveRelation.group(fields) }

		constructor () {
			super(...arguments)
		}

		withLock (asyncCb) {
			return Promise.resolve(BaseModel.transaction(async (t) => {
				await BaseModel.findOne({where: {id: this.id}, lock: t.LOCK.UPDATE})
				await BaseModel.Sequelize.cls.bind(asyncCb, BaseModel.Sequelize.cls.context)();
			}))
		}
	}
	return BaseModel
}