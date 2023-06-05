import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Flights from '@/components/packages/Flights'
import Hotels from '@/components/packages/Hotels'
import Activities from '@/components/packages/Activities'
import NewPackageForm from '@/components/packages/NewPackageForm'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const NewPackage = () => {
	const [packageData, setPackageData] = useState({
		name: '',
		city: '',
		description: '',
		image: '',
		isCustom: false,
	})
	const [image, setImage] = useState(null)
	const [flight, setFlight] = useState(null)
	const [openFlightsModal, setOpenFlightsModal] = useState(false)
	const [hotel, setHotel] = useState(null)
	const [openHotelsModal, setOpenHotelsModal] = useState(false)
	const [activities, setActivities] = useState([])
	const [openActivitiesModal, setOpenActivitiesModal] = useState(false)

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		setPackageData((prevState) => ({
			...prevState,
			[name]: type === 'checkbox' ? checked : value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		handleImageSubmit()
	}

	const handleImageSubmit = async (e) => {
		// Upload image to S3
		const s3 = new S3Client({
			region: process.env.NEXT_PUBLIC_AWS_REGION,
			credentials: {
				accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
				secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
			},
		})
		// Rename image to package name, date, and extension
		const fileExtension = image.name.substring(image.name.lastIndexOf('.'))
		const fileName = `${packageData.name}-${new Date().toISOString().split('T')[0]}${fileExtension}`
		const command = new PutObjectCommand({
			Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
			Key: `packages/${fileName}`,
			Body: image,
			Metadata: {
				'Content-Type': image.type,
			},
		})
		try {
			const response = await s3.send(command)
			// Get image URL
			const imageUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/packages/${fileName}`
		}
		catch (error) {
			console.error('Error at handleImageSubmit in package creation:', error)
		}
	}

	return (
		<>
			<Header />
			<main className="new-package">
				<div className="max-w-screen-lg mx-auto">
					<div className="max-w-md mx-auto mt-8">
						<h2 className="text-2xl font-bold mb-4">Create Package</h2>
						<NewPackageForm 
							packageData={packageData} 
							setImage={setImage} 
							handleChange={handleChange} 
							handleSubmit={handleSubmit}
							flight={flight}
							setFlight={setFlight}
							setOpenFlightsModal={setOpenFlightsModal}
							hotel={hotel}
							setHotel={setHotel}
							setOpenHotelsModal={setOpenHotelsModal}
							activities={activities}
							setActivities={setActivities}
							setOpenActivitiesModal={setOpenActivitiesModal}
						/>
					</div>
				</div>
				{openFlightsModal &&
					<Flights setOpenModal={setOpenFlightsModal} setFlight={setFlight} city={packageData?.city} />
				}
				{openHotelsModal &&
					<Hotels setOpenModal={setOpenHotelsModal} setHotel={setHotel} city={packageData?.city} />
				}
				{openActivitiesModal &&
					<Activities setOpenModal={setOpenActivitiesModal} setActivities={setActivities} activities={activities} />
				}
			</main>
		</>
	)
}

export default NewPackage