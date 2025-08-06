<script lang="ts">
	interface Props {
		items: any[]
		itemsPerPage?: number
		currentPage?: number
	}

	let { items, itemsPerPage = 10, currentPage = $bindable(1) }: Props = $props()

	// Calculate pagination
	let totalPages = $derived(Math.ceil(items.length / itemsPerPage))
	let startIndex = $derived((currentPage - 1) * itemsPerPage)
	let endIndex = $derived(startIndex + itemsPerPage)
	let paginatedItems = $derived(items.slice(startIndex, endIndex))
	let hasNextPage = $derived(currentPage < totalPages)
	let hasPrevPage = $derived(currentPage > 1)

	function goToPage(page: number) {
		currentPage = page
		// Scroll to top when changing pages
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	export { paginatedItems }
</script>

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

<style>
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
</style>
