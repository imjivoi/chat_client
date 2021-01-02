<template>
  <section class="home">
    <Sidebar />
    <div class="container"><router-view></router-view></div>
  </section>
</template>

<script lang="ts">
import Sidebar from "../components/Sidebar.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: { Sidebar },
});
</script>
<style lang='scss' scoped>
.container {
  padding: 5px 5px 5px 60px;
  height: calc(100vh - 51px);
}
</style>
