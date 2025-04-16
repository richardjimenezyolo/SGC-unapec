<script>
	import { db } from '$lib/firebase';
	import { query, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

	/**
	 * @type {any[]}
	 */
	let invoices = $state([]);

	const loadData = () => {
		invoices = [];
		getDocs(query(collection(db, 'invoices'))).then((data) => {
			data.forEach((d) => {
				invoices.push({
					...d.data(),
					id: d.id
				});
			});
		});
	};

    loadData();

	let clients = $state({});

	getDocs(collection(db, 'clients')).then((list) => {
		list.forEach((p) => {
			clients[p.id] = {
				...p.data(),
				id: p.id
			};
		});
	});

	const removeDoc = ({ id }) => {
		deleteDoc(doc(db, 'invoices', id))
        .then(() => {
            loadData()
        });
	};
</script>

<div class="flex w-full justify-between">
	<h1>Facturacion:</h1>
	<a href="/app/invoices/form" role="button">Facturar productos</a>
</div>

<table class="striped">
	<thead>
		<tr>
			<th>No. Factura</th>
            <th>Fecha</th>
			<th>Cliente</th>
			<th>Sub Total</th>
			<th>Total</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each invoices as item}
			<tr>
				<td>{item.id}</td>
				<td>
                    {item.created_at?.toDate().toLocaleDateString('es-DO', {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                </td>
				<td>{clients[item.client]?.name}</td>
				<td>{item.sub_total}</td>
				<td>{item.total}</td>
				<td>
					<div class="flex justify-evenly">
						<a href={`/app/invoices/form?id=${item.id}`} class="contrast">
							<ion-icon name="eye"></ion-icon>
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
								<p>Estas Seguro de que deseas borrar esta factura?</p>
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
