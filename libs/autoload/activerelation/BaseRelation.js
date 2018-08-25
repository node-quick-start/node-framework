module.exports = class {
	constructor (sequelizeModel) {
		this.sequelizeModel = sequelizeModel
		this.queryOptions = {}
	}
	set query (options) {
		this.queryOptions = Object.assign(this.queryOptions, options)
		return this
	}
	get data () {
	}
	find (primaryKeyValue) {
		let primaryKey = this.sequelizeModel.primaryKeyAttributes[0]
		return this.sequelizeModel.findOne({where: this.query = {[primaryKey]: primaryKeyValue}})
		return this.query = {[primaryKey]: primaryKeyValue}
	}
	findBy (options) {
		// return this.sequelizeModel.findOne({where: this.query = options})
		return this.query = options
	}
	all () {
		// this.query = {}
		// return this.sequelizeModel.findAll()
		return this.query = {}
	}
	where (options) {
		// return this.sequelizeModel.findAll({where: this.query = options})
		return this.query = options
	}
}