<script>
import {useUserStore} from '../stores/user'
import { mapState } from 'pinia'
export default {
    data: () => ({
        logTab: [["fa-solid fa-house-chimney","Fils d'actualités","#/"], ["fa-solid fa-right-to-bracket","Se Déconnecter","logout"]],
        mainTab: [["fa-solid fa-house-chimney","Fils d'actualités","#/"], ["fa-solid fa-user","Créer un profil","#/signIn"], ["fa-solid fa-right-to-bracket","Se connecter","#/login"]],
        currentBranch: "main",
        articles: null
    }),
    setup() {
        const store = useUserStore();
        return {store}
    },
    methods:{
        logout(){
            this.store.logout()
        }
    }
}
</script>


<template>
        <div class="main" v-if='this.store.email != ""'>
            <div class="button">
                <i class="fa-solid fa-house-chimney"></i>
                <a href="#/" style="margin-left:0.5em">Fils d'actualités</a>
            </div>
            <div class="button" style="border-bottom: 0px;">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <a @click="logout" style="margin-left:0.5em">Déconnexion</a>
            </div>
        </div>
        <div class="main" v-else>
            <div class="button" :style="i === 2 && 'border-bottom: 0px;'" v-for="(notLogged, i) in mainTab">
                <i v-bind:class="notLogged[0]"></i>
                <a v-bind:href="notLogged[2]" style="margin-left:0.5em">{{notLogged[1]}}</a>
            </div>
        </div>
</template>

<style scoped>
    .main {
        border: solid 1px white;
        display: flex;
        flex-direction: column;
        height: 25%;
        align-items: center;
        justify-content: center;
        flex:1;
    }
    .button{
        display: flex;
        flex:1;
        align-items: center;
        border-bottom: 1px solid white;
        width: 100%;   
        justify-content: center;  

    }
    a{
        text-decoration: none;
        cursor: pointer;
        color: white;
    }
</style>