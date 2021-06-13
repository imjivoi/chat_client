<template>
  <h4 class="mb-1">{{ $t('Enter chat name') }}</h4>
  <Input
    v-model:text="chatName"
    :placeholder="$t('Chat name')"
    class="mb-1"
    ref="input"
    @keydown.enter.exact="create"
  />
  <!--  <el-input v-model="chatName" class="mb-1" placeholder="Chat name"-->
  <!--            @keydown.enter.exact="create"-->
  <!--            ref="input"></el-input>-->

  <Button style="width: 100%" :disabled="!chatName.length" :label="$t('Create')" @click="create" />
</template>
<script lang="ts">
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';

import { defineComponent, nextTick, onMounted, ref } from 'vue';
import { useChatData, useChatInput } from '@/composable';
import { useModal } from '@/store';
import notificationService from '@/services/notificationService';

export default defineComponent({
  name: 'CreateChat',
  components: { Button, Input },
  setup(_) {
    const isLoading = ref(false);
    const chatName = ref('');
    const input = ref();
    const { createChat } = useChatData();
    const modal = useModal();

    async function create() {
      if (!chatName.value) return;
      try {
        await createChat(chatName.value);
      } catch (error) {
        notificationService.error("Can't create chat");
      } finally {
        modal.HIDE();
      }
    }

    onMounted(() => nextTick(() => input.value.focus()));

    return { chatName, create, isLoading, input };
  },
});
</script>
