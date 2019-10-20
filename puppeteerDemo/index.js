const puppeteer = require('puppeteer')

const url = 'https://movie.douban.com/explore#!type=movie&tag=%E7%A7%91%E5%B9%BB'

/**
 * 延时函数
 * @param {number} time: 单位是毫秒，表示延迟多少毫秒
 */
const sleep = (time) => new Promise(resolve => setTimeout(resolve, time))

// 抓取豆瓣上面的电影
!(async () => {
	const brower = await puppeteer.launch({
		args: ['--no-sandbox'],
	})
	const page = await brower.newPage()
	await page.goto(url, {
		waitUntil: 'networkidle0', // 网络连接数不超过 0个 至少 500 ms 后考虑页面完成加载
	})

	await page.waitFor('a.more');
	await page.click('a.more')

	// !!!!!这里必须有延时，否则数据加载的数据可能还没有显示在页面中，通过 dom 取不到数据
	await page.waitFor(1000);


	// 获取数据
	const result = await page.evaluate(() => {
		const result = []
		const movies = document.querySelectorAll('.list-wp .list a')
		movies.forEach(item => {
			const img = item.querySelector('.cover-wp img')
			result.push({
				doubanId: item.querySelector('.cover-wp').dataset.id,
				title: img.alt,
				rate: item.querySelector('p strong').innerText,
				poster: img.src.replace('s_ratio', 'l_ratio'), // 这里对 url 进行替换的目的是将小图替换为大图
			})
		})
		return {
			result,
			length: movies.length,
			dom: window.location.href
		}
	})

	console.log(result)
})()

















