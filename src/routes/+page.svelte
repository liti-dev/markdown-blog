<script lang="ts">
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'
	import SEO from '$lib/components/SEO.svelte'
	import { getCategoryColor, getCategoryTextColor } from '$lib/utils'

	let { data } = $props()
</script>

<SEO title={config.title} description={config.description} type="website" />

<div class="layout-container">
	<main class="main-content">
		<ul class="posts">
			{#each data.posts as post}
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
			Each tree represents one post. My digital garden now has {data.posts.length} trees
		</p>
	</main>

	<aside class="sidebar">
		<div class="sidebar-content">
			<h3>Ideas I'm exploring</h3>
			<ul class="categories">
				{#each data.categories as category}
					<li>
						<a
							href={`/category/${category}`}
							class="category-link"
							style="background-color: {getCategoryColor(category)}; color: {getCategoryTextColor(
								category
							)}"
						>
							#{category}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</aside>
</div>

<style>
	.layout-container {
		display: grid;
		gap: var(--size-7);

		/* Mobile: single column */
		grid-template-columns: 1fr;

		/* Desktop: main content + sidebar */
		@media (min-width: 1024px) {
			grid-template-columns: 1fr 250px;
			max-width: 1200px;
			margin-inline: auto;
		}
	}

	.main-content {
		min-width: 0; /* Prevent grid overflow */
	}

	.posts {
		display: grid;
		gap: var(--size-7);

		.post {
			max-inline-size: var(--size-content-4);

			&:not(:last-child) {
				padding-bottom: var(--size-7);
			}

			.title {
				font-family: 'Silkscreen', monospace;
				font-size: var(--font-size-fluid-2);
				text-transform: none;
				line-height: 1.4;
			}

			.date {
				color: var(--text-2);
			}

			.description {
				margin-top: var(--size-3);
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

	.sidebar {
		display: none;

		@media (min-width: 1024px) {
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
