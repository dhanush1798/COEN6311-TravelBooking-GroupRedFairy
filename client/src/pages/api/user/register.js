export default async function handler(req, res) {
	// Send POST request to `${process.env.NEXT_PUBLIC_API_URL}/user/register` and return promise
	const data = await fetch(`${process.env.API_URL}/user/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req.body),
	})
	const json = await data.json()
	res.status(200).json(json)
}
  