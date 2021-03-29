<template>
  <div class="login">
    <h1 class="mb-2">Login</h1>
    <el-form :model="form" ref="formBlock" class="mb-1" :rules="rules">
      <el-form-item prop="email">
        <el-input placeholder="Email" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="Password" v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-button type="primary" @click="login" style="width:100%">Login</el-button>
    </el-form>
    <p>Don't registered yet? <router-link to="/auth/signup/">Signup</router-link></p>
  </div>
</template>

<script lang="ts">
import { useFormRules } from "@/composable";
import { defineComponent,  reactive } from "vue";
import notificationService from "@/services/notificationService";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store";
export default defineComponent({
  name: "Login",
  setup() {
    const form = reactive({
      email: "",
      password: ""
    });
    const { rules, formBlock, validation } = useFormRules();

    const auth = useAuthStore();
    const router = useRouter();

    async function login() {
      if (await validation()) {
        auth
          .GET_AUTH({
            email: form.email,
            password: form.password
          })
          .then(() => {
            notificationService.success("Authorized");
            router.push({name:'Home'});
          });
      }
    }

    return {
      form,
      login,
      formBlock,
      rules
    };
  }
});
</script>

<style scoped>
p {
  font-size: 0.8em;
}
</style>
