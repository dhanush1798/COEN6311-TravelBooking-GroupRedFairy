export default async function handler(req, res) {
	// Construct query string from req.query
	// Add currency, market, locale to query string
	const query = {
		...req.query,
		adults: parseInt(req.query.adults),
		children: parseInt(req.query.children),
		origin: 'YUL',
	}
	const queryString = Object.keys(query).map((key) => key + '=' + query[key]).join('&')
	console.log(queryString)
	// Get flights from rapidapi
	const data = await fetch(`https://skyscanner44.p.rapidapi.com/search-extended?${queryString}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com',
			'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,	
		}
	})
	const json = await data.json()
	console.log(json)
	res.status(200).json(json)
}
