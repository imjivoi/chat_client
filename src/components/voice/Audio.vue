<template>
  <audio autoplay ref="audio"></audio>
</template>

<script>
export default {
  props: {
    peer: {
      type: Object,
    },
  },
  mounted() {
    this.peer.on("stream", (stream) => {
      this.$refs.audio.srcObject = stream;
    });
  },
};
</script>

<style></style>
