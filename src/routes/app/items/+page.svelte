<script>
	import { db } from '$lib/firebase';
	import { query, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

	/**
	 * @type {any[]}
	 */
	let items = $state([]);

	const loadData = () => {
		items = [];
		getDocs(query(collection(db, 'items'))).then((data) => {
			data.forEach((d) => {
				items.push({
					...d.data(),
					id: d.id
				});
			});
		});
	};

	loadData();

	let providers = $state({});

	getDocs(collection(db, 'providers')).then((list) => {
		list.forEach((p) => {
			providers[p.id] = {
				...p.data(),
				id: p.id
			};
		});
	});

	const removeDoc = ({ id }) => {
		deleteDoc(doc(db, 'items', id)).then(() => {
			loadData();
		});
	};
</script>

<div class="flex w-full justify-between">
	<h1>Articulos:</h1>
	<a href="/app/items/form" role="button">Crear nuevo articulo</a>
</div>

<table class="striped">
	<thead>
		<tr>
			<th>Nombre</th>
			<th>Precio</th>
			<th>Proveedor</th>
			<th>Existencia</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each items as item}
			<tr>
				<td>{item.name}</td>
				<td>{item.price}</td>
				<td>{providers[item.provider]?.name}</td>
				<td>{item.amount}</td>
				<td>
					<div class="flex justify-evenly">
						<a href={`/app/items/form?id=${item.id}`} class="contrast">
							<ion-icon name="pencil"></ion-icon>
						</a>

						<a
							href="#"
							class="contrast"
							onclick={() => {
								item.delete = true;
							}}
						>
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
