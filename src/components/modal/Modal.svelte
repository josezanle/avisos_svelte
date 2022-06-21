<script>
	import { createEventDispatcher, onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();
	export const close = () => {
		dispatch('close');
	};

	let modal;

	const handle_keydown = (e) => {
		if (e.key === 'Escape') {
			close();
			return;
		}
	};

	const previously_focused = typeof document !== 'undefined' && document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}
</script>

<svelte:window on:keydown={handle_keydown} />

<div class="modal-background" on:click={close} />

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
	<slot />
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: transparent;
	}

	.modal {
		width: 500px;
		height: 500px;
		position: absolute;
		left: 50%;
		top: 50%;
		overflow: hidden;
		transform: translate(-50%, -50%);
		padding: 1em;
		border-radius: 0.2em;
		background: hsla(217, 19%, 14%, 0.3);
		backdrop-filter: blur(7px);
		border-radius: 1em;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
	}

	@media (max-width: 680px) {
		.modal {
			width: 100%;
		}
	}
</style>
