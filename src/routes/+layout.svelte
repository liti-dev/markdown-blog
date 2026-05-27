<script lang="ts">
	import Footer from './footer.svelte'
	import Header from './header.svelte'

	import '../app.css'

	let { children, data } = $props()
</script>

<div class="layout">
	<Header />

	<main>
		{@render children?.()}
	</main>

	<Footer />
</div>

<style>
	.layout {
		min-height: 100vh;
		max-inline-size: 1440px;
		display: grid;
		grid-template-rows: auto 1fr auto;
		margin-inline: auto;
		padding-inline: var(--space-5);

		@media (min-width: 768px) {
			padding-inline: var(--space-7);
		}

		@media (min-width: 1440px) {
			padding-inline: var(--space-9);
		}

		main {
			padding-block: var(--space-7);
		}
	}
</style>
