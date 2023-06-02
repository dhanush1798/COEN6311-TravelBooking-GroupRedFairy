import { formatDate } from '@/utils/date'

const NewPackageForm = ({ packageData, setPackageData, handleSubmit, handleChange, setImage, flight, setFlight, hotel, setHotel, setOpenFlightsModal, setOpenHotelsModal }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-4">
				<label htmlFor="name" className="block mb-1">
					Package name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={packageData.name}
					onChange={handleChange}
					required
					className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="city" className="block mb-1">
					City
				</label>
				<input
					type="text"
					id="city"
					name="city"
					value={packageData.city}
					onChange={handleChange}
					required
					className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="description" className="block mb-1">
					Description
				</label>
				<textarea
					id="description"
					name="description"
					value={packageData.description}
					onChange={handleChange}
					className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
				></textarea>
			</div>
			<div className="mb-4">
				<label htmlFor="image" className="block mb-1">
					Image
				</label>
				<input
					type="file"
					id="image"
					name="image"
					accept="image/*"
					className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					onChange={(e) => setImage(e.target.files[0])}
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="image" className="block mb-1">
					Flight
				</label>
				<div className="flex items-justify-start mb-2">
					{flight ?
						(
							<div className="flex justify-start">
								<div className>
									<p className="mb-2">{`${flight.legs?.[0].origin} to ${flight.legs?.[0].destination} and ${flight.legs?.[1].origin} to ${flight.legs?.[1].destination}`}</p>
									<p className="mb-2">{`${formatDate(flight.legs?.[0].departure)} to ${formatDate(flight.legs?.[1].arrival)}`}</p>
								</div>
								{/* Button to remove flight */}
								<button type="button" onClick={() => setFlight(null)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Remove Flight</button>
							</div>
						) :
						(
							<button type="button" onClick={() => setOpenFlightsModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Flight</button>
						)
					}
				</div>
			</div>

			<div className="mb-4">
				<label htmlFor="image" className="block mb-1">
					Hotel
				</label>
				<div className="flex items-justify-start mb-2">
					{flight ?
						(
							<div className="flex justify-start">
								<div className>
									<p className="mb-2">{`${flight.legs?.[0].origin} to ${flight.legs?.[0].destination} and ${flight.legs?.[1].origin} to ${flight.legs?.[1].destination}`}</p>
									<p className="mb-2">{`${formatDate(flight.legs?.[0].departure)} to ${formatDate(flight.legs?.[1].arrival)}`}</p>
								</div>
								{/* Button to remove flight */}
								<button type="button" onClick={() => setHotel(null)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Remove Hotel</button>
							</div>
						) :
						(
							<button type="button" onClick={() => setOpenHotelsModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Hotel</button>
						)
					}
				</div>
			</div>
				
			<div className="mb-4">
				<label htmlFor="isCustom" className="block mb-1">
					Is Custom
				</label>
				<input
					type="checkbox"
					id="isCustom"
					name="isCustom"
					checked={packageData.isCustom}
					onChange={handleChange}
					className="form-checkbox h-5 w-5 text-blue-500"
				/>
			</div>
			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			>
				Create Package
			</button>
		</form>
	)
}

export default NewPackageForm