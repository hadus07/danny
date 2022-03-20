const fs = require('fs')
const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')

const vue = require('./source/vue.json')
const react = require('./source/react.json')
const angular = require('./source/angular.json')

async function analyze(url, frameworkName, environmentName) {
	console.log(`Analyzing Project ${url}...`)
	const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']})
	const runnerResult = await lighthouse(url, {
		output: 'json',
		logLevel: 'info',
		port: chrome.port,
		preset: environmentName,
		onlyCategories: ['accessibility', 'best-practices', 'performance', 'pwa', 'seo'],
	})

	const _url = new URL(url)
	const reportJSON = runnerResult.report
	const name = _url.hostname.split('.')[0]
	fs.writeFileSync(`${__dirname}/output/${environmentName}/${frameworkName}/${name}.json`, reportJSON)

	await chrome.kill()
}

(async () => {
	for (let url of vue) { await analyze(url, 'vue', 'mobile') }
	for (let url of react) { await analyze(url, 'react', 'mobile') }
	for (let url of angular) { await analyze(url, 'angular', 'mobile') }

	for (let url of vue) { await analyze(url, 'vue', 'desktop') }
	for (let url of react) { await analyze(url, 'react', 'desktop') }
	for (let url of angular) { await analyze(url, 'angular', 'desktop') }
})()