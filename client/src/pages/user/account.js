import Header from '@/components/layout/Header'
import { useUserContext } from '@/context/UserContext'

const Account = () => {
	const { user, loading } = useUserContext()

	return (
		<main>
			<Header />
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<>
					{user ? (
						<>
							<h1>Account</h1>
							<p>{user.email}</p>
						</>
					) : (
						<>
							<h1>Account</h1>
							<p>You are not logged in.</p>
						</>
					)}
				</>
			)}
		</main>
	)
}

export default Account