import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Header from '@/components/layout/Header'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const Register = () => {
	const [registrationData, setRegistrationData] = useState({
		email: '',
		password: '',
		first_name: '',
		last_name: '',
		dob: '',
		city: '',
		state: '',
		country: '',
	})
	const [status, setStatus] = useState(null) 

	const handleChange = (e) => {
		setRegistrationData({
			...registrationData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		// Send POST request to /api/user/register
		const res = await fetch('/api/user/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(registrationData),
		})
		const user = await res.json()
		if (user?.id) {
			setStatus('success')
		} else {
			setStatus('error')
		}
	}

	return (
		<>
			<Header />
			<main className='register'>
				<div className="max-w-md mx-auto mt-8">
					<h2 className="text-2xl font-bold mb-4">Registration</h2>
					{status === 'success' ? (
						<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
							<h3 className="font-bold mb-2">Registration successful.</h3>
							<p><Link href='/login'>Click here to log in</Link></p>
						</div>
					) : status === 'error' ? (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
							<h3 className="font-bold mb-2">Registration failed.</h3>
							<p>Please try again later or contact support.</p>
						</div>
					) : 
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label htmlFor="email" className="block mb-1">
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={registrationData.email}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="password" className="block mb-1">
									Password
								</label>
								<input
									type="password"
									id="password"
									name="password"
									value={registrationData.password}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="first_name" className="block mb-1">
									First Name
								</label>
								<input
									type="text"
									id="first_name"
									name="first_name"
									value={registrationData.first_name}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="last_name" className="block mb-1">
									Last Name
								</label>
								<input
									type="text"
									id="last_name"
									name="last_name"
									value={registrationData.last_name}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="dob" className="block mb-1">
									Date of Birth
								</label>
								<input
									type="date"
									id="dob"
									name="dob"
									value={registrationData.dob}
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
									value={registrationData.city}
									onChange={handleChange}
									className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="state" className="block mb-1">
									State
								</label>
								<input
									type="text"
									id="state"
									name="state"
									value={registrationData.state}
									onChange={handleChange}
									className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="country" className="block mb-1">
									Country
								</label>
								<input
									type="text"
									id="country"
									name="country"
									value={registrationData.country}
									onChange={handleChange}
									className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<button
								type="submit"
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
							>
								Register
							</button>
						</form>
					}
				</div>
			</main>
		</>
	)
}

export default Register