<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>
<script lang="ts">
import Spinner from "./components/Spinner.vue";
import Header from "./components/Header.vue";
import AppLayout from "@/layouts/AppLayout.vue";

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
  components: { Header, Spinner, AppLayout },

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
