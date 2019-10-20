const fs = require('fs');
const path = require('path')

const result = fs.readdirSync(process.argv[2]);

result.map(item => {
	const filename = item.split('.')[0]
	const line = `${filename}: require('./svg/richText/${item}')\n`
	fs.appendFileSync(path.join(__dirname, './output.txt'), line)
})


