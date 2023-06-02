import { useState, useEffect } from 'react'

const FlightSearch = ({ search, setSearch, getFlights, city }) => {
	const [destinations, setDestinations] = useState([])

	const getAirports = async (e) => {
		const res = await fetch(`/api/packages/airports?city=${city}`)
		const data = await res.json()
		setDestinations(data)
	}

	useEffect(() => {
		if (city && destinations.length === 0) {
			getAirports()
		}
	}, [city])

	return (
		<>
		<h3 className="text-lg font-semibold mb-4">Search for flights</h3>
			{destinations.length > 0 && (
				<form className="grid grid-cols-3 gap-4 mb-12" onSubmit={getFlights}>
					<div className="col-span-3 sm:col-span-1">
						<label htmlFor="destination" className="block mb-1">
							Destination
						</label>
						<select
							id="destination"
							name="destination"
							value={search.destination}
							onChange={(e) => setSearch({ ...search, destination: e.target.value })}
							className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
						>
							{destinations && destinations.map((destination) => (
								<option key={destination.iata_code} value={destination.iata_code} defaultChecked={true}>
									{`(${destination.iata_code}) ${destination.name} Airport - ${destination.city}, ${destination.country}`}
								</option>
							))}
						</select>
					</div>
					<div className="col-span-3 sm:col-span-1">
						<label htmlFor="departureDate" className="block mb-1">
							Departure Date
						</label>
						<input
							type="date"
							id="departureDate"
							name="departureDate"
							value={search.departureDate}
							onChange={(e) => setSearch({ ...search, departureDate: e.target.value })}
							className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
						/>
					</div>
					<div className="col-span-3 sm:col-span-1">
						<label htmlFor="returnDate" className="block mb-1">
							Return Date
						</label>
						<input
							type="date"
							id="returnDate"
							name="returnDate"
							value={search.returnDate}
							onChange={(e) => setSearch({ ...search, returnDate: e.target.value })}
							className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
						/>
					</div>
					<div className="col-span-3 sm:col-span-1">
						<label htmlFor="cabinClass" className="block mb-1">
							Cabin class
						</label>
						<select
							id="cabinClass"
							name="cabinClass"
							value={search.cabinClass}
							onChange={(e) => setSearch({ ...search, cabinClass: e.target.value })}
							className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
						>
							<option value="economy">Economy</option>
							<option value="business">Business</option>
							<option value="first">First</option>
						</select>
					</div>
					<div className="col-span-3 sm:col-span-1">
						<label htmlFor="adults" className="block mb-1">
							Adults
						</label>
						<select
							id="adults"
							name="adults"
							value={search.adults}
							onChange={(e) => setSearch({ ...search, adults: parseInt(e.target.value) })}
							className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
						>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="2">3</option>
							<option value="2">4</option>
							<option value="2">5</option>
						</select>
					</div>
					<div className="col-span-3 sm:col-span-1">
						<label htmlFor="children" className="block mb-1">
							Children
						</label>
						<select
							id="children"
							name="children"
							value={search.children}
							onChange={(e) => setSearch({ ...search, children: parseInt(e.target.value) })}
							className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
						>
							<option value="0">0</option>
							<option value="1">1</option>
							<option value="2">2</option>
						</select>
					</div>
					<div className="col-span-3">
						<button
							type="submit"
							className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						>Search</button>
					</div>
				</form>
			)}
		</>
	)
}

export default FlightSearch