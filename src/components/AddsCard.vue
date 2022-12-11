<template>
  <div v-for="a in adds">
    <div class="card">
      <img :src="a.banner" alt="" class="add-size img-fluid">
      {{ a.title }}

    </div>

  </div>
</template>


<script>

import { addsService } from '../services/AddsService'
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  setup() {
    onMounted(() => {
      getAdds()
    })
    async function getAdds() {
      try {
        await addsService.getAdds()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }

    }




    return {
      adds: computed(() => AppState.adds)
    }
  }
};
</script>


<style lang="scss" scoped>
.add-size {
  height: 180px;
  width: 120px;
}
</style>