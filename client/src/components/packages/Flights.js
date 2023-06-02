import { useState, useEffect } from 'react'
import FlightsList from './FlightsList'
import FlightSearch from './FlightSearch'

const Flights = ({ setOpenModal, setFlight, city }) => {
	const [flights, setFlights] = useState([])
	const [search, setSearch] = useState({
		destination: '',
		departureDate: '',
		returnDate: '',
		cabinClass: '',
		adults: 1,
		children: 0,		
	})

	const getFlights = async (e) => {
		e.preventDefault()
		// Convert search to query string
		const queryString = Object.keys(search).map((key) => key + '=' + search[key]).join('&')
		const res = await fetch(`/api/packages/flights?${queryString}`)
		const { itineraries: { results } } = await res.json()
		setFlights(results)
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

					{!city || city === '' ?
						(
							<div className="flex flex-col items-center justify-center h-full">
								<p className="text-xl font-semibold mb-4">Please select a city first</p>
								<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => setOpenModal(false)}>Close</button>
							</div>
						) : (
							<>
								<FlightSearch search={search} setSearch={setSearch} getFlights={getFlights} city={city} />
								<FlightsList flights={flights} setFlight={setFlight} setOpenModal={setOpenModal} />
							</>	
						)
					}
				</div>
			</div>
		</>
	)
}

export default Flights