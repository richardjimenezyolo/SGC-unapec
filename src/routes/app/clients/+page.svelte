<script>
	import { db } from '$lib/firebase';
	import { query, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

	let clients = $state([]);

	const loadData = () => {
		clients = [];
		getDocs(query(collection(db, 'clients'))).then((data) => {
			data.forEach((d) => {
				clients.push({
					...d.data(),
					id: d.id
				});
			});
		});
	};

    loadData()

    const removeDoc = ({ id }) => {
		deleteDoc(doc(db, 'clients', id))
        .then(() => {
            loadData()
        });
	};
</script>

<div class="flex w-full justify-between">
	<h1>Clientes:</h1>
	<a href="/app/clients/form" role="button">Crear nuevo cliente</a>
</div>

<table class="striped">
	<thead>
		<tr>
			<th>Nombre</th>
			<th>Matricula</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each clients as client}
			<tr>
				<td>{client.name}</td>
				<td>{client.matricula}</td>
				<td>
					<div class="flex justify-evenly">
						<a href={`/app/clients/form?id=${client.id}`} class="contrast">
							<ion-icon name="pencil"></ion-icon>
						</a>

						<a href="#" class="contrast" onclick={() => client.delete = true}>
							<ion-icon name="trash"></ion-icon>
						</a>

                        <dialog open={client.delete}>
							<article>
								<h2>Corfirmación</h2>
								<p>Estas Seguro de que deseas borrar este registro?</p>
								<footer>
									<button
										class="secondary"
										onclick={() => {
											client.delete = false;
										}}
									>
										Cancel
									</button>
									<button onclick={() => removeDoc(client)}>Confirmar</button>
								</footer>
							</article>
						</dialog>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
