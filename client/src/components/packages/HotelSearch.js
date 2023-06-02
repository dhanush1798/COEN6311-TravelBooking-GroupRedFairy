import { useEffect, useState } from 'react'

const HotelSearch = ({ search, setSearch, getHotels, city }) => {
	const [locations, setLocations] = useState([])

	const getLocations = async (e) => {
		const res = await fetch(`/api/packages/locations?city=${city}`)
		const data = await res.json()
		setLocations(data)
		console.log(data)
	}

	useEffect(() => {
		console.log(city, locations)
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
						{locations && locations.map((location) => (
							<option key={location.entity_id} value={location.entity_id} defaultChecked={true}>
								{location.entity_name}
							</option>
						))}
					</select>
				</div>
				<div className="col-span-2 sm:col-span-2">
					<label htmlFor="checkin" className="block mb-1">
						Check in date
					</label>
					<input
						type="date"
						id="checkin"
						name="checkin"
						value={search.checkin}
						onChange={(e) => setSearch({ ...search, checkin: e.target.value })}
						className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
					/>
				</div>
				<div className="col-span-2 sm:col-span-2">
					<label htmlFor="checkout" className="block mb-1">
						Checkout date
					</label>
					<input
						type="date"
						id="checkout"
						name="checkout"
						value={search.checkout}
						onChange={(e) => setSearch({ ...search, checkout: e.target.value })}
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