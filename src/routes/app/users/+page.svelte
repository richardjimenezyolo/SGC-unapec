<script>
	import {db} from '$lib/firebase'
    import {query, collection, getDocs} from 'firebase/firestore'

    let users = $state([])

    getDocs(query(collection(db, 'users')))
    .then(data => {
        data.forEach(d => {
            users.push(d.data())
        })
    })
</script>

<div class="flex w-full justify-between">
    <h1>Usuarios:</h1>
    <a href="/app/users/form" role="button">Crear nuevo usuario</a>
</div>

<table class="striped">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Tipo</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {#each users as user}
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.type}</td>
                <td>
                    <div class="flex justify-evenly">
                        <a href={`/app/users/form?id=${user.id}`} class="contrast">
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