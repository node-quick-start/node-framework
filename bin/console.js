const vm = require('vm')
let repl = require("repl")
function initializeContext () {
	require('../config/application').runApp({skipKoa: true})
}
initializeContext()
const replServer = repl.start({
	prompt: 'my repl> ',
	// useGlobal: true,
	// useColors: true,
	async eval (cmd, context, filename, callback) {
		let input = cmd
		const match = cmd.match(/^(?:\s*(?:(?:let|var|const)\s)?\s*([^=]+)=\s*|^\s*)(await\s[\s\S]*)/)
		if (match) {
			const asyncWrapper = (code, binder) => { let assign = binder ? `global.${binder} = ` : ''; return `(function(){ async function _wrap() { return ${assign}${code} } return _wrap();})()`}
			input = `${asyncWrapper(match[2], match[1])}`
		}
		let result = vm.runInThisContext(input)
		callback(null, result)
	},
	replMode: repl.REPL_MODE_STRICT
})

// replServer.defineCommand('reload', () => {
// 	initializeContext()
// })