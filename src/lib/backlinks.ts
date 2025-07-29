
/**
 * Find all posts that link to the given post slug
 */
export async function getBacklinks(targetSlug: string): Promise<Array<{ slug: string; title: string; description: string }>> {
	const backlinks: Array<{ slug: string; title: string; description: string }> = []
	
	// Get all markdown files as raw text for content checking
	const rawModules = import.meta.glob('/src/posts/*.md', { query: '?raw', import: 'default', eager: true })
	
	// Get all markdown files with metadata for importing
	const metadataModules = import.meta.glob('/src/posts/*.md', { eager: true })
	
	for (const [path, content] of Object.entries(rawModules)) {
		const slug = path.split('/').pop()?.replace('.md', '')
		if (!slug || slug === targetSlug) continue
		
		// Check if this post's content links to our target
		const linkPattern = new RegExp(`\\[([^\\]]+)\\]\\(\\/${targetSlug}\\)`, 'g')
		if (linkPattern.test(content as string)) {
			// Get metadata from the corresponding module
			const postModule = metadataModules[path] as { metadata?: { title: string; description: string } }
			if (postModule?.metadata) {
				backlinks.push({
					slug,
					title: postModule.metadata.title,
					description: postModule.metadata.description
				})
			}
		}
	}
	
	return backlinks
}