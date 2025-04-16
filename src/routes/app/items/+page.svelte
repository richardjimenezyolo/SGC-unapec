<script>
	import {db} from '$lib/firebase'
    import {query, collection, getDocs} from 'firebase/firestore'

    /**
	 * @type {any[]}
	 */
    let items = $state([])

    getDocs(query(collection(db, 'items')))
    .then(data => {
        data.forEach(d => {
            items.push({
                ...d.data(),
                id: d.id,
            })
        })
    })

    let providers = $state({});

	getDocs(collection(db, 'providers')).then((list) => {
		list.forEach((p) => {
			providers[p.id] = {
                ...p.data(),
                id: p.id
            }
		});
	});
</script>

<div class="flex w-full justify-between">
    <h1>Insumos:</h1>
    <a href="/app/items/form" role="button">Crear nuevo insumo</a>
</div>

<table class="striped">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Proveedor</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {#each items as item}
            <tr>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{providers[item.provider]?.name}</td>
                <td>
                    <div class="flex justify-evenly">
                        <a href={`/app/items/form?id=${item.id}`} class="contrast">
                            <ion-icon name="pencil"></ion-icon>
                        </a>
                        
                        <a href="/" class="contrast">
                            <ion-icon name="trash"></ion-icon>
                        </a>
                    </div>
                </td>
            </tr>
	    {/each}
    </tbody>
</table>