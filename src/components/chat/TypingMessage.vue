<template>
  <div class="typing-message">
    <Avatar class="mr-1" :image="user.avatar" :nickname="user.username" />
    <span> {{ `${isAudio ? $t('recording audio') : $t('typing message')} ...` }} </span>
  </div>
</template>

<script>
import Avatar from '@/components/ui/Avatar.vue';
export default {
  name: 'TypingMessage',
  components: { Avatar },
  props: {
    user: {
      type: Object,
      required: true,
    },
    isAudio: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.typing-message {
  margin: 0 auto 10px 0;
  display: flex;
  align-items: baseline;
  width: fit-content;
  max-width: 80%;
  position: relative;
  color: $color_gray3;
  font-size: 12px;
  font-weight: 500;
}
</style>
