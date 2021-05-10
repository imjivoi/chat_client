<template>
  <Spinner v-if="isLoading" height="100vh" text="Loading..." width="100vw"/>

  <div v-else class="content">
    <SideBar/>
    <div class="wrapper">
      <div class="flex align-center mb-2 transition">
        <Back v-if="isRouteBack" @click.native="goBack"
              class="arrow-back mr-1 transition"/>
        <h2 class="transition">{{ routeTitle }}</h2></div>
      <router-view/>
    </div>
  </div>
  <Modal/>

</template>

<script lang="ts">
import Modal from "@/components/common/Modal.vue";
import SideBar from "@/components/common/Sidebar.vue";
import Spinner from "@/components/common/Spinner.vue";
import {Back} from "@/components/icons";

import appConfig from "@/app.config"

import {useSocket} from "@/composable";
import {useRoute, useRouter} from "vue-router";

import {computed, defineComponent, provide} from "vue";
import {useAuthStore} from "@/store";

export default defineComponent({
  name: "AppLayoutDefault",
  components: {SideBar, Spinner, Modal, Back},
  setup() {
    const auth = useAuthStore();
    const {socket} = useSocket(appConfig.socketUrl);
    const route = useRoute();
    const router = useRouter()

    const routeTitle = computed(() => route.meta.title);
    const isRouteBack = computed(() => route.meta.back)
    const isLoading = computed(() => auth.isLoading);

    provide("socket", socket);

    function goBack() {
      router.back()
    }


    return {routeTitle, isLoading, goBack, isRouteBack};
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 0 0 0 230px;
  padding: 35px 35px 0 35px;
  height: 100vh;
  overflow: hidden;
  position: relative;

  h2 {
    font-size: 28px;
  }

  @media only screen and (max-width: 756px) {
    margin: 0;
    padding: 50px 20px 0 20px;
  }
}
</style>
