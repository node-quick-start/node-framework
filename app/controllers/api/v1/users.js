const router = new require('koa-router')({ prefix: '/api/v1/users' })

router.get('/', async (ctx, next) => {
	let user = await User.all().find(1).async
	ctx.body = user
})

module.exports = router