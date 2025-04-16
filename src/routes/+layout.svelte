<script>
	import '../app.css';
	import '$lib/firebase';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { userState } from './state.svelte';
	import { goto } from '$app/navigation';

	let { children } = $props();

	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user === null) {
			goto('/login');
			return;
		}

		// @ts-ignore
		userState.user = user;
	});

	document.querySelector('html')?.setAttribute('data-theme', localStorage.getItem('theme'));
</script>

<svelte:head>
	<title>SGC</title>
</svelte:head>

{@render children()}
