const HotelsList = ({ hotels, setHotel, setOpenModal, searchData, loading }) => {

	const selectHotel = (hotel) => {
		// Append check in and check out from searchData to hotel
		const hotelData = {
			...hotel,
			checkIn: searchData?.checkIn,
			checkOut: searchData?.checkOut
		}
		setHotel(hotelData)
		setOpenModal(false)
	}

	return (
		<>
			{loading && <p className="mb-8 text-center">Loading...</p>}
			{hotels && hotels.length ? 
				<ul className="overflow-auto h-48 mb-4">
					{hotels.map((hotel) => (
						<li key={hotel.id} className="flex items-center justify-between mb-2 py-2 border-t border-blue-500">
							{/* Hotel image */}
							<div className="flex-none w-24 h-16 mr-4">
								<img
									className="w-full h-full object-cover"
									src={hotel?.image}
									alt={hotel?.name}
								/>
							</div>
							<div className="flex-1">
								<h4 className="font-semibold">
									{hotel?.name}
								</h4>
								{/* Hotel rating */}
								<div className="flex items-center">
									<span className="ml-2 text-gray-600">
										{`Rating: ${hotel?.rating}`}
									</span>
								</div>
							</div>
							<div className="flex flex-col">
								<h5 className="font-semibold text-xl mb-2">
									{`CAD ${hotel?.price?.toLocaleString()}`}
								</h5>
								<button 
									className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
									onClick={() => selectHotel(hotel)}
								>
									Select
								</button>
							</div>
						</li>
					))}
				</ul>
				:
				<p className="mb-8 text-center">Use the hotel search to find hotels.</p>
			}
		</>
	)
}

export default HotelsList