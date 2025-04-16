<script>
	import { db } from '$lib/firebase';
	import { query, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

	/**
	 * @type {Object[]}
	 */
	let brands = $state([]);

	const loadData = () => {
		brands = [];

		getDocs(query(collection(db, 'brands'))).then((data) => {
			data.forEach((d) => {
				brands.push({
					...d.data(),
					id: d.id
				});
			});
		});
	};

    loadData()

	const removeDoc = ({ id }) => {
		deleteDoc(doc(db, 'brands', id)).then(() => {
			loadData();
		});
	};
</script>

<div class="flex w-full justify-between">
	<h1>Marcas:</h1>
	<a href="/app/brands/form" role="button">Crear nueva marca</a>
</div>

<table class="striped">
	<thead>
		<tr>
			<th>Nombre</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each brands as brand}
			<tr>
				<td>{brand.name}</td>
				<td>
					<div class="flex justify-evenly">
						<a href={`/app/brands/form?id=${brand.id}`} class="contrast">
							<ion-icon name="pencil"></ion-icon>
						</a>

						<a href="#" class="contrast" onclick={() => brand.delete = true}>
							<ion-icon name="trash"></ion-icon>
						</a>

                        <dialog open={brand.delete}>
							<article>
								<h2>Corfirmación</h2>
								<p>Estas Seguro de que deseas borrar este registro?</p>
								<footer>
									<button
										class="secondary"
										onclick={() => {
											brand.delete = false;
										}}
									>
										Cancel
									</button>
									<button onclick={() => removeDoc(brand)}>Confirmar</button>
								</footer>
							</article>
						</dialog>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
