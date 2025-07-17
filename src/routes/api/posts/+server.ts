import { json } from '@sveltejs/kit'
import type { Categories, Post } from '$lib/types'

async function getPosts() {
	let posts: Post[] = []

	const paths = import.meta.glob('/src/posts/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>
			const post = { ...metadata, slug } satisfies Post
			if (typeof post.published === 'boolean' && post.published) {
				posts.push(post)
			}
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	)

	return posts
}

async function getPostsByCategory(category: Categories) {
	const posts = await getPosts()
	return posts.filter((post) => post.categories.includes(category))
}

export async function GET({ url }: { url: URL }) {
	const category = url.searchParams.get('category')
	let posts

	if (category) {
		posts = await getPostsByCategory(category as Categories)
	} else {
		posts = await getPosts()
	}

	return json(posts)
}
