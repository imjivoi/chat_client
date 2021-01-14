<template>
  <div class="avatar">
    <span v-if="!image">{{ label }}</span>
    <img src="" alt="" v-else />
  </div>
</template>

<script>
export default {
  props: {
    nickname: { type: String },
    image: { type: String },
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
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  background-color: #dee2e6;
  border-radius: 50%;
}

img {
  width: 100%;
}
</style>