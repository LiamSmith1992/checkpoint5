<template>

  <section class="row">
    <div class="me-5">
      <form @submit.prevent="createPost()" class="card">

        <div class="mb-2 p-2">
          <label for="postBody" class="form-label">New Post</label>
          <textarea v-model="editable.body" class="form-control" id="postBody" rows="3"
            placeholder="Type here..."></textarea>
        </div>
        <div class="mb-3 p-2">
          <label for="imgUrl" class="form-label">Picture</label>
          <input v-model="editable.imgUrl" type="url" class="form-control" id="imgUrl" placeholder="imgUrl">
        </div>
        <button class="btn btn-info">Post</button>
      </form>
    </div>
  </section>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const editable = ref({})

    async function createPost() {
      try {
        await postsService.createPost(editable.value)
        Pop.toast('Post made')
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }




    return {
      editable,
      createPost

    }
  }
};
</script>


<style lang="scss" scoped>

</style>