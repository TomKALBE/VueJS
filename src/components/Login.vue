<script>
import { useUserStore } from '../stores/user.js'
export default {
    data() {
        return {
            email:'',
            password:'',
        }
    },
    methods: {
        async login (){
            await this.store.login(this.email,this.password)
            this.email = '';
            this.password = '';
        }
    },
    setup() {
        const store = useUserStore();

        return {store}
    }

}
</script>

<template>
<div class="main" style="flex-direction:column">
    <h2>Se connecter</h2>
    <input v-model="email" placeholder="votre@email.fr">
    <input v-model="password" type="password" placeholder="password">
    <button @click="login">Connexion</button>
</div>
</template>
<style scoped>
    input,h2,button{
        margin-left: 1em;
    }
    .main{
        border: solid 1px white;
        height: 15em;
        align-items: flex-start;
        justify-content: space-around;
    }
</style>