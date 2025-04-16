<script>
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { doc, getDoc, updateDoc, addDoc, collection, getDocs } from 'firebase/firestore';

	let error = $state(null);

	let employeeData = $state({
		id: URL.parse(location.href)?.searchParams.get('id'),
		name: '',
		salary: ''
	});

	if (employeeData.id) {
		getDoc(doc(db, 'employees', employeeData.id)).then((data) => {
			data = data.data();
			delete data.id;
			employeeData = {
				...employeeData,
				...data
			};
		});
	}

	const save = () => {
		if (employeeData.id) {
			updateDoc(doc(db, 'employees', employeeData.id), employeeData).then(() => {
				goto('/app/employees');
			});
			return;
		}

		addDoc(collection(db, 'employees'), employeeData).then((e) => {
			goto('/app/employees');
		});
	};
</script>

<div class="flex justify-center">
	<form class="w-3/4" onsubmit={save}>
		<article>
			<header>
				<h3>Nuevo Empleado</h3>
			</header>

			<p class="mb-4" style="color: var(--pico-del-color);">
				{error}
			</p>

			<label>
				Nombre Insumo:
				<input type="text" placeholder="Juan Soto" bind:value={employeeData.name} />
			</label>

			<label>
				Cedula:
				<input type="number" placeholder="xxx-xxxxxxx-x" bind:value={employeeData.cedula} />
			</label>

			<label>
				Tanda laboral:
				<select bind:value={employeeData.tanda}>
					<option value="" disabled>Seleccione algo</option>
					<option value="8am-5pm">8am-5pm</option>
					<option value="5pm-10pm">8am-5pm</option>
				</select>
			</label>

			<label>
				Fecha de ingreso:
				<input type="date" bind:value={employeeData.worked_since} />
			</label>

			<label>
				Salario:
				<input type="number" placeholder="10,000.00 $DOP" bind:value={employeeData.salary} />
			</label>

			<footer class="flex justify-end">
				
				<button>Guardar</button>
			</footer>
		</article>
	</form>
</div>
