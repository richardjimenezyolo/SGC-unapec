<script>
	import { db } from '$lib/firebase';
	import { query, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

	/**
	 * @type {Object[]}
	 */
	let providers = $state([]);

	const loadData = () => {
		providers = [];

		getDocs(query(collection(db, 'providers'))).then((data) => {
			data.forEach((d) => {
				providers.push({
					...d.data(),
					id: d.id
				});
			});
		});
	};

    loadData()

	const removeDoc = ({ id }) => {
		deleteDoc(doc(db, 'providers', id)).then(() => {
			loadData();
		});
	};
</script>

<div class="flex w-full justify-between">
	<h1>Proveedores:</h1>
	<a href="/app/providers/form" role="button">Crear nuevo proveedor</a>
</div>

<table class="striped">
	<thead>
		<tr>
			<th>Nombre</th>
			<th>RNC</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each providers as provider}
			<tr>
				<td>{provider.name}</td>
				<td>{provider.rnc}</td>
				<td>
					<div class="flex justify-evenly">
						<a href={`/app/providers/form?id=${provider.id}`} class="contrast">
							<ion-icon name="pencil"></ion-icon>
						</a>

						<a href="#" class="contrast" onclick={() => provider.delete = true}>
							<ion-icon name="trash"></ion-icon>
						</a>

                        <dialog open={provider.delete}>
							<article>
								<h2>Corfirmación</h2>
								<p>Estas Seguro de que deseas borrar este registro?</p>
								<footer>
									<button
										class="secondary"
										onclick={() => {
											provider.delete = false;
										}}
									>
										Cancel
									</button>
									<button onclick={() => removeDoc(provider)}>Confirmar</button>
								</footer>
							</article>
						</dialog>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
