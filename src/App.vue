<template>
  <div>
    <div class="content" v-if="!isLoading">
      <Header @logout="logout" :isLogged="isLogged" :isLoading="isLoading" />
      <router-view />
    </div>
    <Spinner height="100vh" width="100vw" text="Loading..." v-else />
  </div>
</template>
<script lang='ts'>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.content {
  display: none;
  background-color: #c0c0c0;
  overflow: hidden;
  @media (min-width: 992px) {
    display: block;
  }
}
</style>
