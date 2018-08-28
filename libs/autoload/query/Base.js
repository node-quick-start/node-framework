class Base {
	constructor (model) {
		this._model = model
	}
	set model (nv) { console.error(`not allow custom set model`) }
	get model () { return this._model }

	index ({ query }) {
		return this.model.all().where(query.where).order(query.order).paginate(query.page || 1, query.per_page || 20).promise
	}
}
module.exports = Base