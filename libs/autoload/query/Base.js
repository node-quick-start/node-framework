class Base {
	constructor (model, cxt) {
		this.model = model
	}

	index ({ query }) {
		return this.model.all().where(query.where).order(query.order).paginate(query.page || 1, query.per_page || 20).promise
	}
}
module.exports = Base