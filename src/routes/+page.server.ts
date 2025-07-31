import { getPosts } from '$lib/posts'
import { error } from '@sveltejs/kit'

export async function load() {
	try {
		const posts = await getPosts()
		return { posts }
	} catch(e){
		console.error(e)
		error(500, "Failed to load posts")
	}
}
