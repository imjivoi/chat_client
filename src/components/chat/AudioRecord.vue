<template>
  <div class="audio-record">
    <div class="audio-record__content" v-if="mediaRecorder">
      <div class="audio-record__overlay bg-blur" ref="overlay"
      >
        <div class="waves">
          <div class="sonar-emitter">
            <transition-group name="fade">
              <div class="sonar-wave sonar-wave--anim"
                   v-for="i in volume" key="i"></div>

            </transition-group>
          </div>
        </div>
        <div class="flex " style="align-items: baseline"><p class="mr-1">
          Recording</p>
          <div class="dot-pulse"></div>
        </div>
      </div>

      <div class="timer" v-if="!isSending">{{ minutes + ' : ' + seconds }}</div>
      <div class="timer" v-else>Sending ...</div>
      <div class="btns">
        <Button is-icon icon="send" @click="send"/>
        <Button is-icon icon="micro-off" ref="stopBtn"
                @click="close"/>
      </div>
    </div>
  </div>
</template>

<script>
import notificationService from "@/services/notificationService";
import Button from "@/components/ui/Button";
export default {
  name: "AudioRecord",
  components: {Button},
  data: () => ({
    minutes: '00',
    seconds: '00',
    interval: null,
    mediaRecorder: null,
    status: '',
    isSending: false,
    volume: null,
    jsNode: null
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
      this.isSending = true
      this.stopRecord();
      this.status = 'send'
      setTimeout(() => this.$emit("sendMessage"), 500
      )

    },
    createAnalyzer(stream) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      this.jsNode = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(this.jsNode);
      this.jsNode.connect(audioContext.destination);
      this.jsNode.addEventListener('audioprocess', () => {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        let values = 0;

        const length = array.length;
        for (let i = 0; i < length; i++) {
          values += (array[i]);
        }

        const average = values / length;

        this.volume = Math.round(average);
      })

    }
  },
  mounted() {
    window.navigator.mediaDevices
      .getUserMedia({audio: true})
      .then((stream) => {
        this.createAnalyzer(stream)
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
    this.volume = null;
    this.jsNode = null
  },
  watch: {
    seconds: function () {
      if (parseInt(this.seconds) === 30) {
        // this.send()
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
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-size: 48px;
      FONT-WEIGHT: 600;
      color: #9880ff;
    }
  }
}

.timer {
  font-size: 24px;
  font-weight: 600;
  z-index: 1;
}

.btns {
  z-index: 1;
  display: flex;

  button {
    transition: all .4s;
    margin: 0 10px 0 0;

    &:hover {
      transform: scale(1.3);
    }
  }
}

.waves {
  position: absolute;

  .sonar-emitter {
    position: relative;
    margin: 32px auto;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background-color: transparent;
  }

  .sonar-wave {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: $primary;
    opacity: 0;
    z-index: -1;
    pointer-events: none;
    transition: all .4s;
  }

  .sonar-wave--anim {
    animation: sonarWave 2s linear infinite;
  }

  @keyframes sonarWave {
    from {
      opacity: 0.7;
    }
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
}

.dot-pulse {
  position: relative;
  left: -9999px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #9880ff;
  color: #9880ff;
  box-shadow: 9999px 0 0 -5px #9880ff;
  animation: dotPulse 1.5s infinite linear;
  animation-delay: .25s;
}

.dot-pulse::before, .dot-pulse::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #9880ff;
  color: #9880ff;
}

.dot-pulse::before {
  box-shadow: 9984px 0 0 -5px #9880ff;
  animation: dotPulseBefore 1.5s infinite linear;
  animation-delay: 0s;
  left: -10px;
}

.dot-pulse::after {
  box-shadow: 10014px 0 0 -5px #9880ff;
  animation: dotPulseAfter 1.5s infinite linear;
  animation-delay: .5s;
}

@keyframes dotPulseBefore {
  0% {
    box-shadow: 9984px 0 0 -5px #9880ff;
  }
  30% {
    box-shadow: 9984px 0 0 2px #9880ff;
  }
  60%,
  100% {
    box-shadow: 9984px 0 0 -5px #9880ff;
  }
}

@keyframes dotPulse {
  0% {
    box-shadow: 9999px 0 0 -5px #9880ff;
  }
  30% {
    box-shadow: 9999px 0 0 2px #9880ff;
  }
  60%,
  100% {
    box-shadow: 9999px 0 0 -5px #9880ff;
  }
}

@keyframes dotPulseAfter {
  0% {
    box-shadow: 10014px 0 0 -5px #9880ff;
  }
  30% {
    box-shadow: 10014px 0 0 2px #9880ff;
  }
  60%,
  100% {
    box-shadow: 10014px 0 0 -5px #9880ff;
  }
}

</style>
