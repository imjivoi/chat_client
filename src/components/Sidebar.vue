<template>
  <aside class="sidebar">
    <ul>
      <li class="p-mb-5" v-tooltip.right="'Profile'">
        <router-link to=""><i class="pi pi-user"></i></router-link>
      </li>
      <li class="p-mb-5" v-tooltip.right="'Friends'">
        <router-link to="/friends"><i class="pi pi-users"></i></router-link>
      </li>

      <li class="p-mb-5" v-tooltip.right="'Chats'">
        <router-link to="/chats"><i class="pi pi-comment"></i></router-link>
      </li>
      <li v-tooltip.right="'Settings'">
        <router-link to=""><i class="pi pi-sliders-h"></i></router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import Tooltip from "primevue/tooltip";
export default {
  directives: {
    tooltip: Tooltip,
  },
};
</script>

<style scoped lang='scss'>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 50px;
  box-shadow: 0 0 3px 0 #131313;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
</style>