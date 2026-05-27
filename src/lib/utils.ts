type DateStyle = Intl.DateTimeFormatOptions['dateStyle']

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	// Safari is mad about dashes in the date
	const dateToFormat = new Date(date.replaceAll('-', '/'))
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle })
	return dateFormatter.format(dateToFormat)
}

// Precomputed category styles — outline color per genre
const categoryStyles: Record<string, { backgroundColor: string; color: string }> = {
	'sustainability': { backgroundColor: 'transparent', color: 'oklch(0.55 0.05 145)' },
	'green-software': { backgroundColor: 'transparent', color: 'oklch(0.50 0.05 145)' },
	'vscode': { backgroundColor: 'transparent', color: 'oklch(0.55 0.05 280)' },
	'reading-code': { backgroundColor: 'transparent', color: 'oklch(0.55 0.05 60)' },
	'performance': { backgroundColor: 'transparent', color: 'oklch(0.55 0.05 200)' },
	'security': { backgroundColor: 'transparent', color: 'oklch(0.55 0.05 25)' },
	'learning': { backgroundColor: 'transparent', color: 'oklch(0.55 0.05 170)' },
	'local-first': { backgroundColor: 'transparent', color: 'oklch(0.50 0.05 180)' },
	'robotics': { backgroundColor: 'transparent', color: 'oklch(0.55 0.05 80)' },
	'software': { backgroundColor: 'transparent', color: 'oklch(0.55 0.05 240)' },
	'career': { backgroundColor: 'transparent', color: 'oklch(0.55 0.05 50)' }
}

const defaultStyle = { backgroundColor: 'transparent', color: 'oklch(0.55 0.03 90)' }

export function getCategoryColor(category: string): string {
	return categoryStyles[category]?.backgroundColor || defaultStyle.backgroundColor
}

export function getCategoryTextColor(category: string): string {
	return categoryStyles[category]?.color || defaultStyle.color
}

export function getCategoryStyles(category: string): { backgroundColor: string; color: string } {
	return categoryStyles[category] || defaultStyle
}

export async function getBacklinks(
	targetSlug: string
): Promise<Array<{ slug: string; title: string; description: string }>> {
	const backlinks: Array<{ slug: string; title: string; description: string }> = []

	// Use lazy loading instead of eager to avoid loading all files at once
	const rawModules = import.meta.glob('/src/posts/*.md', { query: '?raw', import: 'default' })
	const metadataModules = import.meta.glob('/src/posts/*.md')

	// Process files in smaller batches to avoid blocking
	const entries = Object.entries(rawModules)
	const batchSize = 5

	for (let i = 0; i < entries.length; i += batchSize) {
		const batch = entries.slice(i, i + batchSize)

		await Promise.all(
			batch.map(async ([path, loader]) => {
				const slug = path.split('/').pop()?.replace('.md', '')
				if (!slug || slug === targetSlug) return

				try {
					const [content, postModule] = await Promise.all([
						loader() as Promise<string>,
						metadataModules[path]() as Promise<{
							metadata?: { title: string; description: string }
						}>
					])

					// Check if this post's content links to our target
					const linkPattern = new RegExp(`\\[([^\\]]+)\\]\\(\\/${targetSlug}\\)`, 'g')
					if (linkPattern.test(content) && postModule?.metadata) {
						backlinks.push({
							slug,
							title: postModule.metadata.title,
							description: postModule.metadata.description
						})
					}
				} catch (error) {
					// Skip files that fail to load
					console.warn(`Failed to process ${path}:`, error)
				}
			})
		)
	}

	return backlinks
}
