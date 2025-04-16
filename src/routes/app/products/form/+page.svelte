<script>
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { doc, getDoc, updateDoc, addDoc, collection, getDocs } from 'firebase/firestore';

	let error = $state(null);

	let productData = $state({
		id: URL.parse(location.href)?.searchParams.get('id'),
		name: '',
		price: ''
	});

	if (productData.id) {
		getDoc(doc(db, 'products', productData.id)).then((data) => {
			data = data.data();
			delete data.id;
			productData = {
				...productData,
				...data
			};
		});
	}

	const save = () => {
		if (productData.id) {
			updateDoc(doc(db, 'products', productData.id), productData).then(() => {
				goto('/app/products');
			});
			return;
		}

		addDoc(collection(db, 'products'), productData).then((e) => {
			goto('/app/products');
		});
	};
</script>

<div class="flex justify-center">
	<form class="w-3/4" onsubmit={save}>
		<article>
			<header>
				<h3>Nuevo Producto</h3>
			</header>

			<p class="mb-4" style="color: var(--pico-del-color);">
				{error}
			</p>

			<label>
				Nombre Insumo:
				<input type="text" placeholder="Empanada" bind:value={productData.name} />
			</label>

			<label>
				Precio:
				<input type="number" placeholder="0.00 $DOP" bind:value={productData.price} />
			</label>

			<footer class="flex justify-end">
				
				<button>Guardar</button>
			</footer>
		</article>
	</form>
</div>
