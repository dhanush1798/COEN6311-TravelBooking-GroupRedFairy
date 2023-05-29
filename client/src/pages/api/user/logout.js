export default async function handler(req, res) {
	// Send GET request to `${process.env.NEXT_PUBLIC_API_URL}/user/logout` and return promise
	const data = await fetch(`${process.env.API_URL}/user/logout`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	// If status is 200, return success message
	console.log(data.status)
	if (data.status === 200) {
		res.status(200).json({ success: true })
	}
	res.status(200).json({ success: false })
}
