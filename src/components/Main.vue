<script>
import formatDate from "../includes/formatDate"
import LeftPart from "./LeftPart.vue"
import Article from "./Article.vue"
import { useUserStore } from '../stores/user.js'
import ArticleForm from './ArticleForm.vue'
const API_URL = `http://localhost:3001/articles`

export default {
    
    data: () => ({
        branches: ["main", "v2-compat"],
        currentBranch: "main",
        articles: null
    }),
    created() {
        // fetch on init
        this.fetchData();
        this.formatDate = formatDate.formatDate;
    },
    methods: {
        async fetchData() {
            this.articles = await (await fetch(API_URL)).json();
        },
    },
    components: { LeftPart, ArticleForm, Article },
    setup() {
        const store = useUserStore();
        return {store}
    }
}
</script>

<template>
  <div class="main">
    <div class="group">
      <div v-if="this.store.email != ''">
        <ArticleForm :fetchArticles="fetchData"/>
      </div>
      <div >
        <div class="article" v-for="article in articles">
          <Article :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .main{
  flex: 1;
  justify-content: center;
  display: flex;
  margin : 1em;
}
</style>
<style scoped>
@import '../assets/base.css';

.group{
  display: flex;
  flex-direction: column;
  flex:1;
}
.article{
  border: solid aliceblue 1px;
  border-radius: 2px;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
}
</style>
