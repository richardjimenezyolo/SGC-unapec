<script>
	import { db } from '$lib/firebase';
	import { Chart } from 'chart.js/auto';
	import { collection, getDocs, query } from 'firebase/firestore';

	let salesReportChart = $state();

	let warehouseChart = $state()

	let invoices = $state([]);
	let items = $state([]);

	getDocs(query(collection(db, 'invoices'))).then((data) => {
		data.forEach((d) => {
			invoices.push({
				...d.data(),
				id: d.id
			});
		});
	});

	getDocs(query(collection(db, 'items'))).then((data) => {
		data.forEach((d) => {
			items.push({
				...d.data(),
				id: d.id
			});
		});
	});

	$effect(() => {
		if (!items.length) {
            return;
        }

		const keys = items.map(el => ({label: el.name, amount: el.amount || 0}))

		new Chart(warehouseChart, {
			type: 'bar',
			data: {
				labels: keys.map(el => el.label),
				datasets: [
					{
						label: 'Articulos',
						data: keys.map(el => el.amount),
						borderWidth: 1,
						backgroundColor: '#D93526',
					}
				]
			}
		});
	})

	$effect(() => {
        if (!invoices.length) {
            return;
        }

		let datesMap = {};

		invoices.forEach((item) => {
            /** @type {Date} d*/
			const d = item.created_at.toDate()
            
			/** @type{String} */
            const indexKey = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;

            if (!datesMap[indexKey]) {
                datesMap[indexKey] = 0
            }

            datesMap[indexKey] += item.total
		});

		new Chart(salesReportChart, {
			type: 'bar',
			data: {
				labels: Object.keys(datesMap).sort(),
				datasets: [
					{
						label: 'Ventas',
						data: Object.keys(datesMap).sort().map(key => datesMap[key]),
						borderWidth: 1,
						backgroundColor: '#00895A'
					}
				]
			}
		});
	});
</script>

<h2>Dashboard:</h2>
<br />
<div class="grid">
	<div>
		<article>
			<canvas bind:this={salesReportChart}> </canvas>
		</article>
	</div>
	<div>
		<article>
			<canvas bind:this={warehouseChart}> </canvas>
		</article>
	</div>
	<div></div>
</div>
