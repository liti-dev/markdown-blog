import { error } from '@sveltejs/kit'
import { getBacklinks } from '$lib/utils'

export const prerender = true

export async function load({ params }) {
	try {
		const post = await import(`../../posts/${params.slug}.md`)

		// Pre-compute backlinks at build time
		const backlinks = await getBacklinks(params.slug)

		return {
			content: post.default,
			meta: { ...post.metadata, slug: params.slug },
			backlinks
		}
	} catch (e) {
		error(404, `Could not find post "${params.slug}"`)
	}
}
