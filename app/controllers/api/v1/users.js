const router = new require('koa-router')({ prefix: '/api/v1/users' })

router.get('/', async (ctx, next) => {
	// let user = await User.all().find(1).promise

	// console.log(ctx.query)

	let u1 = await User.find(1).promise

	// User.transaction.then(transaction => {
	// 	console.log(222, User.Sequelize.cls.get('transaction') === transaction)
	// })

	// await User.transaction(async () => {
	// 	console.log(3)
	// })
	// console.log(4)

	// console.log(1)
	// await u1.withLock(async (t) => {
	// 	console.log(2)
	// 	await u1.update({username: 'abcdefg3ff'})
	// 	console.log('---2', User.Sequelize.cls.get('transaction') === t)
	// 	console.log(3)
	// 	// reject('aa')
	// })
	// console.log(4)
	ctx.body = u1
})

module.exports = router