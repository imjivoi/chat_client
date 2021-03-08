<template>
  <template v-if="isShowRequests">
    <el-page-header @back="isShowRequests = false" />
    <UserItem v-for="item in requests" :key="item._id" :item="item" />
  </template>
  <template v-else
    ><el-badge>
      <el-button size="medium" type="text" @click="isShowRequests = true"
        >Friendship requests</el-button
      > </el-badge
    ><UserItem v-for="item in accepted" :key="item._id" :item="item"
  /></template>
</template>

<script lang="ts">
import UserItem from "../common/UserItem.vue";

import { computed, defineComponent, ref } from "vue";
import { useAuthStore, useFriendshipStore } from "@/store";
export default defineComponent({
  components: { UserItem },
  setup() {
    const auth = useAuthStore();
    const friends = useFriendshipStore();
    const isShowRequests = ref(false);
    const requests = computed(() => friends.requested);
    const accepted = computed(() => friends.accepted);

    return { isShowRequests, requests, accepted, myId: auth.userData?._id };
  },
});
</script>

<style></style>
