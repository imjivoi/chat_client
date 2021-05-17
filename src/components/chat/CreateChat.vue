<template>
  <h4 class="mb-1">Enter chat name</h4>
  <el-input v-model="chatName" class="mb-1" placeholder="Chat name"></el-input>
  <el-button
    :loading="isLoading"
    style="width:100%"
    type="primary"
    @click="create"
  >Create
  </el-button
  >

</template>
<script lang="ts">
import {defineComponent, ref} from "vue"
import {useChatInput} from "@/composable";
import {useModal} from "@/store";

export default defineComponent({
  name: "CreateChat",
  setup(_) {
    const isLoading = ref(false)
    const chatName = ref('')
    const {createChat} = useChatInput()
    const modal = useModal()

    function create() {
      createChat(chatName.value)
      modal.HIDE()
    }

    return {chatName, create, isLoading}
  }
})
</script>
