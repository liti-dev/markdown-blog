type DateStyle = Intl.DateTimeFormatOptions['dateStyle']

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	// Safari is mad about dashes in the date
	const dateToFormat = new Date(date.replaceAll('-', '/'))
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle })
	return dateFormatter.format(dateToFormat)
}


export function getCategoryColor(category: string): string {
	const categoryColors: Record<string, string> = {
		// Sustainability 
		'sustainability': '#a7c957',      
		'green-software': '#386641',      
		  
		// Dev
		'vscode':'#ff8f94' ,                        
		'reading-code': '#f72585',
		'performance': '#ffb3c1',
		'security':'#ae0039',
		
		// Others
		'learning': '#8F00FF',
	}
	
	return categoryColors[category] || '#6b7280' // ⚫ 
}

// get text color based on background
export function getCategoryTextColor(category: string): string {
	const darkBackgrounds = ['#386641', '#bc4749', '#f72585', '#ae0039','#6a994e']
	const bgColor = getCategoryColor(category)
	
	return darkBackgrounds.includes(bgColor) ? '#ffffff' : '#000000'
}

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