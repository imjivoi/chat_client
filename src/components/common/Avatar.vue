<template>
  <div class="avatar" :style="{ width: `${size}px`, height: `${size}px` }">
    <span v-if="!image">{{ label }}</span>
    <img :src="image" alt="" v-else />
  </div>
</template>

<script>
export default {
  props: {
    nickname: { type: String },
    image: { type: String },
    size: {
      type: String,
    },
  },
  computed: {
    label() {
      return this.image ? "" : this.nickname.slice("")[0];
    },
  },
};
</script>

<style scoped>
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  font-size: 1rem;
  background-color: #dee2e6;
  border-radius: 50%;
  overflow: hidden;
}

img {
  width: 100%;
}
</style>
