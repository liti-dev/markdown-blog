import { dev } from '$app/environment'

export const title = 'Tia Can Code'
export const description = 'Tia Personal Blog'
export const url = dev ? 'http://localhost:5173/' : 'https://tia-code.netlify.app/'

// Centralized site configuration for RSS feed
export const siteConfig = {
	title: 'Tia Can Code',
	description: 'Tia Personal Blog',
	url: dev ? 'http://localhost:5173' : 'https://tia-code.netlify.app',
	language: 'en-us',
	generator: 'SvelteKit RSS Generator'
}
