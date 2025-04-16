<script>
	import { getAuth } from 'firebase/auth';
	import { userState } from '../state.svelte';
	import { onNavigate } from '$app/navigation';
	let { children } = $props();

	const logOut = () => {
		getAuth().signOut();
	};

	let key = $state(0);

	onNavigate(() => {
		console.log('Should update menu');

		key++;
	});

	const getMenuItemClass = (/** @type {string} */ resource) => {
		let className = 'w-full !no-underline ';

		if (!window.location.href.includes(resource)) {
			className += 'contrast';
		}

		return className;
	};

	const changeTheme = () => {
		console.log('Cambiar tema');
		
		/** @type String*/
		const theme = document.querySelector('html')?.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
		document.querySelector('html')?.setAttribute('data-theme',theme)
		localStorage.setItem('theme', document.querySelector('html')?.getAttribute('data-theme'))
	}
</script>

<nav>
	<ul>
		<li>
			<a href="/app" class="contrast">
				<strong>Sistema de gestión de cafeterias</strong>
			</a>
		</li>
	</ul>
	<ul>
		<li>
			<details class="dropdown">
				<summary>{userState.user.email}</summary>
				<ul>
					<li>
						<a href="#" onclick={changeTheme}>🌗 Cambiar tema</a>
					</li>
					<li><a href="#" onclick={logOut}>🚪Log out</a></li>
				</ul>
			</details>
		</li>
	</ul>
</nav>
<hr />
<br />

<div class="flex gap-12">
	<aside class="w-1/10">
		{#key key}
			<ul>
				<li>
					<a class={getMenuItemClass('invoices')} href="/app/invoices">
						<ion-icon name="newspaper-outline"></ion-icon>
						Facturación
					</a>
				</li>
				<li>
					<a class={getMenuItemClass('products')} href="/app/products">
						<ion-icon name="fast-food-outline"></ion-icon>
						Productos
					</a>
				</li>
				<li>
					<a class={getMenuItemClass('items')} href="/app/items">
						<ion-icon name="pricetags-outline"></ion-icon>
						Articulos
					</a>
				</li>
				<li>
					<a class={getMenuItemClass('brands')} href="/app/brands">
						<ion-icon name="git-branch-outline"></ion-icon>
						Marcas
					</a>
				</li>
				<li>
					<a class={getMenuItemClass('providers')} href="/app/providers">
						<ion-icon name="business-outline"></ion-icon>
						Proveedores
					</a>
				</li>
				<li>
					<a class={getMenuItemClass('clients')} href="/app/clients">
						<ion-icon name="accessibility-outline"></ion-icon>
						Clientes
					</a>
				</li>
				<li>
					<a class={getMenuItemClass('users')} href="/app/users">
						<ion-icon name="people-outline"></ion-icon>
						Usuarios
					</a>
				</li>
				<li>
					<a class={getMenuItemClass('employees')} href="/app/employees">
						<ion-icon name="people-circle-outline"></ion-icon>
						Employees
					</a>
				</li>
			</ul>
		{/key}
	</aside>
	<div class="w-9/10">
		{@render children()}
	</div>
</div>
