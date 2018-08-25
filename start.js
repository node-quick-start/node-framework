let Application = require('./config/application')
Application.runApp()

User.transaction(function (t) {
	console.log(t)
})