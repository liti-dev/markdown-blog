<script lang="ts">
	import { getCategoryStyles } from '$lib/utils'

	let { category, href = '' }: { category: string; href?: string } = $props()
	const styles = getCategoryStyles(category)
</script>

{#if href}
	<a {href} class="tag" style="border-color: {styles.color}; color: {styles.color};">
		{category}
	</a>
{:else}
	<span class="tag" style="border-color: {styles.color}; color: {styles.color};">
		{category}
	</span>
{/if}

<style>
	.tag {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		line-height: 1;
		padding: 0.3em 0.6em;
		border: 1px solid;
		background: transparent;
		text-decoration: none;
		letter-spacing: 0.02em;
		transition: opacity 0.2s ease;
	}

	a.tag:hover {
		opacity: 0.7;
	}

	a.tag,
	a.tag:visited {
		color: inherit;
		border-bottom: 1px solid;
	}
</style>
