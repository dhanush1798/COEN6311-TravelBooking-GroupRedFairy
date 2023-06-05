export const dateTimeToTimeAMPM = (dateTime) => {
	const date = new Date(dateTime)
	const hours = date.getHours()
	const minutes = date.getMinutes()
	const ampm = hours >= 12 ? 'PM' : 'AM'
	const formattedHours = hours % 12 ? hours % 12 : 12
	const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
	return formattedHours + ':' + formattedMinutes + ' ' + ampm
}

export const formatDate = (datetime) => {
	const date = new Date(datetime)
	const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
	const day = utcDate.getUTCDate()
	const month = utcDate.toLocaleString('default', { month: 'short' })
	const year = utcDate.getUTCFullYear()
	return `${day} ${month} ${year}`
}