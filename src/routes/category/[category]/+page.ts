import { error } from '@sveltejs/kit'

export async function load({ params, fetch }) {
	const { category } = params

	try {
		const response = await fetch(`/api/posts?category=${category}`)
		if (!response.ok) {
			throw new Error(`Failed to fetch posts for category ${category}`)
		}

		const posts = await response.json()

		return {
			posts,
			category
		}
	} catch (e) {
		throw error(404, `${e}: Could not find posts for category ${category}`)
	}
}
