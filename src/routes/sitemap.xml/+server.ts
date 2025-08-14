import { getPosts } from '$lib/posts'
import { url } from '$lib/config'

export const config = {
	runtime: 'edge'
}

export async function GET() {
	const posts = await getPosts()
	const baseUrl = url
	
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<!-- Homepage -->
	<url>
		<loc>${baseUrl}</loc>
		<changefreq>weekly</changefreq>
		<priority>1.0</priority>
	</url>
	
	<!-- About page -->
	<url>
		<loc>${baseUrl}/about</loc>
		<changefreq>monthly</changefreq>
		<priority>0.8</priority>
	</url>
	
	<!-- Contact page -->
	<url>
		<loc>${baseUrl}/contact</loc>
		<changefreq>monthly</changefreq>
		<priority>0.7</priority>
	</url>
	
	<!-- Blog posts -->
	${posts
		.filter(post => post.published)
		.map(post => `
	<url>
		<loc>${baseUrl}/${post.slug}</loc>
		<lastmod>${post.date}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.9</priority>
	</url>`)
		.join('')}
	
	<!-- Category pages -->
	${[...new Set(posts.flatMap(post => post.categories))]
		.map(category => `
	<url>
		<loc>${baseUrl}/category/${category}</loc>
		<changefreq>weekly</changefreq>
		<priority>0.6</priority>
	</url>`)
		.join('')}
</urlset>`

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	})
}