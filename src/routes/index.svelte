<script>
	import { afterUpdate, each, onMount } from 'svelte/internal';
	import coinsBaseUrl from '../api/coins';
	import Banner from '../components/home_banner/banner.svelte';

	let titles = [
		{
			tag: 'N°',
			class: 'coin_order'
		},
		{
			tag: 'Coin',
			class: 'coin_span'
		},
		{
			tag: 'Price',
			class: 'coin_price'
		},
		{
			tag: 'Price Change',
			class: 'coin_24h_percentage'
		},
		{
			tag: '24h Volume',
			class: 'total_volume'
		}
	];
	let coins = [];
	let filteredCoins = [];

	onMount(async () => {
		try {
			const res = await fetch(coinsBaseUrl);
			const json = await res.json();
			coins = json;
			filteredCoins = json;
		} catch (error) {
			console.log(error);
		}
	});

	// const fetchCoinData = async () => {
	// 	try {
	// 		const res = await fetch(url);
	// 		const json = await res.json();
	// 		coins = json;
	// 		filteredCoins = json;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	// fetchCoinData();

	const searchCoin = (value) => {
		filteredCoins = coins.filter(
			(coin) =>
				coin.name.toLowerCase().includes(value.toLowerCase()) ||
				coin.symbol.toLowerCase().includes(value.toLowerCase())
		);
	};
	// afterUpdate(() => {
	// 	console.log('the component just updated');
	// });
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<!-- banner -->
	<Banner />
</section>

<section>
	<input
		type="text"
		placeholder="Search your Coin"
		on:keyup={({ target: { value } }) => searchCoin(value)}
		class="input_search"
	/>
	<table class="container_table">
		<thead>
			{#each titles as title}
				<tr class={title.class}>
					<h2 class="title_h3">{title.tag}</h2>
				</tr>
			{/each}
		</thead>
		<tbody>
			{#each filteredCoins as coin, i}
				<tr class="row">
					<h3 class="coin_order">{i + 1}</h3>
					<td class="coin_span">
						<img src={coin.image} alt={coin.name} class="coin_icon" />
						<p class="coin_name">{coin.name}</p>
						<p class="coin_symbol">{coin.symbol}</p>
					</td>
					<td class="coin_price">${coin.current_price.toLocaleString()}</td>
					<td class="coin_24h_percentage">
						<p class={coin.price_change_percentage_24h > 0 ? 'green' : 'red'}>
							{coin.price_change_percentage_24h}%
						</p>
					</td>
					<td class="total_volume">${coin.total_volume.toLocaleString()}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style>
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
	}

	.container_table {
		width: 1200px;
		display: flex;
		flex-flow: column;
		background: #1c2129;
		border-radius: 0.5em;
	}
	.input_search {
		width: 1199px;
		height: 3em;
		margin-bottom: 1em;
		box-sizing: border-box;
		padding-left: 1em;
		background: #1c2129;
		border-radius: 0.5em;
		border: none;
		outline: none;
	}
	.container_table thead {
		display: flex;
		flex-direction: row;
		margin-left: 0.5em;
	}
	.container_table tbody {
		width: 100%;
		display: flex;
		flex-flow: column;
		margin: 0.5em 0;
	}

	.container_table tbody .row {
		width: 100%;
		display: flex;
		border-bottom: 1px solid var(--background-body);
		margin: 1em 0;
		padding-bottom: 0.5em;
	}
	.container_table tbody .row:hover {
		background: var(--background-with-opacity);
		cursor: pointer;
	}
	/* -------------------- */

	.title_h3 {
		width: 100%;
		text-align: center;
		font-size: 1.3em;
	}
	.coin_order {
		width: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		color: silver;
	}
	.coin_span {
		width: 300px;
		display: flex;
		align-items: center;
	}
	.coin_icon {
		width: 30px;
		height: 30px;
	}
	.coin_name {
		color: silver;
		margin: 0 0.5em;
	}
	.coin_symbol {
		color: grey;
		font-size: 14px;
		margin-left: 0.5em;
	}
	/* ---------------- */
	.coin_price {
		color: silver;
		width: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.red {
		color: crimson;
	}
	.green {
		color: rgb(27, 221, 27);
	}
	/* ---------------- */
	.coin_24h_percentage {
		color: silver;
		width: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/* ----------------- */
	.total_volume {
		color: silver;
		width: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	@media (max-width: 1200px) {
		.container_table,
		.input_search {
			width: 100%;
		}
	}
	@media (max-width: 790px) {
		.container_table {
			width: 100%;
			overflow-x: scroll;
			box-sizing: border-box;
		}
		.container_table thead {
			overflow-x: scroll;
			width: 900px;
		}
		.container_table tbody {
			overflow-x: scroll;
			width: 900px;
		}

		.container_table tbody .row {
			overflow-x: scroll;
			width: 900px;
		}
	}
</style>
