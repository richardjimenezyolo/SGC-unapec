<script>
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { doc, setDoc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';

	let error = $state(null);

	let clientData = $state({
		id: URL.parse(location.href)?.searchParams.get('id'),
		name: '',
		matricula: '',
	});

	if (clientData.id) {
		getDoc(doc(db, 'clients', clientData.id)).then((data) => {
			data = data.data();
			delete data.id;
			clientData = {
				...clientData,
				...data
			};
		});
	}

	const save = () => {
		if (clientData.id) {
			updateDoc(doc(db, 'clients', clientData.id), clientData).then(() => {
				goto('/app/clients');
			});
			return;
		}

		addDoc(collection(db, 'clients'), clientData).then((e) => {
			goto('/app/clients');
		});
	};
</script>

<div class="flex justify-center">
	<form class="w-3/4" onsubmit={save}>
		<article>
			<header>
				<h3>Nuevo Cliente</h3>
			</header>

			<p class="mb-4" style="color: var(--pico-del-color);">
				{error}
			</p>

			<label>
				Nombre:
				<input type="text" placeholder="Juan Soto" bind:value={clientData.name} />
			</label>

			<label>
				Matricula:
				<input type="text" placeholder="A00110509" bind:value={clientData.matricula} />
			</label>

			<footer class="flex justify-end">
				<button>Guardar</button>
			</footer>
		</article>
	</form>
</div>
