<script>
	import { db } from '$lib/firebase';
	import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
	import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

	let error = $state(null);

	let userData = $state({
		id: URL.parse(location.href)?.searchParams.get('id'),
		name: '',
		email: '',
		password: '',
		type: ''
	});

	if (userData.id) {
		getDoc(doc(db, 'users', userData.id)).then((data) => {
			userData = data.data();
		});
	}

	const save = () => {
		if (userData.id) {

			updateDoc(doc(db, 'users', userData.id), userData)
			.then(() => {
				history.back()
			})
			return;
		}

		createUserWithEmailAndPassword(getAuth(), userData.email, userData.password)
			.then(async (user) => {
				userData.id = user.user.uid;
				await setDoc(doc(db, 'users', user.user.uid), userData);
				history.back();
			})
			.catch((err) => {
				console.dir(err);
				error = err.code;
			});
	};
</script>

<div class="flex justify-center">
	<form class="w-3/4">
		<article>
			<header>
				<h3>Nuevo Usuario</h3>
			</header>

			<p class="mb-4" style="color: var(--pico-del-color);">
				{error}
			</p>

			<label>
				Nombre:
				<input type="text" placeholder="Juan Jimenez" bind:value={userData.name} />
			</label>

			<label>
				Email:
				<input type="text" placeholder="example@test.com" bind:value={userData.email} />
			</label>

			<label>
				Tipo:
				<select bind:value={userData.type}>
					<option value="" selected disabled>Tipo de usuario</option>
					<option value="admin">Administrador</option>
					<option value="cajero">cajero</option>
					<option value="compras">Logistica</option>
				</select>
			</label>

			{#if !userData.id}
				<label>
					Password:
					<input type="password" placeholder="password" bind:value={userData.password} />
				</label>
			{/if}

			<footer class="flex justify-end">
				
				<button onclick={save}>Guardar</button>
			</footer>
		</article>
	</form>
</div>
