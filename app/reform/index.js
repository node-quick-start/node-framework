const {struct, StructError} = require('superstruct')
const requireDirectory = require('require-directory')
const isClass = require('../../libs/utils/isClass')
const isObject = require('../../libs/utils/isObject')
module.exports = {
	registerForm (application, forms) {
		isObject(forms) && Object.keys(forms).forEach((key) => {
			let form = forms[key]
			if (isClass(form)) {
				// form extend
				forms[key] = class FormExt extends form {
					static get Joi () { return Joi }
					static get schema () { return form['schema'] || console.error(`please define schema ${form}`) }

					constructor (model) {
						super(...arguments)
						this.model = model
						this.data = null
						this.struct = struct(form.struct)
					}

					sync () {
						Object.assign(this.model, this.data)
					}
					validate (data) {
						// let [err, result] = this.struct.validate(data)
						let [err, result] = this.struct(data)
						if (err instanceof StructError) {
							return console.error(err)
						}
						this.data = data
						return true
					}
				}
			} else {
				this.registerForm(application, form)
			}
		})
	},
	mount (application) {
		let forms = requireDirectory(module, '../reform')
		Object.defineProperties(application, { "$reform": { "get": () => { return forms } } })
		this.registerForm(application, forms)
	}
}