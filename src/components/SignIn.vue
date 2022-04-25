<script>
import { useUserStore } from '../stores/user.js'
export default {
    data() {
        return {
            errors: [],
            pseudo:'',
            email:'',
            password:'',
            confirmPassword:'',
            image:'https://thispersondoesnotexist.com/image'
        }
    },
    methods: {
        async signIn (){
            const data = {
                "pseudo": this.pseudo,
                "email": this.email,
                "password": this.password,
                "urlImgProfil": this.image
            }
            await(await fetch(`http://localhost:3001/utilisateurs/`,{method : "post",body:JSON.stringify(data), headers :  {'Content-Type': 'application/json'}})).json();
            await this.store.login(this.email,this.password)

        },
        checkForm () {

            this.errors = [];

            if (!this.pseudo) {
                this.errors.push('Pseudo required.');
            }
            else if(this.pseudo.length < 3){
                this.errors.push('Pseudo must contain almost 3 charc.');
            }
            if (!this.email) {
                this.errors.push('Email required.');
            }
            else if (!this.validEmail(this.email)) {
                this.errors.push('Valid email required.');
            }
            if (!this.password) {
                this.errors.push('Password required.');
            }
            else if(this.password.length < 6){
                this.errors.push('Pseudo must contain almost 6 charc.');
            }
            if (!this.confirmPassword) {
                this.errors.push('Confirm Password required.');
            }
            if (!this.image) {
                this.errors.push('Image required.');
            }
            if(this.password != this.confirmPassword){
                this.errors.push('Passwords have to match.');
            }
            if(this.errors.length === 0){
                this.verifPseudo()
            }
            

        },
        validEmail: function (email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        async verifPseudo(){
            const result = await (await fetch(`http://localhost:3001/utilisateurs?pseudo=${this.pseudo}`)).json();
            if(result.length === 0){
                this.verifEmail();
            }else{
                this.errors.push('Pseudo already used take another one please');
            }
        },
        async verifEmail(){
            const result = await (await fetch(`http://localhost:3001/utilisateurs?email=${this.email}`)).json();
            if(result.length === 0){
                this.signIn();
            }else{
                this.errors.push('Email already used take another one please');
            }
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
    <h2>S'inscrire</h2>
    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
        <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>
    <input v-model="pseudo" type="text" placeholder="pseudo" required>
    <input v-model="email" placeholder="votre@email.fr" required>
    <input v-model="password" type="password" placeholder="password" required>
    <input v-model="confirmPassword" type="password" placeholder="Confirm password" required>
    <input v-model="image" placeholder="url de votre image" required>

    <button @click="checkForm">S'inscrire</button>
</div>
</template>
<style scoped>
    input,h2,button,p{
        margin-left: 1em;
    }
    input{
        width:40%;
    }
    .main{
        border: solid 1px white;
        min-height: 25em;
        align-items: flex-start;
        justify-content: space-around;
    }
</style>