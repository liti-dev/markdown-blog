import { getPosts } from '$lib/posts'
import { error } from '@sveltejs/kit'

export async function load() {
	try {
		const posts = await getPosts()
		
		// Extract all unique categories
		const allCategories = posts.flatMap(post => post.categories)
		const categories = [...new Set(allCategories)].sort()
		
		return { posts, categories }
	} catch(e){
		console.error(e)
		error(500, "Failed to load posts")
	}
}
