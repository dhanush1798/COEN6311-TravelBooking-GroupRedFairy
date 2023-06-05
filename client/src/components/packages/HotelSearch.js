import { useEffect, useState } from 'react'

const HotelSearch = ({ search, setSearch, getHotels, city }) => {
	const [locations, setLocations] = useState([])

	const getLocations = async (e) => {
		const res = await fetch(`/api/packages/locations?city=${city}`)
		const data = await res.json()
		const locs = data?.data.map(location => {
			// Extract geoid from geoId, example: "loc;155019;g155019". Convert to int.
			if (!location?.geoId) return null
			const geoId = parseInt(location?.geoId?.split(';')[1])
			// Remove tags from title, example: <b>San Francisco</b>
			const title = `${location?.title?.replace(/(<([^>]+)>)/gi, '')}, ${location?.secondaryText}`
			return { geoId, title }
		})
		// Remove null values
		setLocations(locs?.filter(Boolean))
		// Set search geoId to first geoId
		setSearch({ ...search, geoId: locs[0]?.geoId })
	}

	useEffect(() => {
		if (city && locations?.length === 0) {
			getLocations()
		}
	}, [city])

	return (
		<>
		<h3 className="text-lg font-semibold mb-4">Search for hotels</h3>
			<form className="grid grid-cols-4 gap-4 mb-12" onSubmit={getHotels}>
				<div className="col-span-3 sm:col-span-4">
					<label htmlFor="locationId" className="block mb-1">
						Location
					</label>
					<select
						id="locationId"
						name="locationId"
						value={search.location}
						onChange={(e) => setSearch({ ...search, locationId: e.target.value })}
						className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
					>
						{locations && locations.length && locations.map((location, index) => (
							<option key={location?.geoId} value={location?.geoId} defaultChecked={index === 0}>
								{location.title}
							</option>
						))}
					</select>
				</div>
				<div className="col-span-2 sm:col-span-2">
					<label htmlFor="checkIn" className="block mb-1">
						Check in date
					</label>
					<input
						type="date"
						id="checkIn"
						name="checkIn"
						value={search.checkIn}
						onChange={(e) => setSearch({ ...search, checkIn: e.target.value })}
						className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
					/>
				</div>
				<div className="col-span-2 sm:col-span-2">
					<label htmlFor="checkOut" className="block mb-1">
						checkOut date
					</label>
					<input
						type="date"
						id="checkOut"
						name="checkOut"
						value={search.checkOut}
						onChange={(e) => setSearch({ ...search, checkOut: e.target.value })}
						className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
					/>
				</div>
				<div className="col-span-2 sm:col-span-2">
					<label htmlFor="rooms" className="block mb-1">
						Rooms
					</label>
					<select
						id="rooms"
						name="rooms"
						value={search.rooms}
						onChange={(e) => setSearch({ ...search, rooms: parseInt(e.target.value) })}
						className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
					>
						<option value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
					</select>
				</div>
				<div className="col-span-2 sm:col-span-2">
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
				<div className="col-span-4">
					<button
						type="submit"
						className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					>Search</button>
				</div>
			</form>
		</>
	)
}

export default HotelSearch