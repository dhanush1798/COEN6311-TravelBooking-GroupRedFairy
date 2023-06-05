import { useState, useEffect } from 'react'

const Activities = ({ setOpenModal, setActivities, activities }) => {
	const [allActivities, setAllActivities] = useState([])
	const [dates, setDates] = useState({})
	
	const getActivities = async () => {
		try {
			// Get list of activities from public/activities.json
			const response = await fetch('/activities.json')
			const data = await response.json()
			setAllActivities(data)
		} catch (error) {
			console.error(error)
		}
	}

	const selectActivity = (e, activity) => {
		e.preventDefault()
		// Add activity date from dates object to activity object
		const activityWithDate = {
			...activity,
			date: dates[activity?.id],
		}
		// Add activity to activities array
		setActivities((prevState) => [...prevState, activityWithDate])
	}

	const filterActivities = async (e) => {
		e.preventDefault()
		const keywords = e.target.keywords.value
		// Find keyword in allActivities list matching activity name or description
		const filteredActivities = allActivities.filter((activity) => {
			return activity.name.toLowerCase().includes(keywords.toLowerCase()) || activity.description.toLowerCase().includes(keywords.toLowerCase())
		})
		setAllActivities(filteredActivities)
	}

	useEffect(() => {
		getActivities()
	}, [])

	const setActivityDate = (date, id) => {
		setDates((prevState) => ({
			...prevState,
			[id]: date,
		}))
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

					<>
						<h3 className="text-lg font-semibold mb-4">Search for activities</h3>
						<form className="flex mb-12 items-end" onSubmit={filterActivities}>
							<div className="flex-1 mr-2">
								<label htmlFor="keywords" className="block mb-1">
									Search keywords
								</label>
								<input type="text" name="keywords" id="keywords" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
							</div>
							<div className="col-span-2 sm:col-span-2">
								<button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2">
									Search
								</button>
							</div>
						</form>

						<ul className="overflow-auto h-48 mb-4">
							{allActivities.length && allActivities.map((activity) => (
								<li key={activity.id} className="flex items-center justify-between mb-2 py-2 border-t border-blue-500">
									<div className="flex-1">
										<h4 className="font-semibold">
											{activity?.name}
										</h4>
										<div className="flex items-center">
											<span className="text-gray-600">
												{activity?.description}
											</span>
										</div>
									</div>
									<form className="flex items-end" onSubmit={e => selectActivity(e, activity)}>
										<div className="flex flex-col">
											{/* Activity date field */}
											<div className="flex items-left self-end flex-col mr-2">
												<label htmlFor="date" className="block mb-1">Select a date</label>
												<input type="date" name="date" id="date" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={activities.find((a) => a.id === activity.id)?.date} onChange={e => setActivityDate(e.target.value, activity.id)} />
											</div>
										</div>
										<div className="flex flex-col">
											<h5 className="font-semibold text-xl mb-2">
												{`CAD ${activity?.price?.toLocaleString()}`}
											</h5>
											<button 
												type="submit"
												className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
												disabled={activities.find((a) => a.id === activity.id)}
											>
												{activities.find((a) => a.id === activity.id) ? 'Selected' : 'Select'}
											</button>
										</div>
									</form>
								</li>
							))}
						</ul>
					</>
				</div>
			</div>
		</>
	)
}

export default Activities