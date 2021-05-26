<template>
  <div class="info" v-if="chat">

    <div class="participants">
      <h4>Participants</h4>
      <ul class="participant-list">
        <li v-for="participant in acceptedParticipants">
          <UserItem
            :username="participant.user.username"
            :avatar="participant.user.avatar"
            :is-admin="isAdmin(participant.user._id)"
            :participant-id="participant._id"

          />
          <Popover v-if="imAdmin && !isAdmin(participant.user._id)">
            <div class="pop-item">block</div>
          </Popover>
        </li>
      </ul>
    </div>
    <template v-if="imAdmin">
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
            <Popover>
              <div class="pop-item " @click="acceptRequest(participant._id)">
                accept
              </div>
              <div class="pop-item " @click="blockParticipant(participant._id)">
                block
              </div>
            </Popover>
          </li>
        </ul>
      </div>

      <div class="invite">
        <h4>Invite</h4>

        <div class="mt-1 mh-auto" style="text-align: center">
          <Button type="outline" label="Create invite" @click="createInvite"
                  style="width: 100%" v-if="!chat.invite"/>
          <template v-else>
            <Input v-model:text="inviteLink" placeholder="Please input"
                   disabled/>
            <Button type="outline" label="Copy
            invite link" @click="copyLink" class="mt-1"
                    style="width: 100%" v-if="isValidInviteLink"/>
            <Button type="outline" label="Update link" @click="updateInvite"
                    class="mt-1"
                    style="width: 100%" v-else/>

          </template>
        </div>

      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Popover from "@/components/ui/Popover.vue"
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import UserItem from "@/components/common/UserItem.vue";
import Spinner from "@/components/common/Spinner.vue";

import {defineComponent} from "vue"
import {useChatData} from "@/composable";
//todo:принять, блокировать запрос в чат, удалять юзера
export default defineComponent({
  name: "ChatInfo",
  components: {UserItem, Spinner, Button, Input, Popover},
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

    function isAdmin(userId: string) {
      return userId === currentChat.value?.admin._id
    }

    function acceptRequest(participant_id: string) {
      updateParticipant({participant_id, accepted: true})
    }

    function blockParticipant(participant_id: string) {
      updateParticipant({participant_id, blocked: true})
    }

    return {
      acceptedParticipants,
      requests,
      createInvite,
      chat: currentChat,
      inviteLink,
      copyLink,
      isValidInviteLink,
      updateInvite,
      imAdmin,
      isAdmin,
      acceptRequest,
      blockParticipant
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
  border-radius: 10px;

}

.participant-list {
  margin: 15px 0 0;
  max-height: 50%;

  li {
    text-align: left;
    font-weight: 500;
    border-radius: 10px;
    @include list_item_mixin;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 10px;

    &:last-child {
      margin: 0;
    }
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

.pop-item {
  margin: 0 0 10px;
  font-size: 18px;

  &:hover {
    opacity: 0.8;
  }

  &:last-child {
    margin: 0;
  }
}
</style>
