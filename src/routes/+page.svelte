<script lang="ts">
	import { formatDate, getCategoryStyles } from '$lib/utils'
	import * as config from '$lib/config'
	import SEO from '$lib/components/SEO.svelte'

	let { data } = $props()

	const POSTS_PER_PAGE = 4
	let currentPage = $state(1)

	// Calculate pagination
	let totalPages = $derived(Math.ceil(data.posts.length / POSTS_PER_PAGE))
	let startIndex = $derived((currentPage - 1) * POSTS_PER_PAGE)
	let endIndex = $derived(startIndex + POSTS_PER_PAGE)
	let paginatedPosts = $derived(data.posts.slice(startIndex, endIndex))
	let hasNextPage = $derived(currentPage < totalPages)
	let hasPrevPage = $derived(currentPage > 1)

	function goToPage(page: number) {
		currentPage = page
		// Scroll to top when changing pages
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
</script>

<SEO title={config.title} description={config.description} type="website" />

<svelte:head>
	<link rel="preload" as="image" href="/garden.png" />
</svelte:head>

<div class="layout-container">
	<!-- shows only on mobile -->
	<div class="mobile-garden">
		<img
			src="/garden.png"
			alt="mind garden"
			width="280"
			height="200"
			fetchpriority="high"
			loading="eager"
			decoding="sync"
		/>
	</div>

	<main class="main-content">
		<ul class="posts">
			{#each paginatedPosts as post}
				<li class="post">
					<a href={post.slug} class="title"
						>{post.status === 'tree' ? '🌳' : '🌱 (Draft)'} {post.title}</a
					>
					<p class="date">{formatDate(post.date)}</p>
					<p class="description">{post.description}</p>
				</li>
			{/each}
		</ul>

		<p class="count">
			My digital garden has {data.posts.length} trees (posts)
		</p>

		<!-- Pagination Controls -->
		{#if totalPages > 1}
			<nav class="pagination" aria-label="Blog pagination">
				<div class="pagination-controls">
					{#if hasPrevPage}
						<button
							onclick={() => goToPage(currentPage - 1)}
							class="pagination-btn prev"
							aria-label="Previous page"
						>
							← Previous
						</button>
					{/if}

					<!-- Page numbers -->
					<div class="page-numbers">
						{#each Array.from({ length: totalPages }, (_, i) => i + 1) as pageNum}
							{#if pageNum === currentPage}
								<span class="page-number current" aria-current="page">{pageNum}</span>
							{:else if Math.abs(pageNum - currentPage) <= 2 || pageNum === 1 || pageNum === totalPages}
								<button onclick={() => goToPage(pageNum)} class="page-number">{pageNum}</button>
							{:else if Math.abs(pageNum - currentPage) === 3}
								<span class="page-ellipsis">…</span>
							{/if}
						{/each}
					</div>

					{#if hasNextPage}
						<button
							onclick={() => goToPage(currentPage + 1)}
							class="pagination-btn next"
							aria-label="Next page"
						>
							Next →
						</button>
					{/if}
				</div>
			</nav>
		{/if}
	</main>

	<aside class="sidebar">
		<div class="sidebar-content">
			<h3>Seeds I've planted</h3>

			<ul class="categories">
				{#each data.categories as category}
					{@const styles = getCategoryStyles(category)}
					<li>
						<a
							href={`/category/${category}`}
							class="category-link"
							style="background-color: {styles.backgroundColor}; color: {styles.color}"
						>
							#{category}
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<!-- shows only on desktop -->
		<div class="desktop-garden">
			<img
				src="/garden.png"
				alt="mind garden"
				width="300"
				height="215"
				loading="lazy"
				decoding="async"
			/>
		</div>
	</aside>
</div>

<style>
	.layout-container {
		display: grid;
		gap: var(--size-7);
		contain: layout; /* Optimize layout calculations */

		/* Mobile: single column */
		grid-template-columns: 1fr;

		/* Medium screens and up: main content + sidebar */
		@media (min-width: 768px) {
			grid-template-columns: 1fr 250px;
			max-width: 1200px;
			margin-inline: auto;
		}
	}

	.mobile-garden {
		display: block;
		text-align: center;
		margin-bottom: var(--size-4);

		img {
			max-width: 70%;
			height: auto;
		}

		@media (min-width: 768px) {
			display: none;
		}
	}

	.desktop-garden {
		display: none;

		img {
			max-width: 100%;
			height: auto;
		}

		@media (min-width: 768px) {
			display: block;
			margin-top: var(--size-5);
		}
	}

	.main-content {
		min-width: 0; /* Prevent grid overflow */
		min-height: 60vh; /* Reserve space to prevent layout shift */
		contain: layout; /* Optimize layout calculations */
	}

	.posts {
		display: grid;
		gap: var(--size-7);
		contain: layout; /* Optimize layout calculations */

		.post {
			max-inline-size: var(--size-content-4);
			min-height: 120px; /* Reserve minimum space per post */

			&:not(:last-child) {
				padding-bottom: var(--size-7);
			}

			.title {
				font-family: 'Silkscreen', monospace;
				font-size: var(--font-size-fluid-2);
				text-transform: none;
				line-height: 1.4;
				min-height: 1.4em; /* Reserve space for title */
			}

			.date {
				color: var(--text-2);
				min-height: 1.2em; /* Reserve space for date */
			}

			.description {
				margin-top: var(--size-3);
				min-height: 2.4em; /* Reserve space for description */
			}
		}
	}

	.count {
		margin-top: var(--size-10);
		margin-bottom: var(--size-7);
		padding: var(--size-5) var(--size-3);
		text-align: center;
		font-size: var(--font-size-fluid-1);
		font-style: italic;
		color: var(--text-2);
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		background: var(--surface-2);
		border-radius: var(--radius-2);
		max-inline-size: var(--size-content-3);
		margin-inline: auto;
	}

	.pagination {
		margin-top: var(--size-8);
		padding: var(--size-5);
		max-inline-size: var(--size-content-3);
		margin-inline: auto;

		.pagination-controls {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: var(--size-2);
			flex-wrap: wrap;
		}

		.pagination-btn {
			padding: var(--size-2) var(--size-3);
			background: var(--surface-3);
			border: 1px solid var(--border);
			border-radius: var(--radius-2);
			color: var(--text-1);
			font-size: var(--font-size-1);
			cursor: pointer;
			transition: all 0.2s ease;

			&:hover {
				background: var(--surface-4);
				transform: translateY(-1px);
			}

			&.prev,
			&.next {
				font-weight: 500;
			}
		}

		.page-numbers {
			display: flex;
			align-items: center;
			gap: var(--size-1);
		}

		.page-number {
			padding: var(--size-2);
			min-width: var(--size-7);
			text-align: center;
			color: var(--text-1);
			border: none;
			background: transparent;
			border-radius: var(--radius-2);
			font-size: var(--font-size-1);
			cursor: pointer;
			transition: all 0.2s ease;

			&:hover {
				background: var(--surface-3);
			}

			&.current {
				background: var(--accent);
				color: var(--accent-text);
				font-weight: 600;
				cursor: default;
			}
		}

		.page-ellipsis {
			padding: var(--size-2);
			color: var(--text-2);
			font-size: var(--font-size-1);
		}

		/* Mobile responsive */
		@media (max-width: 480px) {
			.pagination-controls {
				flex-direction: column;
				gap: var(--size-3);
			}

			.page-numbers {
				order: -1;
			}
		}
	}

	.sidebar {
		display: none;

		@media (min-width: 768px) {
			display: block;
			position: sticky;
			top: var(--size-7);
			height: fit-content;
		}

		.sidebar-content {
			background: var(--surface-2);
			border: 1px solid var(--border);
			border-radius: var(--radius-2);
			padding: var(--size-5);

			h3 {
				margin: 0 0 var(--size-3) 0;
				font-size: var(--font-size-2);
				color: var(--text-1);
			}
		}

		.categories {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-direction: column;
			gap: var(--size-2);

			.category-link {
				text-decoration: none;
				font-size: var(--font-size-1);
				padding: var(--size-1) var(--size-2);
				border-radius: var(--radius-2);
				transition: all 0.2s ease;
				display: inline-block;

				&:hover {
					opacity: 0.8;
					transform: translateY(-1px);
				}
			}
		}
	}
</style>
