<script lang="ts">
	import { formatDate } from '$lib/utils'

	let { data } = $props()
	console.log(data)
</script>

<svelte:head>
	<title>Posts in {data.category}</title>
	<meta
		name="description"
		content="Browse all posts about {data.category} - insights, tutorials, and thoughts on {data.category}"
	/>
</svelte:head>

<section>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<a href={`/${post.slug}`} class="title">{post.title}</a>
				<p class="date">{formatDate(post.date)}</p>
				<p class="description">{post.description}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.posts {
		display: grid;
		gap: var(--space-7);

		.post {
			max-inline-size: 60vw;

			&:not(:last-child) {
				border-bottom: 1px solid var(--border);
				padding-bottom: var(--space-7);
			}

			.title {
				font-size: var(--text-xl);
				text-transform: capitalize;
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
</style>
