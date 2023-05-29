import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Header from '@/components/layout/Header'
import { useRouter } from 'next/router'
import { useUserContext } from '@/context/UserContext'

const inter = Inter({ subsets: ['latin'] })

const Login = () => {
	const router = useRouter()
	const [status, setStatus] = useState(null)
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	})

	const { user, setUser } = useUserContext()

	const handleChange = (e) => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		// Send POST request to /api/user/login
		const res = await fetch('/api/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(loginData),
		})
		const data = await res.json()
		if (data?.id) {
			// Set user in UserContext and session storage
			setUser(data)
			sessionStorage.setItem('user', JSON.stringify(data))
			// Redirect to /user/account
			router.push('/user/account')
		} else {
			setStatus({ error: data.message })
		}
	}

	return (
		<>
			<Header />
			<main className='login'>
				<div className="max-w-md mx-auto mt-8">
					<h2 className="text-2xl font-bold mb-4">Login</h2>
					{status?.error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
							<h3 className="font-bold mb-2">Login failed.</h3>
							<p>{status?.error}</p>
						</div>
					)}
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor="email" className="block mb-1">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={loginData.email}
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
								value={loginData.password}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						>
							Login
						</button>
					</form>
				</div>
			</main>
		</>
	)
}

export default Login
