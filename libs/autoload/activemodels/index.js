const config = require('./config')
const path = require('path')
const models = require(config.modelsPath)
let records = {}
for (let key in models) {
	if (/sequelize/i.test(key)) {
		continue
	}
	let BaseModel = require('./BaseModel')(models, key)
	records[key] = class extends BaseModel {
		constructor (model) {
			super(...arguments)
		}
	}
}
module.exports = records