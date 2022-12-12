<template>
  <div class="col-12">
    <section class="row backImg" :style="`background-image: url(${profile.coverImg})`">

      <div class=" col-10 d-flex p-5">
        <div class="">

          <img :src="profile.picture" alt="" class="rounded-circle img-smaller">
          <div v-if="profile.graduated == true" class="mdi mdi-medal">
          </div>
          <div class=" text-end">
            <h2>
              <a v-if="profile.email" :href="profile.email" class="mdi mdi-email"></a>
              <a v-if="profile.github" :href="profile.github" class="mdi mdi-github"></a>
              <a v-if="profile.linkedin" :href="profile.linkedin" class="mdi mdi-linkedin"></a>

              <a v-if="profile.resume" :href="profile.resume" class="mdi mdi-information"></a>

            </h2>
          </div>
          <div>
            <h1>{{ profile.name }}</h1>
            <h5>{{ profile.class }}</h5>
            {{ profile.bio }}

          </div>
        </div>
      </div>
      <div class="col-2">
        <AddsCard />
      </div>
    </section>
    <div class="container-fluid">

      <section class="row">
        <div>

          <div v-for="p in posts" class=" d-flex justify-content-center">
            <PostCard :post="p" />
          </div>
        </div>
      </section>
    </div>
  </div>
  <section class="row">

    <div class="col-6 btn btn-info" v-if="(page > 1)" @click="changeProfilePage(page - 1)">previous</div>
    <div class="col-6 btn btn-info" @click="changeProfilePage(page + 1)">next</div>

  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import PostCard from '../components/PostCard.vue'
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { profileService } from '../services/ProfileService.js'
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService";
import AddsCard from "../components/AddsCard.vue";
export default {
  setup() {
    const route = useRoute();

    async function getProfileById() {
      try {
        await profileService.getProfileById(route.params.profileId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    async function getPostById() {
      try {
        await postsService.getPostById(route.params.profileId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }



    onMounted(() => {
      getProfileById()
      getPostById()
    })

    return {
      posts: computed(() => AppState.posts),
      profile: computed(() => AppState.activeProfile),
      page: computed(() => AppState.profilePage),
      async changeProfilePage(page) {
        try {
          await postsService.changeProfilePage(route.params.profileId, page)

        } catch (error) {
          logger.log(error)
          Pop.error('no more pages')
        }
      }
    }
  },
  components: { PostCard, AddsCard }
};
</script>


<style lang="scss" scoped>
.backImg {
  min-height: 65vh;
}

.img-smaller {
  height: 130px;
  width: 130px;
}
</style>