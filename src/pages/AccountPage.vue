<template>
  <section class="row">

    <div class="col-10">

      <form @submit.prevent="editAccount()">

        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">User Name</span>
          <input v-model="editable.name" type="text" class="form-control" placeholder="Username" aria-label="Username"
            aria-describedby="basic-addon1">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="">Class attended</span>
          <input v-model="editable.class" type="text" class="form-control" placeholder="Class attended" aria-label=""
            aria-describedby="">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="imgUrl">Background image</span>
          <input v-model="editable.coverImg" type="url" class="form-control" id="imgUrl"
            aria-describedby="basic-addon3">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Profile Image</span>
          <input v-model="editable.picture" type="url" class="form-control" aria-label="">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Github</span>
          <input v-model="editable.github" type="url" class="form-control" aria-label="">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Linkedin</span>
          <input v-model="editable.linkedin" type="url" class="form-control" aria-label="">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">resume</span>
          <input v-model="editable.resume" type="url" class="form-control" aria-label="">
        </div>

        <div class="input-group">
          <span class="input-group-text">Bio</span>
          <textarea v-model="editable.bio" class="form-control" aria-label="With textarea"></textarea>
        </div>
        <div class="text-center">
          <button class="btn btn-info  m-2 ">Submit</button>
        </div>
      </form>
    </div>
    <div class="col-2">
      <AddsCard />
    </div>
  </section>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { AppState } from '../AppState'
import AddsCard from "../components/AddsCard.vue"
import { accountService } from "../services/AccountService"
import { profileService } from "../services/ProfileService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  // props: { accountData: { type: Object, default: {} } },
  setup() {
    // onMounted(() => editable.value = props.accountData)
    const editable = ref({});
    return {
      editable,
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          await accountService.editAccount(editable.value);
          Pop.toast("Edited Account", "success");
        }
        catch (error) {
          logger.log(error);
          Pop.error(error);
        }
      }
    };
  },
  components: { AddsCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
