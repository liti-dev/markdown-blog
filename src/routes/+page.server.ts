import { getPosts } from '$lib/posts'
import { error } from '@sveltejs/kit'

const POSTS_PER_PAGE = 7

export async function load({ url }) {
	try {
		const allPosts = await getPosts()
		
		// Get page number from URL params, default to 1
		const page = parseInt(url.searchParams.get('page') || '1')
		const offset = (page - 1) * POSTS_PER_PAGE
		
		// Calculate pagination info
		const totalPosts = allPosts.length
		const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
		const hasNextPage = page < totalPages
		const hasPrevPage = page > 1
		
		// Get posts for current page
		const posts = allPosts.slice(offset, offset + POSTS_PER_PAGE)
		
		// Extract all unique categories
		const allCategories = allPosts.flatMap(post => post.categories)
		const categories = [...new Set(allCategories)].sort()
		
		return { 
			posts, 
			categories,
			pagination: {
				currentPage: page,
				totalPages,
				totalPosts,
				hasNextPage,
				hasPrevPage,
				postsPerPage: POSTS_PER_PAGE
			}
		}
	} catch(e){
		console.error(e)
		error(500, "Failed to load posts")
	}
}
