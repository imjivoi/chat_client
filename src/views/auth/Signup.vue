<template>
  <div class="signup">
    <h1 class="p-mb-4">Registration</h1>
    <div class="form p-mb-2">
      <span class="p-float-label p-mb-4">
        <InputText
          id="nickname"
          type="text"
          v-model="nickname"
          style="width: 100%"
        />
        <label for="nickname">Nickname</label>
      </span>
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
        label="Register"
        width="100%"
        @click="register"
        :disabled="!nickname.length || !email.length || !password.length"
      />
    </div>

    <p>
      Already registered? <router-link to="/auth/login/">Login</router-link>
    </p>
  </div>
</template>

<script lang='ts'>
import Button from "../../components/Button.vue";

import InputText from "primevue/inputtext";

import { computed, defineComponent, reactive, ref } from "vue";
import { useStore } from "@/composition-api/useStore";
import { AllActionTypes } from "@/store/types/actions.types";
import notificationService from "@/services/notificationService";
import { validator } from "../../utils/validators/registerValidator";

import { Field, Form } from "vee-validate";

export default defineComponent({
  components: { InputText, Button, Field, Form },
  setup(_, ctx) {
    const nickname = ref("");
    const email = ref("");
    const password = ref("");

    const store = useStore();

    const validation = computed(() =>
      validator({
        email: email.value,
        nickname: nickname.value,
        password: password.value,
      })
    );

    function register() {
      if (validation.value.status) {
        store
          .dispatch(AllActionTypes.REGISTER, {
            nickname: nickname.value,
            email: email.value,
            password: password.value,
          })
          .then((res) => {
            notificationService.success("Succed!");
          });
      } else {
        notificationService.error(validation.value.errors.join("\n"));
      }
    }

    return {
      email,
      password,
      register,
      nickname,
    };
  },
});
</script>

<style scoped>
p {
  font-size: 0.8em;
}
</style>