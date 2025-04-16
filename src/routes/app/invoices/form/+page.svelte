<script>
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { doc, getDoc, updateDoc, addDoc, collection, getDocs } from 'firebase/firestore';

	let error = $state(null);

	let invoiceData = $state({
		id: URL.parse(location.href)?.searchParams.get('id'),
		client: '',
		items: [],
		sub_total: 0,
		total: 0,
		created_at: new Date
	});

	$effect(() => {
		invoiceData.sub_total = invoiceData.items.reduce((prev, curr) => prev + ((+curr.price * +curr.amount) || 0), 0);
		invoiceData.total = invoiceData.items.reduce(
			(prev, curr) => prev + ((+curr.price * +curr.amount) * (+curr.tax / 100 + 1) || 0),
			0
		);
	});

	/**
	 * @type {any[]}
	 */
	let clients = $state([]);

	getDocs(collection(db, 'clients')).then((list) => {
		list.forEach((p) => {
			clients.push({
				...p.data(),
				id: p.id
			});
		});
	});

	/**
	 * @type {any[]}
	 */
	let products = $state([]);

	getDocs(collection(db, 'products')).then((list) => {
		list.forEach((p) => {
			products.push({
				...p.data(),
				id: p.id
			});
		});
	});

	if (invoiceData.id) {
		getDoc(doc(db, 'invoices', invoiceData.id)).then((data) => {
			data = data.data();
			delete data.id;
			invoiceData = {
				...invoiceData,
				...data
			};
		});
	}

	const updateInvoiceItem = (
		/** @type {Event & { currentTarget: EventTarget & HTMLSelectElement; }} */ ev,
		/** @type {never} */ item
	) => {
		// @ts-ignore
		const option = ev.target.options[ev.target.selectedIndex];
		item.price = option.getAttribute('data-price');
		item.tax = 18;
	};

	const removeItem = (/** @type {number} */ idx) => {
		setTimeout(() => {
			invoiceData.items.splice(idx, 1);
		});
	};

	const save = () => {
		if (invoiceData.id) {
			updateDoc(doc(db, 'invoices', invoiceData.id), invoiceData).then(() => {
				goto('/app/invoices');
			});
			return;
		}

		addDoc(collection(db, 'invoices'), invoiceData).then((e) => {
			goto('/app/invoices');
		});
	};
</script>

<div class="flex justify-center">
	<form class="w-3/4">
		<article>
			<header>
				<h3>Nueva Factura</h3>
			</header>

			<label>
				Cliente:
				<select bind:value={invoiceData.client} disabled={!!invoiceData.id}>
					<option value="" disabled>Seleccione un cliente</option>
					{#each clients as client}
						<option value={client.id}>{client.name}</option>
					{/each}
				</select>
			</label>

			<div class="flex justify-between my-4">
				<h4>Productos:</h4>
				{#if !invoiceData.id}
					<button
						class="outline contrast"
						onclick={() =>
							invoiceData.items.push({
								product_id: '',
								amount: 1
							})}
					>
						<ion-icon name="add-outline"></ion-icon>
						Add item
					</button>
				{/if}
			</div>

			<table class="striped">
				<thead>
					<tr>
						<th>#</th>
						<th>Producto</th>
						<th>Precio</th>
						<th>Cantidad</th>
						<th>Impuesto (%)</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each invoiceData.items as item, i}
						<tr>
							<td>{i + 1}</td>
							<td>
								<select
									class="!m-0"
									bind:value={item.product_id}
									onchange={(ev) => updateInvoiceItem(ev, item)}
									disabled={!!invoiceData.id}
								>
									<option selected disabled>Selecciona algun producto</option>

									{#each products as p}
										<option value={p.id} data-price={p.price}>{p.name}</option>
									{/each}
								</select>
							</td>
							<td>
								{item.price}
							</td>
							<td>
								<input
									class="!w-[8rem] !m-0"
									type="number"
									bind:value={item.amount}
									disabled={!!invoiceData.id}
								/>
							</td>
							<td>
								<input
									class="!w-[8rem] !m-0"
									type="number"
									bind:value={item.tax}
									disabled={!!invoiceData.id}
								/>
							</td>
							<td>
								{#if !invoiceData.id}
									<a href="#" class="pico-color-red-500" onclick={() => removeItem(i)}>
										<ion-icon class="text-2xl" name="close-circle-outline"></ion-icon>
									</a>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr>
						<td colspan="4"></td>
						<td>Sub Total: {invoiceData.sub_total}</td>
						<td>Total: {invoiceData.total}</td>
					</tr>
				</tfoot>
			</table>

			{#if !invoiceData.id}
				<footer class="flex justify-end">
					<button onclick={save}>Guardar</button>
				</footer>
			{/if}
		</article>
	</form>
</div>
