<template>
  <div class="login">
    <h1 class="mb-2">Login</h1>
    <form @submit.prevent class="mb-1">
      <Input v-model:text="form.email" placeholder="Email" class="mb-1" :error="errors.email" />
      <Input
        v-model:text="form.password"
        type="password"
        placeholder="Password"
        class="mb-1"
        :error="errors.password"
      />
      <Button label="Login" style="width:100%" :disabled="!isValid" @click="login" />
    </form>
    <p>
      Don't registered yet?
      <router-link to="/auth/signup/">Signup</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue';
import notificationService from '@/services/notificationService';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import useFormValidation from '@/composable/useFormValidation';

export default defineComponent({
  name: 'Login',
  components: { Button, Input },
  setup() {
    const form = reactive({
      email: '',
      password: '',
    });

    const auth = useUserStore();
    const router = useRouter();
    const route = useRoute();

    const { validateEmailField, validatePasswordField, errors } = useFormValidation();
    const isValid = computed(
      () =>
        Object.entries(errors).every(([_, val]) => !val) &&
        Object.entries(form).every(([_, val]) => val.length),
    );

    async function login() {
      if (isValid) {
        auth
          .getAuth({
            email: form.email,
            password: form.password,
          })
          .then(() => {
            notificationService.success('Authorized');
            const next = route.query.next;
            if (next && typeof next === 'string') {
              router.push({ path: next });
              return;
            }
            router.push({ name: 'Home' });
          });
      }
    }

    watch(form, () => {
      validateEmailField('email', form.email);
      validatePasswordField('password', form.password);
    });

    return {
      form,
      login,
      errors,
      isValid,
    };
  },
});
</script>

<style scoped>
p {
  font-size: 0.8em;
}
</style>
