<template>
  <div class="empty" v-if="isLoading"><Spinner height="100%" /></div>

  <template v-else>
    <div class="p-d-flex " style="height:88%">
      <div style="width:300px">
        <div class="p-mb-2">
          <el-tabs v-model="activeTab" style="width:100%" stretch>
            <el-tab-pane label="Chats" name="Chats" style="text-align:left"
              ><ChatTab />
            </el-tab-pane>
            <el-tab-pane label="Friends" name="Friends" style="text-align:left"
              ><FriendsTab
            /></el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="chat__content">
        <router-view />
        <p v-if="!$route.params.id">Choose a chat</p>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import FriendsTab from "@/components/chat/FriendsTab.vue";
import ChatTab from "@/components/chat/ChatTab.vue";
import Spinner from "../components/common/Spinner.vue";

import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  components: { Spinner, ChatTab, FriendsTab },
  name: "Chats",
  setup() {
    const search = ref("");
    const isLoading = ref(false);
    const activeTab = ref("Chats");
    return {
      isLoading,
      activeTab,
    };
  },
});
</script>

<style scoped lang="scss">
.chats {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h2 {
    font-size: 28px;
  }
  &__list {
    width: 300px;
  }
}

.chat__content {
  width: 65%;
  position: relative;
  // background: #ffffff;
  border-radius: 6px;
  height: 100%;

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--primary-color);
    font-size: 2em;
  }
}
.el-tabs {
  .el-tabs__header {
    .el-tabs__nav-wrap {
      display: none;

      &::after {
        display: none;
      }
    }
  }
}
</style>
