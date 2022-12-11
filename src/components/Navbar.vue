<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" class="rounded-circle" src="https://1000logos.net/wp-content/uploads/2020/03/Badboy-logo.jpg"
          height="45" />
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link>

        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <form action="" @submit.prevent="searchForPost">
        <input type="text" class="" v-model="search">
        <button class="me-2 btn btn-info">Search</button>
      </form>
      <Login />
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import { Account } from "../models/Account";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import Login from './Login.vue'
export default {
  setup() {
    const route = useRoute()
    const search = ref("")


    return {
      computed: (() => AppState.account),
      search,
      async searchForPost() {
        try {
          await postsService.searchForPost(`${search.value}`)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }

      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
