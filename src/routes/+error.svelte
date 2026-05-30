<script lang="ts">
	import { page } from '$app/state'
</script>

<div class="error">
	<h1>{page.status}</h1>
	<p>{page.error?.message}</p>
	<a href="/">Back to home</a>
</div>

<style>
	.error {
		height: 100%;
		display: grid;
		place-content: center;
		text-align: center;
		gap: 1rem;
	}

	h1 {
		font-size: 3rem;
		margin: 0;
	}

	p {
		margin: 0;
		color: #666;
	}

	a {
		color: #0066cc;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
