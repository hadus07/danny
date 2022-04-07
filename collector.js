const _ = require('lodash')
const path = require('path')
const fs = require('fs').promises
const writeXlsxFile = require('write-excel-file/node')

const { schema } = require('./excelSchema')

async function collect(p) {
	const data = []
	const dir = await fs.opendir(p)
	for await (const dirent of dir) {
		const fileName = dirent.name
		const currentPath = path.join(p, fileName)

		if (!fileName.startsWith('.')) {
			if (!fileName.includes('.json')) {
				await collect(currentPath)
			} else {
				// const separatedPath = currentPath.replace('/' + fileName, '').split('/')
				// const framework = separatedPath[separatedPath.length - 1]
				// const platform = separatedPath[separatedPath.length - 2]
				const content = JSON.parse(await fs.readFile(path.join(currentPath), { encoding: 'utf-8' }))
				
				data.push({
					// General
					'Name': fileName,
					// SEO
					'SEO: Score': _.get(content, 'categories.seo.score', 'N/A'),
					// PWA
					'PWA: Score': _.get(content, 'categories.pwa.score', 'N/A'),
					// Accessibility
					'Accessibility: Score': _.get(content, 'categories.accessibility.score', 'N/A'),
					// Best Practices
					'Best Practices: Score': _.get(content, 'categories.best-practices.score', 'N/A'),
					// Performance
					'Performance: Score': _.get(content, 'categories.performance.score', 'N/A'),
					'Performance: Speed Index': _.get(content, 'audits.speed-index.score', 'N/A'),
					'Performance: Time to Interactive': _.get(content, 'audits.interactive.score', 'N/A'),
					'Performance: Total Blocking Time': _.get(content, 'audits.total-blocking-time.score', 'N/A'),
					'Performance: Server Response Time': _.get(content, 'audits.server-response-time.score', 'N/A'),
					'Performance: First Meaningful Paint': _.get(content, 'audits.first-meaningful-paint.score', 'N/A'),
					'Performance: Cumulative Layout Shift': _.get(content, 'audits.cumulative-layout-shift.score', 'N/A'),
					'Performance: Largest Contentful Paint': _.get(content, 'audits.largest-contentful-paint.score', 'N/A'),
				})
			}
		}
	}

	return data
}

(async () => {
	try {
		const vueMobile = await collect(path.join(__dirname, 'output/mobile/vue'))
		const reactMobile = await collect(path.join(__dirname, 'output/mobile/react'))
		const angularMobile = await collect(path.join(__dirname, 'output/mobile/angular'))
		const vueDesktop = await collect(path.join(__dirname, 'output/desktop/vue'))
		const reactDesktop = await collect(path.join(__dirname, 'output/desktop/react'))
		const angularDesktop = await collect(path.join(__dirname, 'output/desktop/angular'))

		const schemas = [schema, schema, schema, schema, schema, schema]
		const objects = [vueMobile, reactMobile, angularMobile, vueDesktop, reactDesktop, angularDesktop]
		const sheets = ['Vue Mobile', 'React Mobile', 'Angular Mobile', 'Vue Desktop', 'React Desktop', 'Angular Desktop']

		await writeXlsxFile(objects, {
			sheets,
			schema: schemas,
			filePath: path.join(__dirname, 'Metrics Digest 2.xlsx')
		})
	} catch (err) {
		console.log(err)
	}
})()