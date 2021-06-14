<template>
  <div class="info" v-if="chat">
    <div class="participants">
      <h4>{{ $t('Participants') }}</h4>
      <ul class="participant-list">
        <li v-for="participant in participants" :key="participant.id">
          <UserItem
            :username="participant.user.username"
            :avatar="participant.user.avatar"
            :is-admin="isAdmin(participant.user.id)"
            :participant-id="participant.id"
          />
          <Popover v-if="imAdmin && !isAdmin(participant.user.id)">
            <div class="pop-item" @click="blockParticipant(participant.id)">{{ $t('block') }}</div>
          </Popover>
        </li>
      </ul>
    </div>
    <template v-if="imAdmin">
      <div class="invite">
        <h4>{{ $t('Invite') }}</h4>

        <div class="mt-1 mh-auto" style="text-align: center">
          <Button
            type="outline"
            :label="$t('Create invite')"
            @click="createInvite"
            style="width: 100%"
            v-if="!chat.invite"
          />
          <template v-else>
            <Input v-model:text="inviteLink" placeholder="Please input" disabled />
            <Button
              type="outline"
              :label="$t('Copy invite link')"
              @click="copyLink"
              class="mt-1"
              style="width: 100%"
              v-if="isValidInviteLink"
            />
            <Button
              type="outline"
              :label="$t('Update link')"
              @click="updateInvite"
              class="mt-1"
              style="width: 100%"
              v-else
            />
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Popover from '@/components/ui/Popover.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import UserItem from '@/components/common/UserItem.vue';
import Spinner from '@/components/common/Spinner.vue';

import { defineComponent, inject } from 'vue';
import { useChatData } from '@/composable';
//todo:принять, блокировать запрос в чат, удалять юзера
export default defineComponent({
  name: 'ChatInfo',
  components: { UserItem, Spinner, Button, Input, Popover },
  setup() {
    const {
      participants,
      requests,
      createInvite,
      currentChat,
      inviteLink,
      copyLink,
      isValidInviteLink,
      updateInvite,
      updateParticipant,
      imAdmin,
    } = useChatData();

    const socket = inject('socket');
    function isAdmin(userId: string) {
      return userId === currentChat.value?.admin.id;
    }

    function blockParticipant(participant_id: string | number) {
      updateParticipant({ participant_id, blocked: true });
    }

    return {
      participants,
      requests,
      createInvite,
      chat: currentChat,
      inviteLink,
      copyLink,
      isValidInviteLink,
      updateInvite,
      imAdmin,
      isAdmin,

      blockParticipant,
    };
  },
});
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
</style>
