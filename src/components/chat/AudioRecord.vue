<template>
  <div class="audio-record">
    <div class="audio-record__content" v-if="mediaRecorder">
      <div class="audio-record__overlay " ref="overlay"
           @mouseup="send"></div>

      <div class="timer" v-if="!isSending">{{ minutes + ' : ' + seconds }}</div>
      <div class="timer" v-else>Sending ...</div>
      <el-button type="danger" icon="el-icon-turn-off-microphone" circle
                 ref="stopBtn"
                 @mouseup="close"
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
    status: '',
    isSending:false
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
    stopRecord() {
      clearInterval(this.interval);
      this.minutes = 0;
      this.seconds = 0
      this.mediaRecorder.stop();
    },
    close() {
      this.stopRecord()
      this.status = 'cancel'
      this.$emit("closeAudioRecord");
    },
    send() {
      this.isSending=true
      this.stopRecord();
      this.status = 'send'
      setTimeout(() => this.$emit("sendMessage"), 300
      )

    }
  },
  mounted() {
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
          if (this.status === 'cancel') return
          this.$emit('setAttachments', file)

        });
      }).catch(() => notificationService.error('You must allow recording'))
  },
  beforeMount() {
    this.mediaRecorder = null;
  },
  watch:{
    seconds:function () {
      if (parseInt(this.seconds)===30){
        this.send()
      }
    }
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

  &__overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }
}

.timer {
  font-size: 24px;
  font-weight: 600;
  z-index: 1;
}

.el-button {
  transition: all .4s;
  z-index: 1;

  &:hover {
    transform: scale(1.3);
  }
}
</style>
