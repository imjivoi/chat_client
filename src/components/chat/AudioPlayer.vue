<template>
  <div class="audio-player" v-if="audio">
    <div class="btn">
      <el-button icon="el-icon-video-play" type="text" circle
                 v-if="isPaused" @click="play"></el-button>
      <el-button icon="el-icon-video-pause" type="text" circle @click="pause"
                 v-else></el-button>
    </div>
    <div class="timeline"></div>
    <div class="time">{{currentTime}}</div>
  </div>
</template>

<script>
//todo:закончить


export default {

  name: "AudioPlayer",
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data: () => ({
    audio: null,
    isPaused:true
  }),
  computed:{
    currentTime(){
      const time=this.audio.currentTime
      let seconds = parseInt(time);
      let minutes = parseInt(seconds / 60);
      seconds -= minutes * 60;
      return `${minutes} : ${seconds}`
    }
  },

  methods:{
    play(){
      this.audio.play()
      this.isPaused=false

    },
    pause(){
      this.audio.pause()
      this.isPaused=true

    }
  },
  mounted() {
    this.audio = new Audio(this.src)
  },
  watch:{
    audio:function(){
      console.log(this.audio.paused)
    }
  }
}
</script>

<style scoped lang="scss">
.audio-player {
  width: 250px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.timeline{
  width: 80%;
  height: 1px;
  background-color: #2a8bf247;}
</style>
