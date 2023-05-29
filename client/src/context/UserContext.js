import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const useUserContext = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const checkUserSession = async () => {
		try {
			if (user) {
				const res = await fetch(`/api/user/session?email=${user.email}`)
				const data = await res.json()
				setUser(data)
				setLoading(false)
			}
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		const user = sessionStorage.getItem('user')
		if (user) {
			setUser(JSON.parse(user))
			setLoading(false)
		} else {
			setLoading(false)
		}
		// Get email and check session
		checkUserSession()
	}, [])

	const logout = async (e) => {
		e.preventDefault()
		try {
			// Remove user from session storage
			sessionStorage.removeItem('user')
			// Remove user from UserContext
			setUser(null)
			// Send GET request to /api/user/logout
			const res = await fetch('/api/user/logout')
			const data = await res.json()
			if (data?.success) {
				// Redirect to homepage
				router.push('/')
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<UserContext.Provider value={{ user, setUser, loading, logout }}>
			{children}
		</UserContext.Provider>
	)
}