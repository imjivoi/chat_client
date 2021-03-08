<template>
  <h3 class="p-mb-5">Create new voice room</h3>
  <el-input
    placeholder="Voice name"
    v-model="voiceName"
    class="p-mb-3"
  ></el-input>

  <el-button
    type="primary"
    style="width:100%"
    @click="createVoice"
    :loading="isLoading"
    >Create</el-button
  >
</template>
<script lang="ts">
import { useModal, useVoiceStore } from "@/store/";

import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  name: "CreateVoice",
  setup() {
    const voiceName = ref("");
    const isLoading = ref(false);

    const modal = useModal();
    const voice = useVoiceStore();
    const isActive = computed(() => modal.type === "Voice");

    const createVoice = async () => {
      isLoading.value = true;
      await voice.CREATE_VOICE(voiceName.value);
      isLoading.value = false;
      modal.HIDE();
    };
    return { voiceName, createVoice, isActive, isLoading };
  },
});
</script>
<style lang="scss" scoped></style>
