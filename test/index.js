// console.log(process.cwd())
let sequelize = require('sequelize')
let models = require('../app/models')
models.User.create({username: 'u1111111', email: 'u1@demo.com'}).then(u => {
	console.log(u)
})
models.User.create({username: 'u222222', email: 'u2@demo.com'}).then(u => {
	console.log(u)
})

// u = models.User.build({username: ''})
// u.validate().then(user => {
// 	return user.save()
// }).catch(err => {
// 	console.log(err.message)
// })