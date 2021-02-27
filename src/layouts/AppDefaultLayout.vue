<template>
  <div class="content" v-if="!isLoading">
    <!-- <Header @logout="logout" :isLogged="isLogged" :isLoading="isLoading" /> -->
    <Sidebar />

    <router-view />
  </div>
  <Spinner height="100vh" width="100vw" text="Loading..." v-else />
</template>

<script>
import SideBar from "../components/Sidebar";
export default {
  name: "AppLayoutDefault",
  components: { SideBar },
  mounted() {
    console.log(22);
  },
};
</script>

<style lang="scss" scoped>
.main {
  // background: $beige;
}
.wrapper {
  margin: 0 0 0 200px;
  padding: 50px 35px 0 35px;
  height: 100vh;
  overflow: hidden;

  @media only screen and (max-width: 756px) {
    margin: 0;
    padding: 50px 20px 0 20px;
  }
}
</style>
