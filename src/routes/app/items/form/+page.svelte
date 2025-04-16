<script>
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { doc, getDoc, updateDoc, addDoc, collection, getDocs } from 'firebase/firestore';

	let error = $state(null);

	let itemData = $state({
		id: URL.parse(location.href)?.searchParams.get('id'),
		name: '',
		provider: '',
		price: ''
	});

	let providers = $state([]);

	getDocs(collection(db, 'providers')).then((list) => {
		list.forEach((p) => {
			providers.push({
				...p.data(),
				id: p.id
			});
		});
	});

	if (itemData.id) {
		getDoc(doc(db, 'items', itemData.id)).then((data) => {
			data = data.data();
			delete data.id;
			itemData = {
				...itemData,
				...data
			};
		});
	}

	const save = () => {
		if (itemData.id) {
			updateDoc(doc(db, 'items', itemData.id), itemData).then(() => {
				goto('/app/items');
			});
			return;
		}

		addDoc(collection(db, 'items'), itemData).then((e) => {
			goto('/app/items');
		});
	};
</script>

<div class="flex justify-center">
	<form class="w-3/4" onsubmit={save}>
		<article>
			<header>
				<h3>Nuevo Articulo</h3>
			</header>

			<p class="mb-4" style="color: var(--pico-del-color);">
				{error}
			</p>

			<label>
				Nombre Articulo:
				<input type="text" placeholder="Harina" bind:value={itemData.name} />
			</label>


			<label>
				Existencia:
				<input type="number" bind:value={itemData.amount} />
			</label>

			<label>
				Proveedor:
				<select bind:value={itemData.provider}>
					<option value="" disabled>Proveedores</option>

					{#each providers as p}
						<option value={p.id}>{p.name}</option>
					{/each}
				</select>
			</label>

			<label>
				Precio:
				<input type="number" placeholder="0.00 $DOP" bind:value={itemData.price} />
			</label>

			<footer class="flex justify-end">
				
				<button>Guardar</button>
			</footer>
		</article>
	</form>
</div>
