<script>
	import { db } from '$lib/firebase';
	import { query, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

	/**
	 * @type {any[]}
	 */
	let products = $state([]);

	const loadData = () => {
		products = [];
		getDocs(query(collection(db, 'products'))).then((data) => {
			data.forEach((d) => {
				products.push({
					...d.data(),
					id: d.id
				});
			});
		});
	};

	loadData();

	const removeDoc = ({ id }) => {
		deleteDoc(doc(db, 'products', id)).then(() => {
			loadData();
		});
	};
</script>

<div class="flex w-full justify-between">
	<h1>Productos:</h1>
	<a href="/app/products/form" role="button">Crear nuevo producto</a>
</div>

<table class="striped">
	<thead>
		<tr>
			<th>Nombre</th>
			<th>Precio</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each products as item}
			<tr>
				<td>{item.name}</td>
				<td>{item.price}</td>
				<td>
					<div class="flex justify-evenly">
						<a href={`/app/products/form?id=${item.id}`} class="contrast">
							<ion-icon name="pencil"></ion-icon>
						</a>

						<a href="#" class="contrast" onclick={() => (item.delete = true)}>
							<ion-icon name="trash"></ion-icon>
						</a>

						<dialog open={item.delete}>
							<article>
								<header>
									<h2>Corfirmacion</h2>
								</header>
								<p>Estas Seguro de que deseas borrar este registro?</p>
								<footer>
									<button
										class="secondary"
										onclick={() => {
											item.delete = false;
										}}
									>
										Cancel
									</button>
									<button onclick={() => removeDoc(item)}>Confirmar</button>
								</footer>
							</article>
						</dialog>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
