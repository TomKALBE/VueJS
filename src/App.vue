
<script>
import Main from './components/Main.vue'
import TheWelcome from './components/TheWelcome.vue'
import Login from './components/Login.vue'
import SignIn from './components/SignIn.vue'
import NotFound from './components/NotFound.vue'
import LeftPart from './components/LeftPart.vue'
import { useUserStore } from './stores/user.js'

const routes = {
  '/': Main,
  '/login': Login,
  '/signIn' : SignIn
}

export default {
  setup() {
    const user = useUserStore()
    return {user}
  },
  data: () => {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  },
  components: {LeftPart},
}
</script>

<template>

  <main class="_main">
    <div class="left-part">
      <LeftPart/>
    </div>
    <div style="flex:4">
      <component :is="currentView" />
    </div>
  </main>
</template>

<style>
@import './assets/base.css';


</style>
<style scoped>
.left-part{
  display: flex;
  flex:1;
  min-height: 6em;
}


@media screen and (min-width: 810px) {
  ._main{
    margin:1em;
    display:flex;
    height:100vh
  }
}
</style>
