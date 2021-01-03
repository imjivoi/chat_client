<template>
  <li class="p-mb-2 p-d-flex p-ai-center p-p-2">
    <Badge color="#1ee952" class="p-mr-5">
      <template v-slot:content
        ><Avatar label="P" class="p-avatar-circle" /></template
    ></Badge>
    <div class="user__name">use user</div>
  </li>
</template>

<script>
import Badge from "./Badge";

import Avatar from "primevue/avatar";

export default {
  components: { Badge, Avatar },
};
</script>

<style scoped lang='scss'>
li {
  @include list_item_mixin;
}
.user__name {
  font-weight: 600;
  font-size: 0.95em;
}
</style>