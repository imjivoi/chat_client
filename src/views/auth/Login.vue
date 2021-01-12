<template>
  <div class="login">
    <h1 class="p-mb-4">Login</h1>
    <div class="form p-mb-2">
      <span class="p-float-label p-mb-4">
        <InputText
          id="email"
          type="email"
          v-model="email"
          style="width: 100%"
        />
        <label for="email">Email</label>
      </span>
      <span class="p-float-label p-mb-3">
        <InputText
          id="password"
          type="password"
          v-model="password"
          style="width: 100%"
        />
        <label for="password">Password</label>
      </span>
      <Button
        label="Login"
        width="100%"
        @click="login"
        :disabled="!email.length || !password.length"
      />
    </div>
    <p>
      Don't registered yet? <router-link to="/auth/signup/">Signup</router-link>
    </p>
  </div>
</template>

<script lang='ts'>
import Button from "../../components/Button.vue";

import InputText from "primevue/inputtext";

import { defineComponent, ref } from "vue";
import { useStore } from "@/composition-api/useStore";
import { AllActionTypes } from "@/store/types/actions.types";
import notificationService from "@/services/notificationService";
import { useRouter } from "vue-router";
export default defineComponent({
  components: { InputText, Button },

  setup(_, ctx) {
    const email = ref("");
    const password = ref("");
    const store = useStore();
    const router = useRouter();

    function login() {
      store
        .dispatch(AllActionTypes.GET_AUTH, {
          email: email.value,
          password: password.value,
        })
        .then((res) => {
          notificationService.success("Authorized");
          setTimeout(() => router.push("/"), 200);
        });
    }

    return {
      email,
      password,
      login,
    };
  },
});
</script>

<style scoped>
p {
  font-size: 0.8em;
}
</style>