const router = new require('koa-router')({ prefix: '/api/v1/users' })

router.get('/', async (ctx, next) => {
	let user = await User.find(1)
	console.log(user.aa())
	ctx.body = user
})

module.exports = router