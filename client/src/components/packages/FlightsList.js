import { dateTimeToTimeAMPM } from '@/utils/date'

const FlightsList = ({ flights, setFlight, setOpenModal }) => {
	const selectFlight = (flight) => {
		// Remove unnecessary data from flight
		const selectedFlight = {
			id: flight.id,
			legs: flight.legs.map((leg) => ({
				id: leg.id,
				origin: leg.origin.displayCode,
				destination: leg.destination.displayCode,
				departure: leg.departure,
				arrival: leg.arrival,
				duration: leg.duration,
				stops: leg.stops,
				carriers: leg.carriers?.marketing?.map((carrier) => carrier.name).join(', '),
			})),
			price: flight.pricing_options[0].price.amount,
			booking_url: flight.pricing_options[0].url,
		}
		setFlight(selectedFlight)
		setOpenModal(false)
	}

	return (
		<>
			{flights && flights.length ? 
				<ul className="overflow-auto h-48 mb-4">
					{flights.map((flight) => (
						<li key={flight.id} className="flex items-center justify-between mb-2 py-2 border-t border-blue-500">
							<div className="flex-1">
								<h4 className="font-semibold">
									{flight?.legs?.[0]?.carriers?.marketing.map((carrier) => carrier.name).join(', ')}
								</h4>
								<div className="flight-legs">
									{flight.legs.map((leg) => (
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
									{`CAD ${flight?.pricing_options?.[0]?.price?.amount?.toLocaleString()}`}
								</h5>
								<button 
									className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
									onClick={() => selectFlight(flight)}
								>
									Select
								</button>
							</div>
						</li>
					))}
				</ul>
				:
				<p className="mb-8 text-center">Use the flight search to find flights.</p>
			}
		</>
	)
}

export default FlightsList