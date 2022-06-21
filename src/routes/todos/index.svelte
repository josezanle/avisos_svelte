<script>
	import { enhance } from '$lib/form';
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';
	import notesBaseUrl from '../../api/notes';
	import Modal from '../../components/modal/Modal.svelte';
	import fileUpload from '../../api/cloudinary/fileUpload';

	let notes = [];
	let showModal = false;
	let filePicture;
	let image_url;
	let titulo;
	let descripcion;

	onMount(async () => {
		const res = await fetch(notesBaseUrl + '/avisos');
		const json = await res.json();
		notes = json;
	});

	const newNoteOpenModal = () => {
		showModal = true;
	};
	const handlePictureClick = () => {
		document.querySelector('#fileSelector').click();
	};
	const handleFileChange = (e) => {
		filePicture = e.target.files[0];
		fileUpload(filePicture).then((resp) => {
			image_url = resp;
		});
	};
	const newNote = () => {
		let data = {
			image: image_url,
			titulo,
			descripcion
		};

		fetch(notesBaseUrl + '/nuevo-aviso', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Genial!, creaste una nota!',
				showConfirmButton: true,
				timer: 1500
			});
		});
		showModal = false;
	};

	const deleteNote = (id) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(notesBaseUrl + '/aviso/' + id, {
					method: 'DELETE'
				});
				Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
			}
		});
	};
</script>

<svelte:head>
	<title>Anotations</title>
	<meta name="description" content="A note list app" />
	<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</svelte:head>

<div class="notes">
	<h1 class="title">Anotations</h1>

	{#if showModal}
		<Modal on:close={() => (showModal = false)}>
			<div class="modal_content">
				<input
					id="fileSelector"
					type="file"
					name="file"
					class="no_display"
					on:change={handleFileChange}
				/>

				<button on:click={handlePictureClick} class="image_btn">Select a Picture </button>

				<input
					type="text"
					bind:value={titulo}
					placeholder="Ingresa un titulo"
					class="input_titulo"
				/>
				<input
					type="text"
					bind:value={descripcion}
					placeholder="Ingresa una descripcion"
					class="input_descripcion"
				/>
				<button class="send_note_btn" on:click={() => newNote()}> Send Note </button>
			</div>
		</Modal>
	{/if}

	<div class="tap_new_note" on:click={() => newNoteOpenModal()}>+ New Note</div>

	{#each notes as note (note._id)}
		<div class="note" transition:scale|local={{ start: 0.7 }} animate:flip={{ duration: 200 }}>
			<div class="note">
				<div class="image_content">
					<img src={note.image} alt={note.titulo} />
				</div>
				<div class="note_content">
					<p class="note_title">{note.titulo}</p>
					<p class="note_description">{note.descripcion}</p>
				</div>
				<button class="delete_btn" on:click={deleteNote(note._id)}>X</button>
			</div>
		</div>
	{:else}
		<!-- this block renders when photos.length === 0 -->
		<p>loading...</p>
	{/each}
</div>

<style>
	.notes {
		width: 100%;
		min-height: calc(100vh - 40px);
		/* background: #1c2129; */
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
		border-radius: 1em;
		padding-top: 3em;
	}
	.title {
		color: #f1f1f1;
		margin-bottom: 1em;
	}
	.tap_new_note {
		width: 600px;
		height: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: linear-gradient(-90deg, #ce756c 0%, #7a3f70 100%);
		border-radius: 10px;
		margin-bottom: 1em;
		font-size: 1.5em;
		color: silver;
		cursor: pointer;
	}
	.tap_new_note:hover {
		background-image: linear-gradient(
			-90deg,
			hsla(6, 50%, 62%, 0.8) 0%,
			hsla(310, 32%, 36%, 0.8) 100%
		);
		color: silver;
	}
	.note {
		width: 600px;
		min-height: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #111419;
		border-radius: 10px;
		margin: 5px 0;
		padding: 0.5em;
		box-sizing: border-box;
	}
	/* .------------------- */
	.image_content {
		width: 170px;
		height: 140px;
	}
	.image_content img {
		width: 100%;
		height: 100%;
		border-radius: 1em;
		object-fit: cover;
	}
	/* ------------ */
	.note_content {
		width: 100%;
		min-height: 150px;
		display: flex;
		flex-flow: column;
		padding: 0 0.5em;
	}
	.note_content .note_title {
		width: 100%;
		font-size: 1.2em;
	}
	.note_content .note_description {
		width: 100%;
		font-size: 0.8em;
	}
	/* .------------------- */
	.delete_btn {
		width: 50px;
		height: 50px;
		background: transparent;
		border: none;
		outline: none;
		color: silver;
		cursor: pointer;
	}
	.modal_content {
		display: flex;
		flex-flow: column;
		width: 100%;
		height: 100%;
	}
	.no_display {
		display: none;
	}
	.input_titulo,
	.image_btn,
	.input_descripcion {
		width: 100%;
		height: 40px;
		border: none;
		outline: none;
		background: #1c2129;
		color: silver;
		border-radius: 0.5em;
		margin: 5px 0;
		padding-left: 1em;
		text-align: left;
	}

	.input_descripcion {
		height: 300px;
	}
	.send_note_btn {
		width: 100%;
		height: 40px;
		margin-top: 1em;
		/* background: #1c2129; */
		background-image: linear-gradient(-90deg, #ce756c 0%, #7a3f70 100%);
		color: silver;
		border-radius: 0.5em;
		cursor: pointer;
		border: none;
		outline: none;
	}
	::-webkit-input-placeholder,
	::-moz-placeholder,
	:-ms-input-placeholder,
	:-moz-placeholder {
		color: silver;
	}

	.send_note_btn:hover {
		color: white;
	}

	@media (max-width: 680px) {
		.note,
		.tap_new_note {
			width: 100%;
		}
	}
	@media (max-width: 520px) {
		.tap_new_note {
			width: 180px;
			height: 40px;
		}
	}
</style>
