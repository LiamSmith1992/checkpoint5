<template>
  <div class="container-fluid">
    <section class="row">


      <div class="col-10">
        <PostForm />
        <section v-for="p in posts" class="row">
          <PostCard :post="p" />

        </section>
      </div>
      <div class="col-2">
        <!-- <section v-for="a in adds" class="row"> -->

        <AddsCard />
        <!-- </section> -->
      </div>
    </section>
    <section class="row">

      <div class="col-6 btn btn-info" v-if="(page > 1)" @click="changePage(page - 1)">previous</div>
      <div class="col-6 btn btn-info" @click="changePage(page + 1)">next</div>

    </section>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { AppState } from '../AppState.js';
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from '../services/PostsService.js'
import PostCard from "../components/PostCard.vue";
import PostForm from "../components/PostForm.vue";
import AddsCard from "../components/AddsCard.vue";

export default {
  setup() {

    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        logger.error(error);
        Pop.error(error.message)
      }
    }


    onMounted(() => {
      getPosts()
    })


    return {
      posts: computed(() => AppState.posts),
      page: computed(() => AppState.page),
      async changePage(page) {
        try {
          await postsService.changePage(page)

        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      }
    }
  },
  // FIXME will need  to but this back in when v-for to card
  components: { PostCard, PostForm, AddsCard }
}
</script>

<style scoped lang="scss">

</style>
