<script>
	import { page } from '$app/stores';
	import logo from './zanle_logo.svg';
	import user from './user.svg';
</script>

<header>
	<div class="corner">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="ZanleCoin" />
			Zanle Coin
		</a>
	</div>

	<nav>
		<ul>
			<li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Home</a></li>
			<li class:active={$page.url.pathname === '/about'}>
				<a sveltekit:prefetch href="/about">About</a>
			</li>
			<li class:active={$page.url.pathname === '/todos'}>
				<a sveltekit:prefetch href="/todos">Anotations</a>
			</li>
		</ul>
	</nav>

	<div class="user">
		<!-- <div class="menu_burger">menu_burger</div> -->
			<img src={user} alt="user" />
	</div>
</header>

<style>
	header {
		width: 100%;
		height: 70px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: hsla(216, 19%, 16%, 0.5);
		backdrop-filter: blur(7px);
		position: fixed;
	}

	.corner {
		/* width: 6em; */
		height: 3em;
		display: flex;
		align-items: center;
		padding: 0 1em;
	}
	.user {
		width: 6em;
		height: 3em;
		display: flex;
		align-items: center;
		padding: 0 1em;
	}
	.user img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
		background: white;
		border-radius: 100%;
		padding: 5px;
		box-sizing: border-box;
		margin-right: 0.5em;
	}

	nav {
		display: flex;
		justify-content: center;
		/* --background: rgba(255, 255, 255, 0.7); */
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}
	
	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}
	.menu_burger {
		display: none;
	}

	@media (max-width: 900px) {
		nav {
			display: none;
		}
		.menu_burger {
			display: block;
			color: white;
		}
	}
</style>
