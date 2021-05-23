<template>
  <section class="welcome-page wh-100">
    <Header/>
    <div class=" flex flex-column align-center justify-center "
         style="height: 90%">
      <h1 class=" mb-1">Create your private text or voice chat</h1>
      <Button @click="routeTo" label="Get started"/>
    </div>
  </section>
</template>

<script>
import Button from "@/components/ui/Button";


import Header from '@/components/common/Header'

export default {
  components: {Header, Button},
  methods: {
    routeTo() {
      this.$router.push({name: 'Signup'})
    }
  }
};
</script>

<style>
</style>
