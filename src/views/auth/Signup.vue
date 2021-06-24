<template>
  <div class="signup">
    <h1 class="mb-2">Registration</h1>
    <form @submit.prevent class="mb-1">
      <Input
        placeholder="Username"
        class="mb-1"
        v-model:text="form.username"
        :error="errors.username"
      />
      <Input v-model:text="form.email" placeholder="Email" class="mb-1" :error="errors.email" />
      <Input
        v-model:text="form.password"
        type="password"
        placeholder="Password"
        class="mb-1"
        :error="errors.password"
      />
      <Button label="Register" style="width:100%" :disabled="!isValid" @click="register" />
    </form>

    <p>
      Already registered?
      <router-link to="/auth/login/">Login</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';

import { computed, defineComponent, reactive, watch } from 'vue';
import notificationService from '@/services/notificationService';
import { useUserStore } from '@/store/';
import useFormValidation from '@/composable/useFormValidation';

export default defineComponent({
  name: 'Signup',
  components: { Input, Button },
  setup() {
    const form = reactive({
      username: '',
      email: '',
      password: '',
    });
    const auth = useUserStore();
    const {
      validateEmailField,
      validatePasswordField,
      validateNameField,
      errors,
    } = useFormValidation();
    const isValid = computed(
      () =>
        Object.entries(errors).every(([_, val]) => !val) &&
        Object.entries(form).every(([_, val]) => val.length),
    );

    async function register() {
      if (isValid) {
        auth
          .register({
            username: form.username,
            email: form.email,
            password: form.password,
          })
          .then(() => {
            notificationService.success('Succed!');
          });
      }
    }

    watch(form, () => {
      validateNameField('username', form.username);
      validateEmailField('email', form.email);
      validatePasswordField('password', form.password);
    });

    return {
      form,
      register,
      isValid,
      errors,
    };
  },
});
</script>

<style scoped>
p {
  font-size: 0.8em;
}
</style>
