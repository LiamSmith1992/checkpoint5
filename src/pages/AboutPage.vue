<template>
  <ProfilePage />
</template>

<script>
import { AppState } from "../AppState";
import ProfilePage from "./ProfilePage.vue";

export default {
  setup() {
    return {
      computed: (() => AppState.account)
    };
  },
  components: { ProfilePage }
}
</script>
