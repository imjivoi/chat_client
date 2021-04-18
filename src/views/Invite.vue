<template>
  <div class="container">
<!--    <template v-if="error && error.status===404">-->
<!--      <p v-if="error.message" class="mt-5">{{ error.message }}</p>-->
<!--    </template>-->
<!--    <template v-if="error && error.status===403">-->
<!--      <p v-if="error.message" class="mt-5">{{ error.message }}</p>-->
<!--    </template>-->
  </div>
</template>

<script lang="ts">

import {computed, defineComponent, onMounted, ref} from "vue"
import {useRoute} from "vue-router";
import {useChatStore} from "@/store";

export default defineComponent({
  name: "Invite",
  setup() {
    const route = useRoute()
    const chatStore = useChatStore()


    const key = computed(() => route.params.key)

    async function sendRequest() {
        const res = await chatStore.SEND_REQUEST(key.value)

    }

    onMounted(() => sendRequest())



  }
})
</script>

<style scoped>
p {
  font-size: 32px;
  font-weight: 700;
}
</style>
