<template>
  <div class="info" v-if="chat">

    <div class="participants">
      <h4>Participants</h4>
      <ul class="participant-list">
        <li v-for="participant in acceptedParticipants">
          <UserItem
            :username="participant.user.username"
            :avatar="participant.user.avatar"
            :is-admin="chat.admin._id===participant.user._id"
            :participant-id="participant._id"

          />
        </li>
      </ul>
    </div>
    <div class="requests" v-if="requests.length">
      <h4>Requests</h4>
      <ul class="participant-list">
        <li v-for="participant in requests">
          <UserItem
            :username="participant.user.username"
            :avatar="participant.user.avatar"
            :participant-id="participant._id"
            :is-request="true"
            @update="updateParticipant"

          />
        </li>
      </ul>
    </div>

    <div class="invite" v-if="imAdmin">
      <h4>Invite</h4>

      <div class="mt-1 mh-auto" style="text-align: center">
        <el-button v-if="!chat.invite" @click="createInvite"
                   style="width: 100%">Create invite
        </el-button>
        <template v-else>
          <el-input
            placeholder="Please input"
            v-model="inviteLink"
            :disabled="true">
          </el-input>
          <el-button class="mt-1" style="width: 100%" @click="copyLink"
                     v-if="isValidInviteLink">Copy
            invite link
          </el-button>
          <el-button class="mt-1" style="width: 100%" @click="updateInvite"
                     v-else>Update link
          </el-button>
        </template>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import UserItem from "@/components/common/UserItem.vue";
import Spinner from "@/components/common/Spinner.vue";

import {defineComponent} from "vue"
import {useChatData} from "@/composable";

export default defineComponent({
  name: "ChatInfo",
  components: {UserItem, Spinner},
  setup() {
    const
      {
        acceptedParticipants,
        requests,
        createInvite,
        currentChat,
        inviteLink,
        copyLink,
        isValidInviteLink,
        updateInvite,
        updateParticipant,
        imAdmin
      } = useChatData()

    return {
      acceptedParticipants,
      requests,
      createInvite,
      chat: currentChat,
      inviteLink,
      copyLink,
      isValidInviteLink,
      updateInvite,
      updateParticipant,imAdmin
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
