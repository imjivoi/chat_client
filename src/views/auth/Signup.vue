<template>
  <div class="signup">
    <h1 class="p-mb-4">Registration</h1>
    <el-form :model="form" ref="formBlock" class="p-mb-2" :rules="rules">
      <el-form-item prop="username">
        <el-input placeholder="Username" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input placeholder="Email" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="Password" v-model="form.password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="register" style="width:100%"
        >Register</el-button
      >
    </el-form>

    <p>
      Already registered? <router-link to="/auth/login/">Login</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import Button from "../../components/Button.vue";

import InputText from "primevue/inputtext";

import { computed, defineComponent, reactive, ref } from "vue";
import { useStore } from "@/composition-api/useStore";
import { AllActionTypes } from "@/store/types/actions.types";
import notificationService from "@/services/notificationService";
import useValidation from "@/composition-api/useFormRules";

export default defineComponent({
  name: "Signup",
  components: { InputText, Button },
  setup(_, ctx) {
    const form = reactive({
      username: "",
      email: "",
      password: "",
    });
    const store = useStore();
    const { rules, formBlock, validation } = useValidation();

    async function register() {
      if (await validation()) {
        store
          .dispatch(AllActionTypes.REGISTER, {
            username: form.username,
            email: form.email,
            password: form.password,
          })
          .then((res) => {
            notificationService.success("Succed!");
          });
      }
    }

    return {
      form,
      register,
      formBlock,
      rules,
    };
  },
});
</script>

<style scoped>
p {
  font-size: 0.8em;
}
</style>
