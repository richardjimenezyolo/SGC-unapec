<script>
	import {db} from '$lib/firebase'
    import {query, collection, getDocs} from 'firebase/firestore'

    let clients = $state([])

    getDocs(query(collection(db, 'clients')))
    .then(data => {
        data.forEach(d => {
            clients.push({
                ...d.data(),
                id: d.id,
            })
        })
    })
</script>

<div class="flex w-full justify-between">
    <h1>Clientes:</h1>
    <a href="/app/clients/form" role="button">Crear nuevo cliente</a>
</div>

<table class="striped">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Matricula</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {#each clients as client}
            <tr>
                <td>{client.name}</td>
                <td>{client.matricula}</td>
                <td>
                    <div class="flex justify-evenly">
                        <a href={`/app/clients/form?id=${client.id}`} class="contrast">
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