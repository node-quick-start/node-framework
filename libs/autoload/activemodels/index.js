const config = require('./config')
const fs = require('fs')
const path = require('path')
const models = require(config.modelsPath)
let BaseModel = require('./BaseModel')
let records = {}
for (let key in models) {
	if (/sequelize/i.test(key)) {
		continue
	}
	let modelConcernPath = path.resolve(config.modelsPath, `../concerns/${key.toLowerCase()}.js`)
	console.log(modelConcernPath)
	if (fs.existsSync(modelConcernPath)) {
		BaseModel = require(modelConcernPath)
	}
	records[key] = class extends BaseModel {
		static get sequelizeModel () {
			return models[key]
		}
		constructor (model) {
			super(...arguments)
			// models[key].call(this, ...arguments)
			
			
			// BaseModel.prototype = Object.create(models[key].prototype)
			
			
			// this.prototype = Object.create(models[key].prototype)
			// this.prototype.constructor = this.constructor
		}
		
		get aa () {
			return 'aa lal'
		}
	}
}
module.exports = records