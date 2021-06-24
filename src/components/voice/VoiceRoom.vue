<template>
  <div class="voice-room">
    <Button :label="$t('Enter voice chat')" />
  </div>
  <Audio v-for="(peer, idx) in peers" :key="idx" :peer="peer" />
</template>

<script lang="ts">
import Audio from './Audio.vue';
import Button from '@/components/ui/Button.vue';

import appConfig from '@/app.config';
import { useSocket, useVoice } from '@/composable';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'VoiceRoom',
  components: { Button, Audio },
  setup() {
    const { peers } = useVoice();
    return { peers };
  },
});
</script>

<style scoped lang="scss">
.voice-room {
  min-width: 250px;
  background: #fff;
  box-shadow: $box_shadow;
  width: 20%;
  padding: 10px 20px;
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  margin: 0 10px;
}
</style>
