const fs = require('fs')

const outputVue = []
const outputReact = []
const outputAngular = []

function getUrl(str) {
	return str.split(',')[0].replace(/"/g, '')
}

const vue = fs.readFileSync('./source/csv/vue.csv', { encoding: 'utf-8' })
const react = fs.readFileSync('./source/csv/react.csv', { encoding: 'utf-8' })
const angular = fs.readFileSync('./source/csv/angular.csv', { encoding: 'utf-8' })

for (let line of vue.split('\n')) { outputVue.push(getUrl(line)) }
for (let line of react.split('\n')) { outputReact.push(getUrl(line)) }
for (let line of angular.split('\n')) { outputAngular.push(getUrl(line)) }

fs.writeFileSync('./source/json/vue.json', JSON.stringify(output, null, 4))
fs.writeFileSync('./source/json/react.json', JSON.stringify(output, null, 4))
fs.writeFileSync('./source/json/angular.json', JSON.stringify(output, null, 4))