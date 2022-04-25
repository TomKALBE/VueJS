<script>
import {useUserStore} from '../stores/user'

export default {
    data() {
        return {
            body:'',
            image:'https://source.unsplash.com/random/1000x300'
        }
    },
    props: {
        fetchArticles: Function
    },
    setup() {
        const store = useUserStore();
        return {store}
    },
    methods: {
        async createPost(){
            if(this.body === "" || this.image === ""){
                alert("Merci de remplir les deux champs")
            }else{
                // let formData = new FormData();
                const data = {
                    contenu : this.body ,
                    urlImgArticle : this.image,
                    like : 0,
                    date : new Date().getTime(),
                    pseudo : this.store.pseudo,
                    commentaires : []
                }
                
                await fetch(`http://localhost:3001/articles`,{method : "post",body:JSON.stringify(data), headers :  {'Content-Type': 'application/json'}});

                this.body = "";
                this.image = "";
                this.fetchArticles();
            }

        }
    }
    
}
</script>
<template>
    <div class="_main">
        <div class="content">
            <h3 style="color:white">Quoi de neuf ? </h3>
            <textarea v-model="body" rows="5" placeholder="Ecrivez un nouveau post" required/>
            <input v-model="image" placeholder="url de votre image - taille conseillée 1000*200px" required>
            <button @click="createPost">Publier votre nouveau post</button>
        </div>
    </div>
</template>
<style scoped>
._main{
    min-height: 24vh;
    border: solid 1px white;
    margin-bottom: 1em;
    flex:1;
}
.content{
    margin:1em;
    flex-direction: column;
    justify-content: space-around;
    display: flex;
    justify-items: flex-start;
    flex:1;
}
.content > *{
    margin-top: 5px;
}
</style>