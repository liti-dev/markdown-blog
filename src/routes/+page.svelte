<script lang="ts">
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'
	import SEO from '$lib/components/SEO.svelte'

	let { data } = $props()
</script>

<SEO title={config.title} description={config.description} type="website" />

<section>
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
</section>

<style>
	.posts {
		display: grid;
		gap: var(--size-7);

		.post {
			max-inline-size: var(--size-content-4);

			&:not(:last-child) {
				/* border-bottom: 1px solid var(--border); */
				padding-bottom: var(--size-7);
			}

			.title {
				font-size: var(--font-size-fluid-2);
				text-transform: capitalize;
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
</style>
