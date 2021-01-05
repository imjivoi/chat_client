<template>
  <div>
    <div class="content" v-if="!isLoading">
      <Header />
      <router-view />
    </div>
    <Spinner text="Loading..." v-else />
  </div>
</template>
<script lang='ts'>
import Spinner from "./components/Spinner.vue";
import Header from "./components/Header.vue";

import { computed, defineComponent, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "./composition-api/useStore";
import { AllActionTypes } from "./store/types/actions.types";
export default defineComponent({
  components: { Header, Spinner },

  setup() {
    const router = useRouter();
    const store = useStore();

    const isLoading = computed(() => store.getters.isLoading);

    onBeforeMount(() => store.dispatch(AllActionTypes.GET_USER_DATA));

    return {
      isLoading,
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
  @media (min-width: 992px) {
    display: block;
  }
}
</style>
