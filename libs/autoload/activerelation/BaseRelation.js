module.exports = class {
	constructor (model) {
		this.model = model
		this.queryMethod = 'findOne'
		this.queryOptions = {}
	}
	set query ({method, options}) {
		this.queryMethod = method
		console.log(options, 3)
		Object.assign(this.queryOptions, options)
	}
	get promise () {
		console.log(this.queryOptions)
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
		this.query = {method: 'findAll', options: {attributes: attributes}}
		return this
	}
	raw () {
		this.query = {method: 'findAll', options: {raw: true}}
		return this
	}

	// pagination
	limit (num) {
		this.query = {method: 'findAll', options: {limit: num}}
		return this
	}
	offset (num) {
		this.query = {method: 'findAll', options: {offset: num}}
		return this
	}
	paginate (page, perPage) {
		let offset = (page - 1) * perPage
		this.query = {method: 'findAll', options: {offset, limit: perPage}}
		return this
	}

	// order
	order (options) {
		this.query = {method: 'findAll', options: {order: options}}
		return this
	}

	// group
	group (fields) {
		this.query = {method: 'findAll', order: fields}
		return this
	}
}