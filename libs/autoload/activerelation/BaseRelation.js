module.exports = class {
	constructor (model) {
		this.model = model
		this.queryMethod = 'findOne'
		this.queryOptions = {}
	}
	set query ({method, options}) {
		this.queryMethod = method
		this.queryOptions = Object.assign(this.queryOptions, options)
	}
	get promise () {
		return this.model[this.queryMethod](this.queryOptions)
	}
	// query
	find (primaryKeyValue) {
		let primaryKey = this.model.primaryKeyAttributes[0]
		this.query = {method: 'findOne', options: {where: {[primaryKey]: primaryKeyValue}}}
		return this
	}
	findBy (options) {
		this.query = {method: 'findOne', options: {where: options}}
		return this
	}
	all () {
		this.query = {method: 'findAll', options: {where: {}}}
		return this
	}
	where (options) {
		this.query = {method: 'findAll', options: {where: options}}
		return this
	}
	minAsync (field, options = {}) {
		this.query = {method: 'findAll', options: {where: options}}
		return this.model.min(field, this.queryOptions)
	}
	maxAsync (field, options = {}) {
		this.query = {method: 'findAll', options: {where: options}}
		return this.model.max(field, this.queryOptions)
	}
	select (attributes) {
		this.query = {method: 'findAll', attributes: attributes}
		return this
	}
	raw () {
		this.query = {method: 'findAll', raw: true}
		return this
	}

	// pagination
	limit (num) {
		this.query = {method: 'findAll', limit: num}
		return this
	}
	offset (num) {
		this.query = {method: 'findAll', offset: num}
		return this
	}

	// order
	order (options) {
		this.query = {method: 'findAll', order: options}
		return this
	}

	// group
	group (fields) {
		this.query = {method: 'findAll', order: fields}
		return this
	}
}