const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

export const getCurrentDate = () => {
	const date = new Date()

	return `${date.getDate()} ${
		months[date.getMonth()]
	} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
