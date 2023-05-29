import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Header from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
	return (
		<>
			<Header />
		</>
	)
}

export default Home