export default async function handler(req, res) {
	// Get email from GET request query
	const { email } = req.query
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/session?email=${email}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const json = await response.json()
	res.status(200).json(json)
}