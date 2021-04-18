<template>
  <div class="info">
    <h4>Participants</h4>
    <ul class="participant-list">
      <li v-for="participant in participants">
        <UserItem
          :username="participant.user.username"
          :avatar="participant.user.avatar"
          :is-admin="chat.admin._id===participant.user._id"
        />
      </li>
    </ul>
    <div class="invite">
      <h4>Invite</h4>
      <div class="mt-1 mh-auto">
        <el-button v-if="!chat.invite" @click="createInvite">Create invite
        </el-button>
        <template v-else>

        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UserItem from "@/components/common/UserItem.vue";

import {computed, defineComponent} from "vue"
import {useChatStore} from "../../store";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "ChatInfo",
  components: {UserItem},
  setup() {
    const route = useRoute()
    const chatStore = useChatStore()
    const chat = computed(() => chatStore.list.find(chat => chat._id === route.params.id))
    const
      participants = computed(() =>
        chat.value?.participants.sort((a, b) => a.user._id ===
        chat.value?.admin._id ? 1 : 0))

    function createInvite() {
      //TODO:доделать создание и вывод инвайта
      if (chat.value?._id) return chatStore.CREATE_INVITE(chat.value?._id)

    }


    return {
      participants, chat, createInvite
    }
  }
})
</script>

<style lang="scss" scoped>
.info {
  min-width: 250px;
  background: #fff;
  box-shadow: $box_shadow;
  width: 20%;
  padding: 10px 20px;
  position: relative;
  text-align: left
}

.participant-list {
  margin: 15px 0 0;
  max-height: 50%;

  li {
    text-align: left;
    font-weight: 500;
  }
}

.invite {
  position: absolute;
  bottom: 0;
  left: 20px;
  height: 150px;
  width: 100%;
}

h4 {
  color: $color_gray;
}

</style>
