import Link from 'next/link'
import { useUserContext } from '@/context/UserContext'

const Header = () => {
	const { user, logout } = useUserContext()

	return (
		<header className="bg-blue-500 py-4 px-6">
			<nav className="flex items-center justify-between max-w-screen-lg mx-auto">
				<a href="/" className="text-white text-lg font-semibold">ConcordiaTravel</a>
				<ul className="flex space-x-4">
					{user ? (
						<>
							<li><Link href="/user/account" className="text-white hover:text-blue-200">Account</Link></li>
							<li><a onClick={logout} className="text-white hover:text-blue-200">Logout</a></li>
						</>
					) : (
						<>
							<li><Link href="/register" className="text-white hover:text-blue-200">Register</Link></li>
							<li><Link href="/login" className="text-white hover:text-blue-200">Login</Link></li>
						</>
					)}
				</ul>
			</nav>
		</header>
	)
}

export default Header