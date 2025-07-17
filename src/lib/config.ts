import { dev } from '$app/environment'

export const title = 'Tia Nguyen\'s Digital Garden'
export const description = 'where I share thoughts about life, learning, and tech'
export const url = dev ? 'http://localhost:5173/' : 'https://tia-code.netlify.app/'

// Centralized site configuration for RSS feed
export const siteConfig = {
	title: 'Tia Nguyen\'s Digital Garden',
	description: 'where I share thoughts about life, learning, and tech',
	url: dev ? 'http://localhost:5173' : 'https://tia-nguyen.vercel.app/',
	language: 'en-us',
	generator: 'SvelteKit RSS Generator'
}
