<svelte:head>
	<title>Contact</title>
	<meta name="description" content="Get in touch" />
</svelte:head>

<div class="text-column">
	<h1>Contact</h1>

	<p>
		I'd love to hear from you! Whether you have questions about green software development, 
		want to discuss performance optimization, or just want to say hello.
	</p>

	<div class="contact-info">
		<h2>Get in Touch</h2>
		<p>
			You can reach me through:
		</p>
		<ul>
			<li>Email: tia.nkm03@gmail.com</li>
			<li><a href="https://github.com/liti-dev">GitHub</a></li>
			
		</ul>
	</div>

	<p>
		I try to respond to all messages within a few days. Looking forward to connecting!
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

	h1 {
		width: 100%;
	}

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