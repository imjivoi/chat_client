<template>
  <div>
    <div class="content" v-if="!isLoading">
      <!-- <Header @logout="logout" :isLogged="isLogged" :isLoading="isLoading" /> -->
      <router-view />
    </div>
    <Spinner height="100vh" width="100vw" text="Loading..." v-else />
  </div>
</template>
<script lang="ts">
import Spinner from "./components/Spinner.vue";
import Header from "./components/Header.vue";

import {
  computed,
  defineComponent,
  onBeforeMount,
  onUnmounted,
  provide,
  ref,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "./composition-api/useStore";
import { AllActionTypes } from "./store/types/actions.types";
export default defineComponent({
  components: { Header, Spinner },

  setup() {
    const store = useStore();

    const isLoading = ref(true);
    const isLogged = computed(() => store.getters.isLogged);

    function logout() {
      store.dispatch(AllActionTypes.LOGOUT);
    }

    onBeforeMount(async () => {
      try {
        await store.dispatch(AllActionTypes.GET_USER_DATA);
      } catch (error) {}

      isLoading.value = false;
    });

    return {
      isLoading,
      isLogged,
      logout,
    };
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
