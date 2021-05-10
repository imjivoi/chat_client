<template>
  <div class="audio-player" v-if="audio">
    <div class="btn">
      <el-button icon="el-icon-video-play" type="text" circle
                 v-if="isPaused" @click="play" :style="{color}"></el-button>
      <el-button icon="el-icon-video-pause" type="text" circle @click="pause"
                 v-else :style="{color}"></el-button>
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

export default {

  name: "AudioPlayer",
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

.el-button {
  font-size: 18px;
}

.audio-player {
  width: 250px;
  height: 50px;
  display: flex;
  align-items: center;
  position: relative;

  input {
    width: 100%;
  }
}

.timeline {
  width: 80%;
  height: 1px;
  background-color: #2a8bf247;
}

.current-time, .duration-time {
  position: absolute;
  left: 40px;
  bottom: 0;
  color: #2a8bf2;
  font-size: 12px;
}

.duration-time {
  left: auto;
  right: 15px;
}
</style>
