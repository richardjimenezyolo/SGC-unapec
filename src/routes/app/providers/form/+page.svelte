<script>
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { doc, setDoc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';

	let error = $state(null);

	let providerData = $state({
		id: URL.parse(location.href)?.searchParams.get('id'),
		name: '',
	});

	if (providerData.id) {
		getDoc(doc(db, 'providers', providerData.id)).then((data) => {
			data = data.data()
			delete data.id
			providerData = {
				...providerData,
				...data
			}
		});
	}

	const save = () => {
		if (providerData.id) {

			updateDoc(doc(db, 'providers', providerData.id), providerData)
			.then(() => {
				goto('/app/providers')
			})
			return;
		}

		addDoc(collection(db, 'providers'), providerData)
		.then(e => {
			goto('/app/providers')
		})
		
	};
</script>

<div class="flex justify-center">
	<form class="w-3/4" onsubmit={save}>
		<article>
			<header>
				<h3>Nuevo Proveedor</h3>
			</header>

			<p class="mb-4" style="color: var(--pico-del-color);">
				{error}
			</p>

			<label>
				Nombre proveedor:
				<input type="text" placeholder="MercaSid" bind:value={providerData.name} />
			</label>

			<footer class="flex justify-end">
				
				<button>Guardar</button>
			</footer>
		</article>
	</form>
</div>
