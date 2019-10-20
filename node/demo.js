function getResult(data, n, sum) {

}

function Emitter () {
	this.liteners = {}
}

Emitter.prototype.on = function (type, listener) {
	if (!this.liteners[type]) {
		this.liteners[type] = []
	}
	this.liteners[type].push(listener)
}

Emitter.prototype.emitter = function (type, params) {
	this.liteners[type].forEach(fn => {
		fn(params)
	})
}

const emitter = new Emitter()

emitter.on('click', () => {
	console.log('click one')
})

emitter.on('click', () => {
	console.log('click two')
})

emitter.emitter('click')


Array.from()
Array.prototype.slice.call(nodelist)
[...iterator]

function newCreate (obj) {
	const object = new Object()
	object.prototype = obj;
	return object 
}