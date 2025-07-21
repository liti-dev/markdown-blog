<svelte:head>
	<title>Contact</title>
	<meta name="description" content="Get in touch" />
</svelte:head>

<div class="text-column">
	<div class="contact-info">
		<h2>Get in Touch</h2>
		<p>
			You can reach me through:
		</p>
		<ul>
			<li>Email: tia.nkm03@gmail.com</li>
			<li><a href="https://github.com/liti-dev" target="_blank">GitHub</a></li>
      <li><a href="https://www.linkedin.com/in/thuyet-ng-03/" target="_blank">Linkedin</a></li>
      <li><a href="https://bsky.app/profile/tia-nguyen.bsky.social" target="_blank">Bluesky</a></li>
			
		</ul>
	</div>

	<p>
		Looking forward to connecting!
	</p>
</div>

<style>
	.text-column {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		text-align: left;
	}

	/* h1 {
		width: 100%;
	} */

	.contact-info {
		margin: 2rem 0;
		padding: 1.5rem;
		background: var(--surface-2, #f5f5f5);
		border-radius: 8px;
	}

	ul {
		margin: 1rem 0;
	}

	li {
		margin: 0.5rem 0;
	}
</style>