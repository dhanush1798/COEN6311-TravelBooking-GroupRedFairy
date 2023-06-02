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
	const day = date.getDate()
	const month = date.toLocaleString('default', { month: 'short' })
	const year = date.getFullYear()
	return `${day} ${month} ${year}`
}