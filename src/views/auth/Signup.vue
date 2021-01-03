<template>
  <div class="signup">
    <h1 class="p-mb-4">Registration</h1>
    <div class="form p-mb-2">
      <span class="p-float-label p-mb-4">
        <InputText
          id="Username"
          type="text"
          v-model="username"
          style="width: 100%"
        />
        <label for="username">Username</label>
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
      <Button label="Register" width="100%" />
    </div>
    <p>
      Already registered? <router-link to="/auth/login/">Login</router-link>
    </p>
  </div>
</template>

<script lang='ts'>
import Button from "../../components/Button.vue";

import InputText from "primevue/inputtext";

import { defineComponent } from "vue";

export default defineComponent({
  components: { InputText, Button },
  data: () => ({
    username: "",
    email: "",
    password: "",
  }),
});
</script>

<style scoped>
p {
  font-size: 0.8em;
}
</style>