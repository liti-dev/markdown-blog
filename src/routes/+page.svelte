<script lang="ts">
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'
	import SEO from '$lib/components/SEO.svelte'
	import Pagination from '$lib/components/Pagination.svelte'
	import Tag from '$lib/components/Tag.svelte'

	let { data } = $props()

	const POSTS_PER_PAGE = 10
	let currentPage = $state(1)
	let pagination = $state<Pagination>()
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
			{#each pagination?.paginatedItems || [] as post}
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

		<Pagination
			bind:this={pagination}
			items={data.posts}
			itemsPerPage={POSTS_PER_PAGE}
			bind:currentPage
		/>
	</main>

	<aside class="sidebar">
		<div class="sidebar-content">
			<h3>Seeds I've planted</h3>

			<ul class="categories">
				{#each data.categories as category}
					<li>
						<Tag {category} href={`/category/${category}`} />
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
		gap: var(--space-7);
		grid-template-columns: 1fr;

		@media (min-width: 768px) {
			grid-template-columns: 1fr 220px;
			max-width: 1200px;
			margin-inline: auto;
		}
	}

	.mobile-garden {
		display: block;
		text-align: center;
		margin-bottom: var(--space-4);

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
			margin-top: var(--space-5);
		}
	}

	.main-content {
		min-width: 0;
	}

	.posts {
		display: grid;
		gap: var(--space-7);

		.post {
			&:not(:last-child) {
				padding-bottom: var(--space-7);
				border-bottom: 1px solid var(--border);
			}

			.title {
				font-family: 'Silkscreen', monospace;
				font-size: var(--text-xl);
				text-transform: none;
				line-height: var(--leading-tight);
			}

			.date {
				color: var(--text-2);
				font-family: var(--font-mono);
				font-size: var(--text-xs);
				margin-top: var(--space-2);
			}

			.description {
				margin-top: var(--space-3);
			}
		}
	}

	.count {
		margin-top: var(--space-8);
		margin-bottom: var(--space-6);
		padding: var(--space-4) var(--space-3);
		text-align: center;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--text-2);
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
	}

	.sidebar {
		display: none;

		@media (min-width: 768px) {
			display: block;
			position: sticky;
			top: var(--space-6);
			height: fit-content;
		}

		.sidebar-content {
			border: 1px solid var(--border);
			padding: var(--space-5);

			h3 {
				margin: 0 0 var(--space-4) 0;
				font-family: var(--font-mono);
				font-size: var(--text-sm);
				color: var(--text-2);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}
		}

		.categories {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-2);
		}
	}
</style>
