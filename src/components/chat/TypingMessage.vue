<template>
  <div class="typing-message">
    {{ `${username} is ${isAudio ? 'recording audio' : 'typing message'} ...` }}
  </div>
</template>

<script>
export default {
  name: "TypingMessage",
  props: {
    username: {
      type: String,
      required: true
    },
    isAudio: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.typing-message {
  margin: 0 auto 10px 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: fit-content;
  max-width: 80%;
  position: relative;
  color: $color_gray3;


}
</style>
