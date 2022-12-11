
<template>

  <section class="row">
    <div class="col-12 card">
      <div class="d-flex p-2">
        <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
          <img :src="post.creator.picture" :alt="post.creator.name" class="img-fluid img-smaller rounded-circle ">
        </router-link>
        <div>

          <h5 class="p-2">{{ post.creator.name }}</h5>
          {{ new Date(post.creator.createdAt).toLocaleString() }}
        </div>
        <div>

          <h3 class="d-flex justify-content-end">
            <button v-if="(post.creatorId == account.id)" @click="removePost()"
              class=" btn btn-danger rounded-circle mdi mdi-delete"></button>
          </h3>
        </div>
      </div>
      <div class="p-3">
        {{ post.body }}
      </div>
      <img :src="post.imgUrl" :alt="post.imgUrl" class="img-fluid post-img ">
      <div>
        {{ post.likes.length }}
        <span>
          Likes
          <i @click="likePost(post.id)" class="selectable ">👍</i>
        </span>
      </div>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import { Post } from '../models/Post.js';
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  props: {
    post: {
      type: Post,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()




    return {
      route,
      account: computed(() => AppState.account),
      async removePost() {
        try {
          await postsService.removePost(props.post.id)
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      },
      async likePost(postId) {
        try {
          await postsService.likePost(postId)
        } catch (error) {
          logger.log(error)
          Pop.error('must be logged in', error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.img-smaller {
  height: 60px;
  width: 60px;
}

.post-img {
  height: 300px;

}
</style>