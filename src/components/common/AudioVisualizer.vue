<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
  name: "AudioVisualizer",
  props: {
    volume: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    s: 1,
    w: 0,
    h: 0,
    damping: 0.999,
    canvas: null,
    buffer1: null,
    buffer2: null,
    temp: null
  }),
  methods: {
    init() {
      this.$refs.canvas.width = this.w = Math.floor(innerWidth / this.s);
      this.$refs.canvas.height = this.h = Math.floor(innerHeight / this.s);
      this.$refs.canvas.style.width = '100%';
      this.$refs.canvas.style.height = '100%';
      this.canvas = this.$refs.canvas.getContext("2d");

      this.buffer1 = Array(this.w).fill().map(_ => Array(this.h).fill(0));
      this.buffer2 = Array(this.w).fill().map(_ => Array(this.h).fill(0));

    },

    animation() {

      for (let i = 1; i < this.w - 1; i++) {
        for (let j = 1; j < this.h - 1; j++) {
          this.buffer2[i][j] = ((this.buffer1[i - 1][j] +
            this.buffer1[i + 1][j] +
            this.buffer1[i][j - 1] +
            this.buffer1[i][j + 1]) / 2 - this.buffer2[i][j]) * this.damping;
        }
      }

      let img = new ImageData(this.w, this.h)

      for (let i = 0; i < this.buffer1.length; i++) {
        for (let j = 0; j < this.buffer1[0].length; j++) {
          let index = (j * this.buffer1.length + i) * 4
          img.data[index] = this.buffer2[i][j]
          img.data[index + 1] = this.buffer2[i][j]
          img.data[index + 2] = this.buffer2[i][j]
          img.data[index + 3] = 255
        }
      }

      this.canvas.putImageData(img, 0, 0)

      this.temp = this.buffer2;
      this.buffer2 = this.buffer1;
      this.buffer1 = this.temp;
      requestAnimationFrame(this.animation);
    },
    ripple(e) {
      let x = Math.floor(e.clientX / this.s);
      let y = Math.floor(e.clientY / this.s);
      this.buffer1[x][y] = 500;
    }
  },
  mounted() {
    this.init()
    this.animation()

    document.addEventListener("click", this.ripple  );

    document.addEventListener("mousemove", this.ripple  );
  }
}
</script>

<style scoped>
canvas{
  position: fixed;
  width: 100vw;
  height: 100vh;
}
</style>
