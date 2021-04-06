<template>
  <div class="info">
    <h4>Participants</h4>
    <ul class="participant-list">
      <li v-for="participant in chat.participants">
        {{ participant.user.username }}
      </li>
    </ul>
    <div class="invite">
      <h4>Invite</h4>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from "vue"
import {useChatStore} from "../../store";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "ChatInfo",
  setup() {
    const route = useRoute()
    const chatStore = useChatStore()
    const chat = computed(() => chatStore.list.find(chat => chat._id === route.params.id))

    function createInvite() {
      //TODO:доделать создание и вывод инвайта

      chatStore.CREATE_INVITE()
    }

    onMounted(() => {
      if (chat.value && !chat.value.invite) {
        chatStore.GET_INVITE(route.params.id)
      }
    })
    return {
      chat
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
  }
}

.invite {
  position: absolute;
  bottom: 0;
  left: 20px;
  height: 150px;
  width: 100%;
}

</style>
