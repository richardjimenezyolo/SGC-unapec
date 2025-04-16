<script>
	import { db } from '$lib/firebase';
	import { query, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

	/**
	 * @type {any[]}
	 */
	let employees = $state([]);

	const loadData = () => {
		employees = [];
		getDocs(query(collection(db, 'employees'))).then((data) => {
			data.forEach((d) => {
				employees.push({
					...d.data(),
					id: d.id
				});
			});
		});
	};

	loadData();

	const removeDoc = ({ id }) => {
		deleteDoc(doc(db, 'employees', id)).then(() => {
			loadData();
		});
	};
</script>

<div class="flex w-full justify-between">
	<h1>Empleados:</h1>
	<a href="/app/employees/form" role="button">Crear nuevo producto</a>
</div>

<table class="striped">
	<thead>
		<tr>
			<th>Nombre</th>
			<th>Cedula</th>
			<th>Tanda laboral</th>
			<th>Fecha de ingreso</th>
			<th>Salrio</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each employees as item}
			<tr>
				<td>{item.name}</td>
				<td>{item.cedula}</td>
				<td>{item.tanda}</td>
				<td>{item.worked_since}</td>
				<td>{item.salary}</td>
				<td>
					<div class="flex justify-evenly">
						<a href={`/app/employees/form?id=${item.id}`} class="contrast">
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
