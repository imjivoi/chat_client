<template>
  <Modal>
    <div class="emoji-picker">
      <span
        v-for="(emoji, index) in emojis"
        :key="index"
        @click="$emit('setEmoji', emoji)"
        >{{ emoji }}</span
      >
    </div>
  </Modal>
</template>

<script>
import Modal from "../Modal";

const emojis = require("emoji.json/emoji-compact.json");
export default {
  emit: ["setEmoji"],
  components: { Modal },
  data: () => ({
    emojis: emojis,
  }),
  mounted() {},
};
</script>

<style scoped lang='scss'>
.emoji-picker {
  span {
    margin: 5px;
    cursor: pointer;
  }
}
</style>