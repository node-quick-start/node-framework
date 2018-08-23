module.exports = class {
	constructor (model) {
		this.model = model
		this.sequelizeModel = model.sequelizeModel
		this.queryOptions = {}
	}
	set query (options) {
		this.queryOptions = Object.assign(this.queryOptions, options)
		return this.queryOptions
	}
	find (primaryKeyValue) {
		let primaryKey = this.sequelizeModel.primaryKeyAttributes[0]
		return this.sequelizeModel.findOne({where: this.query = {[primaryKey]: primaryKeyValue}})
	}
	async findBy (options) {
		return await this.sequelizeModel.findOne({where: this.query = options})
	}
}