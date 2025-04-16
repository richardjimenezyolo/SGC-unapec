<script>
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { doc, setDoc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';

	let error = $state(null);

	let brandData = $state({
		id: URL.parse(location.href)?.searchParams.get('id'),
		name: '',
		rnc: ''
	});

	if (brandData.id) {
		getDoc(doc(db, 'brands', brandData.id)).then((data) => {
			data = data.data()
			delete data.id
			brandData = {
				...brandData,
				...data
			}
		});
	}

	const save = () => {
		if (brandData.id) {

			updateDoc(doc(db, 'brands', brandData.id), brandData)
			.then(() => {
				goto('/app/brands')
			})
			return;
		}

		addDoc(collection(db, 'brands'), brandData)
		.then(e => {
			goto('/app/brands')
		})
		
	};
</script>

<div class="flex justify-center">
	<form class="w-3/4" onsubmit={save}>
		<article>
			<header>
				<h3>Nueva Marca</h3>
			</header>

			<p class="mb-4" style="color: var(--pico-del-color);">
				{error}
			</p>

			<label>
				Marca:
				<input type="text" placeholder="Marca" bind:value={brandData.name} />
			</label>

			<footer class="flex justify-end">
				
				<button>Guardar</button>
			</footer>
		</article>
	</form>
</div>
