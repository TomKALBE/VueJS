<script>
const API_URL = `http://localhost:3001/articles`

export default {
  data: () => ({
    branches: ['main', 'v2-compat'],
    currentBranch: 'main',
    articles: null
  }),

  created() {
    // fetch on init
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.articles = await (await fetch(API_URL)).json()
    },
    formatDate(v) {
      const dt = new Date(v)
      const date = dt.toLocaleDateString("fr") + " à " + dt.getHours() + "H" + dt.getMinutes()
      return date
    }
  }
}
</script>

<template>
  <div class="main">
    <h1 class="green">{{ msg }}</h1>
    <div v-for="article in articles">
      <div class="article">
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
              <p style="background-color: rgba(98, 193, 9, 0.5);" class="badge">{{article.commentaires.length}}</p>
            </div>
            <div class="like">
               <i class="far fa-thumbs-up"></i>
               <p style="background-color:cornflowerblue" class="badge">{{article.like}}</p>
            </div>
          </div>
          <div class="social_2">
            <h3>Commentaires :</h3>
            <div class="message" v-for="comment in article.commentaires">
              <div style="display: flex;justify-content: space-between;align-items: center;">
                <strong style="color:ivory ;">{{comment.pseudo}}</strong>
                <p style="font-size: 12px;">le {{formatDate(comment.dt)}}</p>
              </div>
              <p style="margin-top: 0.5em;margin-bottom: 0.5em;">{{comment.contenu}}</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/base.css';

h1,h2,h3{
  color: white;
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
  width: 1.5em;
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
.article-footer{

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
.article{
  margin-top: 2em;
  border: solid aliceblue 1px;
  border-radius: 2px;
  margin-bottom: 1em;
}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.7em;
}
.main{
  flex: 1;
  justify-content: center;
}
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
