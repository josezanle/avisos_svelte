<script>
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<Header />


<main>
	<slot />
</main>

<footer>
	<a href="https://www.linkedin.com/in/jose-rios-lm/" target="_blank">ZanleCoin x Jozelo</a>
</footer>

<style>
	main {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border-radius: 1em;
		box-shadow: .3em .3em .3em #333852;
		/* background: #333852; */
		background: #212730;
	}
	
	footer {
		height: 40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
		/* background: #333852; */
		background: #212730;
	}

	footer a {
		font-weight: bold;
		color: aliceblue;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
