import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		const post = await import(`../../posts/${params.slug}.md`)
		console.log("post",post)

		return {
			content: post.default,
			meta: post.metadata
		}
	} catch (e) {
		error(404, `Could not find post "${params.slug}"`)
	}
}
