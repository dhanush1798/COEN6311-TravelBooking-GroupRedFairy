import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Link from 'next/link'

const Packages = () => {
	const [searchTerm, setSearchTerm] = useState(null)

	const search = (e) => {
		e.preventDefault()
	}

	const packages = [
		{
			id: 1,
			title: 'Package 1',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		},
		{
			id: 2,
			title: 'Package 2',
			description: 'Nulla nec tincidunt felis, in dictum sapien.',
		},
		{
			id: 3,
			title: 'Package 1',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			featured: true,
		},
		{
			id: 4,
			title: 'Package 2',
			description: 'Nulla nec tincidunt felis, in dictum sapien.',
		},
		{
			id: 5,
			title: 'Package 1',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			featured: true,
		},
		{
			id: 6,
			title: 'Package 2',
			description: 'Nulla nec tincidunt felis, in dictum sapien.',
		},
		{
			id: 7,
			title: 'Package 1',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			featured: true,
		},
		{
			id: 8,
			title: 'Package 2',
			description: 'Nulla nec tincidunt felis, in dictum sapien.',
		},
	]

	return (
		<>
			<Header />
			<main className="packages">
				<div className="max-w-screen-lg mx-auto">
					<section className="my-12">
						<h2 className="text-2xl font-bold mb-4">Top picks</h2>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{packages
								.filter((pkg) => pkg.featured)
								.slice(0, 6)
								.map((pkg) => (
									<div key={pkg.id} className="mb-4">
										<div className="bg-gray-100 rounded p-4">
											<img
												src={pkg.image}
												alt={pkg.title}
												className="w-full h-auto mb-2"
											/>
											<h3 className="text-lg font-semibold mb-2">{pkg.title}</h3>
											<p className="text-gray-600">{pkg.description}</p>
										</div>
									</div>
								))}
						</div>
						{/* Centered link that takes to create package and says create your own package */}
						<div className="text-center mt-4">
							<Link href="/packages/new" className="text-blue-500 hover:text-blue-600">
								Create your own package
							</Link>
						</div>
					</section>
					<section className="my-12">
						<h2 className="text-2xl font-bold mb-4">Search Packages</h2>
						<form className="flex" onSubmit={search}>
							<input
								type="text"
								placeholder="Search..."
								className="w-full px-4 py-2 border rounded-l focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600">
								Search
							</button>
						</form>
					</section>
					<section className="my-12">
						<h2 className="text-2xl font-bold mb-4">All Packages</h2>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
							{packages.map((pkg) => (
								<div key={pkg.id} className="bg-gray-100 rounded p-4 flex">
									<img
										src={pkg.image}
										alt={pkg.title}
										className="w-1/3 h-auto mr-4"
									/>
									<div>
										<h3 className="text-lg font-semibold mb-2">{pkg.title}</h3>
										<p className="text-gray-600">{pkg.description}</p>
									</div>
								</div>
							))}
						</div>
					</section>
				</div>
			</main>
		</>
	)
}

// Get packages from the server as static props
export async function getStaticProps() {
	// const res = await fetch('/api/packages')
	// const packages = await res.json()
	return {
		props: {
			packages: [],
		},
	}
}

export default Packages