<template>
  <div class="content">
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from "./components/Header";
export default {
  components: { Header },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.content {
  display: none;
  background-color: #c0c0c0;
  @media (min-width: 992px) {
    display: block;
  }
}
</style>
