const router = new require('koa-router')({ prefix: '/api/v1/users' })

router.get('/', async (ctx, next) => {
	ctx.body = await User.all().find(1)
})

module.exports = router