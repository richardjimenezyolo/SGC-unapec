<script>
	import {db} from '$lib/firebase'
    import {query, collection, getDocs} from 'firebase/firestore'

    let providers = $state([])

    getDocs(query(collection(db, 'providers')))
    .then(data => {
        data.forEach(d => {
            providers.push({
                ...d.data(),
                id: d.id,
            })
        })
    })
</script>

<div class="flex w-full justify-between">
    <h1>Proveedores:</h1>
    <a href="/app/providers/form" role="button">Crear nuevo proveedor</a>
</div>

<table class="striped">
    <thead>
        <tr>
            <th>Nombre</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {#each providers as provider}
            <tr>
                <td>{provider.name}</td>
                <td>
                    <div class="flex justify-evenly">
                        <a href={`/app/providers/form?id=${provider.id}`} class="contrast">
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