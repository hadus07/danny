const schema = [
	{
		type: String,
		column: 'Name',
		value: o => o['Name'] + ''
	},
	{
		type: String,
		column: 'SEO: Score',
		value: o => o['SEO: Score'] + ''
	},
	{
		type: String,
		column: 'PWA: Score',
		value: o => o['PWA: Score'] + ''
	},
	{
		type: String,
		column: 'Accessibility: Score',
		value: o => o['Accessibility: Score'] + ''
	},
	{
		type: String,
		column: 'Best Practices: Score',
		value: o => o['Best Practices: Score'] + ''
	},
	{
		type: String,
		column: 'Performance: Score',
		value: o => o['Performance: Score'] + ''
	},
	{
		type: String,
		column: 'Performance: Speed Index',
		value: o => o['Performance: Speed Index'] + ''
	},
	{
		type: String,
		column: 'Performance: Time to Interactive',
		value: o => o['Performance: Time to Interactive'] + ''
	},
	{
		type: String,
		column: 'Performance: Total Blocking Time',
		value: o => o['Performance: Total Blocking Time'] + ''
	},
	{
		type: String,
		column: 'Performance: Server Response Time',
		value: o => o['Performance: Server Response Time'] + ''
	},
	{
		type: String,
		column: 'Performance: First Meaningful Paint',
		value: o => o['Performance: First Meaningful Paint'] + ''
	},
	{
		type: String,
		column: 'Performance: Cumulative Layout Shift',
		value: o => o['Performance: Cumulative Layout Shift'] + ''
	},
	{
		type: String,
		column: 'Performance: Largest Contentful Paint',
		value: o => o['Performance: Largest Contentful Paint'] + ''
	},
]

module.exports = { schema }