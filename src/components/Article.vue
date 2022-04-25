<script>
import formatDate from "../includes/formatDate"
import Comment from "./Comment.vue"
import { useUserStore } from '../stores/user.js'
import CommentForm from "./CommentForm.vue"

const API_URL = `http://localhost:3001/commentaires`

export default {
    props: {
        article: Object
    },
    data: () => ({
        comments : []
    }),
    methods: {
        async fetchData() {
            const tmp = await (await fetch(API_URL)).json();
            this.comments = tmp.filter(comment => comment.articleId === this.article.id)
        },
        async liked(){
            if(this.store.email != ""){
                const data = this.article
                data.like += 1
                await fetch('http://localhost:3001/articles/'+this.article.id,{method:'put',body:JSON.stringify(data), headers :  {'Content-Type': 'application/json'}});
                
                this.fetchData();
            }else{
                alert('Vous devez être connecté')
            }
        }
    },
    created() {
        this.formatDate = formatDate.formatDate;
        this.fetchData();
    },
    components: { Comment, CommentForm },
    setup() {
        const store = useUserStore();
        return {store}
    }
}
</script>
<template>
    <div class="header">
        <div style="display: flex; ">
            <h3>{{article.pseudo}}</h3>
            <img alt="Qries" v-bind:src="article.urlImgArticle"
        width="30" height="30" style="border-radius: 3em;margin-left: 1em;">
        </div>
        <p>Posté le {{formatDate(article.date)}}</p>
        </div> 
        <div class="article-body">
        <div class="image" v-bind:style="{ 'background-image': 'url(' + article.urlImgArticle + ')' }">
        </div>
        <p>{{article.contenu}}</p>
        </div>
        <div class="article-footer">
        <div class="social">
            <div class="comment">
            <i class='far fa-comment-alt'></i>
            <p style="background-color: rgba(98, 193, 9, 0.5);" class="badge">{{comments.length}}</p>
            </div>
            
            <div @click="liked" class="like">
                <i  class="far fa-thumbs-up" id="like"></i>
                <p style="background-color:cornflowerblue" class="badge">{{article.like}}</p>
            </div>
        </div>
        <div class="social_2">
            <h3>Commentaires :</h3>
            <div v-if="comments.length != 0">
                <div class="message" v-for="comment in comments">
                    <Comment :comment="comment"/>
                </div>
            </div>
            <div v-else>
                <p>Pas encore de commentaire</p>
            </div>
            
            <div v-if="store.email !== ''">
                <CommentForm :fetchComments="fetchData" :id="article.id" :comments="article.commentaires"/>
            </div>
        </div>
        </div>
</template>

<style scoped>
h1,h2,h3{
  color: white;
}

#like{
    cursor: pointer;
}
.message{
  border-top: solid 1px aliceblue;
  margin-top: 0.5em;
}
.social_2{
  margin: 0.5em;
  display: flex;
  flex-direction: column;
}
.social{
  background-color: var(--vt-c-divider-dark-1);
  height: 1.5em;
  display: flex;
}
.like {
 margin-left: 1em;
  display: flex;
  align-items: center;
}
.badge{
  font-size: 12px;
  min-width: 1.5em;
  text-align: center;
  border-radius: 0.2em;
  margin-left: 0.5em;
  font-weight: bold;
}
.comment{
  margin-left: 1em;
  display: flex;
  align-items: center;
}
.image{
  width: 100%;
  height: 250px;
}
.article-body p{
  margin: 0.7em;
}
.article-body{
  display: flex;
  width: 100%;
  flex-direction: column;
}

.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.7em;
}

</style>