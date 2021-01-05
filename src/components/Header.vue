<template>
  <header>
    <div class="header__right">
      <div v-if="!isLogged">
        <Button label="Login" link="/auth/login" style="margin-right: 10px" />
        <Button label="Sign up" link="/auth/signup" outline />
      </div>
      <div v-else>
        <Button label="Sign out" outline @click="logout" />
      </div>
    </div>
  </header>
</template>

<script lang='ts'>
import Button from "./Button.vue";

import { computed, defineComponent } from "vue";
import { useStore } from "@/composition-api/useStore";
import { AllActionTypes } from "@/store/types/actions.types";
export default defineComponent({
  components: {
    Button,
  },
  setup() {
    const store = useStore();
    const isLogged = computed(() => store.getters.isLogged);
    function logout() {
      store.dispatch(AllActionTypes.LOGOUT);
    }

    return { isLogged, logout };
  },
});
</script>

<style scoped>
header {
  height: 8vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
  padding: 0 15px;
}
.header__right {
  float: right;
}
</style>