const HotelsList = ({ hotels, setHotel, setOpenModal }) => {
	console.log('hotels', hotels)

	const dateTimeToTimeAMPM = (dateTime) => {
		const date = new Date(dateTime)
		const hours = date.getHours()
		const minutes = date.getMinutes()
		const ampm = hours >= 12 ? 'PM' : 'AM'
		const formattedHours = hours % 12 ? hours % 12 : 12
		const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
		return formattedHours + ':' + formattedMinutes + ' ' + ampm
	}

	const selectHotel = (hotel) => {
		// Remove unnecessary data from hotel
		const selectedHotel = {
			id: hotel.id,
			legs: hotel.legs.map((leg) => ({
				id: leg.id,
				origin: leg.origin.displayCode,
				destination: leg.destination.displayCode,
				departure: leg.departure,
				arrival: leg.arrival,
				duration: leg.duration,
				stops: leg.stops,
				carriers: leg.carriers?.marketing?.map((carrier) => carrier.name).join(', '),
			})),
			price: hotel.pricing_options[0].price.amount,
			booking_url: hotel.pricing_options[0].url,
		}
		setHotel(selectedHotel)
		setOpenModal(false)
	}

	return (
		<>
			{hotels && hotels.length ? 
				<ul className="overflow-auto h-48 mb-4">
					{hotels.map((hotel) => (
						<li key={hotel.id} className="flex items-center justify-between mb-2 py-2 border-t border-blue-500">
							<div className="flex-1">
								<h4 className="font-semibold">
									{hotel?.legs?.[0]?.carriers?.marketing.map((carrier) => carrier.name).join(', ')}
								</h4>
								<div className="hotel-legs">
									{hotel.legs.map((leg) => (
										<div key={leg.id}>
											<div className="flex items-space-between items-center mb-4">
												<div className="flex-1">
													<h5 className="font-semibold text-xl">{leg?.origin?.displayCode}</h5>
													<span className="flex-1">{dateTimeToTimeAMPM(leg?.departure)}</span>
												</div>
												<span className="flex-1">to</span>
												<div className="flex-1">
													<h5 className="font-semibold text-xl">{leg?.destination?.displayCode}</h5>
													<span className="flex-1">{dateTimeToTimeAMPM(leg?.arrival)}</span>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
							<div className="flex flex-col">
								<h5 className="font-semibold text-xl mb-2">
									{`CAD ${hotel?.pricing_options?.[0]?.price?.amount?.toLocaleString()}`}
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