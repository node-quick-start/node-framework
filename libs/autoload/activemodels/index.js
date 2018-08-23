const config = require('./config')
const models = require(config.modelsPath)
const BaseModel = require('./BaseModel')
let records = {}
for (let key in models) {
	if (/sequelize/i.test(key)) {
		continue
	}
	records[key] = class extends BaseModel {
		static get sequelizeModel () {
			return models[key]
		}
		constructor () {
			super(...arguments)
		}
	}
}
module.exports = records