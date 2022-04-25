<script>
import {useUserStore} from '../stores/user'

export default {
    data: () => ({
        content: "",
    }),
    props: {
        id: Number,
        comments: Array,
        fetchComments: Function
    },
    setup() {
        const store = useUserStore();
        return {store}
    },
    methods:{
        async publish(){
            if(this.content === ""){
                alert("Merci d'écrire un commentaire")
            }else{
                const data = {
                    contenu : this.content ,
                    dt : new Date().getTime(),
                    pseudo : this.store.pseudo,
                    articleId : this.id
                }
                await(await fetch(`http://localhost:3001/commentaires/`,{method : "post",body:JSON.stringify(data), headers :  {'Content-Type': 'application/json'}})).json();
                this.content = "";
                this.fetchComments();

            }

        }
    }
}
</script>
<template>
    <div class="content">
        <h2>Ajouter un commentaire</h2> 
        <textarea v-model="content" placeholder="Laisser un commentaire" rows="4"/>
        <button @click="publish">Publier</button>
    </div>
</template>
<style scoped>
h2{
    color:white;
    margin-top: 1em;
    margin-bottom: 0.5em;    
}
.content{
    display: flex;
    flex-direction: column;
    flex: 1;
    border-top: solid 1px white;
}
button{
    margin-top: 0.5em;
    width: 20%;
    height: 2em;
}
</style>