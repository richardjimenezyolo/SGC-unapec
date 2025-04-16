<script>
    import {goto} from '$app/navigation'
    import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

    let email = $state('');
    let password = $state('');

    let error = $state(null)

    const login = () => {
        console.log('Login', {
            email,
            password
        });

        signInWithEmailAndPassword(getAuth(), email, password)
        .then(user => {

            goto('/app')
            
        }).catch(err => {
            error = err.message
        })
        
    }

</script>


<div class="flex justify-center">
    <form class="w-2/4" on:submit={login}>
        <article>
            <header>
                Login
            </header>

            <label>
                Email:
                <input type="text" placeholder="Email" bind:value={email} >
            </label>
            
            <label>
                Password:
                <input type="password" placeholder="Password" bind:value={password} aria-invalid="{error ? 'true' : ''}">
                <small>
                    {error}
                </small>
            </label>

            
    
            <input type="submit" value="Log in">
        </article>
    </form>
</div>
