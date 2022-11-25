const commentPostedTime = (timeInMileSec: number) => {
	const sec = timeInMileSec / 1000
	const min = timeInMileSec / (1000 * 60)
	const hrs = timeInMileSec / (1000 * 60 * 60)
	const days = timeInMileSec / (1000 * 60 * 60 * 24)
	const weeks = timeInMileSec / (1000 * 60 * 60 * 24 * 7)
	const months = timeInMileSec / (1000 * 60 * 60 * 24 * 31)
	const years = timeInMileSec / (1000 * 60 * 60 * 24 * 12)

	console.log(timeInMileSec, sec)

	if (sec < 60) {
		return 'seconds'
	} else if (min < 60) {
		return min.toFixed(0) + ' mins'
	} else if (hrs < 24) {
		return hrs.toFixed(0) + ' hrs'
	} else if (days < 7) {
		return days.toFixed(0) + ' days'
	} else if (weeks < 4) {
		return weeks.toFixed(0) + ' weeks'
	} else if (months < 12) {
		return months.toFixed(0) + ' months'
	} else {
		return years.toFixed(0) + ' year'
	}
}

export { commentPostedTime }
