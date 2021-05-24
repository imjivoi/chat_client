<template>
  <div class="audio-player" v-if="audio">
    <div class="btn">
      <Button is-icon :icon="isPaused ? 'play':'pause'" @click="()=>isPaused ?
      play() : pause()"/>
    </div>
    <input @change="setCurrentTime" type="range" ref="input"
           v-model="currentTime"
           :max="audio.duration ?? 0">
    <div class="current-time" :style="{color}">{{
        formatTime(currentTime)
      }}
    </div>
    <div class="duration-time" v-if="isShowDuration" :style="{color}">
      {{ formatTime(audio.duration) }}
    </div>
  </div>
</template>

<script>

import Button from "@/components/ui/Button";

export default {

  name: "AudioPlayer",
  components: {Button},
  props: {
    src: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#2a8bf2'
    }
  },
  data: () => ({
    audio: null,
    isPaused: true,
    currentTime: 0,
    isShowDuration: false
  }),

  methods: {
    formatTime(time) {
      if (time === Infinity) return ''
      let seconds = parseInt(time);
      let minutes = parseInt(seconds / 60);
      seconds -= minutes * 60;
      return `${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`

    },
    play() {
      this.audio.play()
      this.isPaused = false

    },
    pause() {
      this.audio.pause()
      this.isPaused = true

    },
    setCurrentTime() {
      this.audio.currentTime = this.currentTime
    }
  },
  mounted() {
    this.audio = new Audio(this.src)
    this.audio.addEventListener('loadeddata', () => {
      this.isShowDuration = true
    });
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio.currentTime
    });
  },
  watch: {
    currentTime: function () {
      if (this.currentTime === this.audio.duration) {
        this.isPaused = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.btn {
  margin: 0 12px 0 0;
}


.audio-player {
  width: 250px;
  height: 50px;
  display: flex;
  align-items: center;
  position: relative;

  input {
    width: 100%;
    background: #f3f3fb;
    border-radius: 10px;
    outline: none;
    appearance: none;
    cursor: pointer;

  }

  input::-webkit-slider-thumb {
    background: $primary;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
}

.timeline {
  width: 80%;
  height: 1px;
  background-color: $primary;
}

.current-time, .duration-time {
  position: absolute;
  left: 40px;
  bottom: 0;
  color: $primary;
  font-size: 12px;
}

.duration-time {
  left: auto;
  right: 15px;
}
</style>
