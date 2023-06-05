export default async function handler(req, res) {
	// Remove spaces from city
	const city = req.query.city?.replace(/\s/g, '').toLowerCase()
	// Get airport options for city
	const data = await fetch(`https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation?query=${city}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
			'X-RapidAPI-Key': process.env.RAPIDAPI_HOTELS_KEY,	
		}
	})
	const json = await data.json()
	res.status(200).json(json)
}
