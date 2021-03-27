<template>
  <AppLayout>
    <router-view/>
  </AppLayout>
</template>
<script lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";

import {useAuthStore, useModal} from "@/store/";

import {computed, defineComponent, onBeforeMount} from "vue";

export default defineComponent({
  components: {AppLayout},

  setup() {
    const auth = useAuthStore();
    const modal = useModal();
    onBeforeMount(async () => {
      try {
        await auth.GET_USER_DATA();
      } catch (error) {
      }
    });

    return {isActiveModal: computed(() => modal.isActive)};
  },
});
</script>

<style lang="scss">
#app {
  text-align: center;
  overflow: hidden;
  width: 100%;
  max-height: 100vh;
  position: relative;
}

.content {
  display: none;
  background: linear-gradient(180deg, #f3f3fb 0%, #fdfbfd 100%);
  overflow: hidden;
  height: 100vh;

  @media (min-width: 992px) {
    display: block;
  }
}
</style>
