<template>
  <div class="info">

    <div class="participants">
      <h4>Participants</h4>
      <ul class="participant-list" v-if="chat">
        <li v-for="participant in participants">
          <UserItem
            :username="participant.user.username"
            :avatar="participant.user.avatar"
            :is-admin="chat.admin._id===participant.user._id"
          />
        </li>
      </ul>
      <el-skeleton :rows="0" animated v-else></el-skeleton>
    </div>

    <div class="invite">
      <h4>Invite</h4>

      <div class="mt-1 mh-auto" style="text-align: center" v-if="chat">
        <el-button v-if="!chat.invite" @click="createInvite" style="width: 100%">Create invite
        </el-button>
        <template v-else>
          <el-input
            placeholder="Please input"
            v-model="inviteLink"
            :disabled="true">
          </el-input>
          <el-button class="mt-1" style="width: 100%" @click="copyLink">Copy invite link</el-button>
        </template>
      </div>
      <el-skeleton animated v-else></el-skeleton>

    </div>

  </div>
</template>

<script lang="ts">
import UserItem from "@/components/common/UserItem.vue";
import Spinner from "@/components/common/Spinner.vue";

import notificationService from "@/services/notificationService";

import {computed, defineComponent} from "vue"
import {useChatStore} from "../../store";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "ChatInfo",
  components: {UserItem, Spinner},
  setup() {
    const route = useRoute()
    const chatStore = useChatStore()

    const chat = computed(() => chatStore.list.find(chat => chat._id === route.params.id))
    const
      participants = computed(() =>
        chat.value?.participants.sort((a, b) => a.user._id ===
        chat.value?.admin._id ? 1 : 0))
    const inviteKey = computed(() => chat.value?.invite?.unique_key)
    const inviteLink = computed(() => `${window.location.origin}/app/invite/${inviteKey.value}`)


    function createInvite() {
      //TODO:доделать создание и вывод инвайта
      if (chat.value?._id) return chatStore.CREATE_INVITE(chat.value?._id)
      console.error('Chat id is undefined')
    }

    function copyLink() {
      if (!navigator.clipboard) return notificationService.error("Link can't be copied, please use other navigator")

      navigator.clipboard.writeText(inviteLink.value)
        .then(() => notificationService.success('Link was copied'))
        .catch(() => notificationService.error('Something went wrong'))
    }


    return {
      participants, createInvite, chat, inviteLink, copyLink
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
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  position: relative;
  height: 150px;
  width: 100%;
}

h4 {
  color: $color_gray;
}

</style>
