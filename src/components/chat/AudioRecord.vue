<template>
  <div class="audio-record">
    <div class="audio-record__content" v-if="mediaRecorder">
      <div class="timer">{{ minutes + ' : ' + seconds }}</div>
      <el-button type="danger" icon="el-icon-turn-off-microphone" circle
                 ref="stopBtn"
      ></el-button>
    </div>
  </div>
</template>

<script>

import notificationService from "@/services/notificationService";

export default {
  name: "AudioRecord",
  data: () => ({
    minutes: '00',
    seconds: '00',
    interval: null,
    mediaRecorder: null,
    audioChunks: []
  }),
  methods: {
    timeCycle() {
      let sec = parseInt(this.seconds);
      let min = parseInt(this.minutes);
      sec++
      if (sec === 60) {
        min++;
        sec = 0
      }

      sec < 10 ? sec = '0' + sec : sec
      min < 10 ? min = '0' + min : min

      this.minutes = min
      this.seconds = sec
    },
    stopRecord(e) {
      clearInterval(this.interval);
      this.minutes = 0;
      this.seconds = 0
      try {
        this.mediaRecorder.stop();
        setTimeout(() => {
          this.$emit("closeAudioRecord");
          if (e.target !== this.$refs.stopBtn) {
            this.$emit("sendMessage");
          }
        }, 300);
      } catch (error) {
        this.$emit("closeAudioRecord");
      }
    },
  },
  mounted() {

    window.addEventListener("mouseup", this.stopRecord);
    window.navigator.mediaDevices
      .getUserMedia({audio: true})
      .then((stream) => {
        this.interval = setInterval(() => this.timeCycle(), 1000
        )
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        this.mediaRecorder.addEventListener("dataavailable", (event) => {
          const file = new File(
            new Array(event.data),
            `audio_${new Date().toString()}.webm`,
            {
              type: "audio",
            }
          );
          this.$emit('setAttachments', file)

        });
      }).catch(() => notificationService.error('You must allow recording'))
  },
  beforeDestroy() {
    window.removeEventListener("mouseup", this.stopRecord);
    this.audioChunks = this.mediaRecorder = null;
  }
}
</script>

<style scoped lang="scss">
.audio-record {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 0 43px;
  }
}

.timer {
  font-size: 24px;
  font-weight: 600;
}
</style>
