import type { Post } from '$lib/types'

// The fetch function from load has superpowers like being able to resolve the relative URL api/posts which would not work using regular fetch
export async function load({ fetch }) {
	const response = await fetch('/api/posts')
	const posts: Post[] = await response.json()
	return { posts }
}
