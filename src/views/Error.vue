<template>
<div class="container wh-100 flex justify-center align-center">
  <el-button @click="backHome"  type="primary" plain style="position: absolute;top: 5%">Back  home</el-button>
  <p v-if="message">
    {{message}}
  </p>
  <div class="status" :status="status">{{status}}</div>

</div>
</template>

<script>
export default {
  name: "Error",
  methods:{
    backHome(){
      this.$router.push({name:'Home'})
    }
  },
  computed:{
    status(){
      return this.$route.query.status
    },
    message(){
      return this.$route.query.message
    }
  }

}
</script>

<style scoped lang="scss">
.container{

  &:after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffffc2;
    filter: blur(5px);
    z-index: -1;
  }
}
p {
  font-size: 74px;
  font-weight: 700;
  position: absolute;
}

.status{
  font-size: 150px;
  animation: glitch 1s linear infinite;
  filter: blur(5px);
  color: cadetblue;
  @keyframes glitch{
    2%,64%{
      transform: translate(2px,0) skew(0deg);
    }
    4%,60%{
      transform: translate(-2px,0) skew(0deg);
    }
    62%{
      transform: translate(0,0) skew(5deg);
    }
  }

  &:before,
  &:after{
    content: attr(status);
    position: absolute;
    left: 0;
  }

  &:before{
    animation: glitchTop 1s linear infinite;
    clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  }

  @keyframes glitchTop{
    2%,64%{
      transform: translate(2px,-2px);
    }
    4%,60%{
      transform: translate(-2px,2px);
    }
    62%{
      transform: translate(13px,-1px) skew(-13deg);
    }
  }

  &:after{
    animation: glitchBotom 1.5s linear infinite;
    clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
    -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
  }

  @keyframes glitchBotom{
    2%,64%{
      transform: translate(-2px,0);
    }
    4%,60%{
      transform: translate(-2px,0);
    }
    62%{
      transform: translate(-22px,5px) skew(21deg);
    }
  }
}

</style>
