<script>
	import { db } from '$lib/firebase';
	import { Chart } from 'chart.js/auto';
	import { collection, getDocs, query } from 'firebase/firestore';

	let canvas = $state();

	let invoices = $state([]);

	getDocs(query(collection(db, 'invoices'))).then((data) => {
		data.forEach((d) => {
			invoices.push({
				...d.data(),
				id: d.id
			});
		});
	});

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

        console.log(datesMap);
        


		new Chart(canvas, {
			type: 'bar',
			data: {
				labels: Object.keys(datesMap).sort(),
				datasets: [
					{
						label: 'Ventas',
						data: Object.keys(datesMap).sort().map(key => datesMap[key]),
						borderWidth: 1
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
			<canvas bind:this={canvas}> </canvas>
		</article>
	</div>
	<div></div>
	<div></div>
</div>
