const fs = require('fs')
const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const { reactProjects } = require('./source/react-projects')

async function analyze({ name, url }) {
	console.log(`Analyzing Project ${name}...`)
	const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']})
	const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port}
	const runnerResult = await lighthouse(url, options)

	// `.report` is the HTML report as a string
	const reportHtml = runnerResult.report
	fs.writeFileSync(`${__dirname}/output/react/${name}.html`, reportHtml)

	// `.lhr` is the Lighthouse Result as a JS object
	console.log('Report is done for', runnerResult.lhr.finalUrl)
	console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100)

	await chrome.kill()
}

(async () => {
	for (let project of reactProjects) {
		await analyze(project)
	}
})()

