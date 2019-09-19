const fs = require('fs')
const path = require('path')

// 异步读取文件
let fileData = fs.readFileSync(path.join(__dirname, './params.txt'), 'utf-8')
const lineArr = fileData.split('\n')

lineArr.map((item) => {
	const functionName = item.split(': this.')[1].slice(0,-1)

	const Fn = `${functionName} = (data) => {
  console.log('${functionName}', data)
}\n\n`

  fs.appendFileSync(path.join(__dirname, './output.txt'), Fn)
})








