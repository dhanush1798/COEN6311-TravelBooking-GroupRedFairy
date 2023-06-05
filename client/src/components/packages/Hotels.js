import { useState, useEffect } from 'react'
import HotelsList from './HotelsList'
import HotelSearch from './HotelSearch'

const Hotels = ({ setOpenModal, setHotel, city }) => {
	const [hotels, setHotels] = useState([])
	const [search, setSearch] = useState({
		geoId: '',
		adults: '',
		rooms: '',
		checkIn: '',
		checkOut: '',
	})
	const [loading, setLoading] = useState(false)

	const getHotels = async (e) => {
		e.preventDefault()
		setLoading(true)
		// Convert search to query string
		const queryString = Object.keys(search).map((key) => key + '=' + search[key]).join('&')
		const res = await fetch(`/api/packages/hotels?${queryString}`)
		const data = await res.json()
		const hotels = data?.data?.data?.map(hotel => {
			const id = parseInt(hotel?.id)
			// Remove prefix number from hotel name, example: '1. Hotel Name'. Account for scenarios where there is no prefix number.
			const name = hotel?.title?.split('. ')?.slice(1)?.join('. ') || hotel?.title
			// Remove $ from price if it exists
			const price = hotel?.priceForDisplay?.replace('$', '')
			const rating = hotel?.bubbleRating?.rating
			// Replace {width} with 140 and {height} with 80
			const image = hotel?.cardPhotos?.[0]?.sizes?.urlTemplate?.replace('{width}', '200').replace('{height}', '100')
			return { id, name, price, rating, image }
		})
		setHotels(hotels)
		setLoading(false)
	}

	return (
		<>
			<div className="fixed inset-0 flex items-center justify-center z-50">
				<div className="fixed inset-0 bg-black opacity-50 z-0"></div>
				<div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl h-auto-screen p-4">
					<button
						className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
						onClick={() => setOpenModal(false)}
					>
						<svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="#000" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					</button>

					<HotelSearch search={search} setSearch={setSearch} getHotels={getHotels} city={city} />
					<HotelsList hotels={hotels} searchData={search} setHotel={setHotel} setOpenModal={setOpenModal} loading={loading} />
				</div>
			</div>
		</>
	)
}

export default Hotels