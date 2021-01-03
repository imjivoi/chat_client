<template>
  <router-link to="">
    <li class="p-mb-2">
      <Badge color="#1ee952">
        <template v-slot:content
          ><Avatar label="P" class="p-avatar-circle"
        /></template>
      </Badge>
      <div class="chat__info">
        <div class="chat__name p-text-bold p-text-left">User bla bla</div>
        <div class="chat__last-message">
          <MessageText
            messageText="dfgdsfgsdfg dsfgsdfgdsfgdsf g gsfgdf gdfg sdfgdfgsdfg"
          />
        </div>
      </div>
      <Badge value="2" :fontSize="0.7" :size="15" />
    </li>
  </router-link>
</template>

<script lang='ts'>
import MessageText from "./MessageText";
import Badge from "../Badge.vue";

import Avatar from "primevue/avatar";

import { defineComponent } from "vue";
export default defineComponent({
  components: { Avatar, Badge, MessageText },
  props: ["item"],
});
</script>

<style scoped lang='scss'>
li {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #bab4cf;
  }
  .active {
    background: #bab4cf;
  }

  .chat__info {
    width: 70%;
  }

  .chat__name {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    width: 90%;
    font-size: 0.9em;
  }

  .chat__last-message {
    text-align: left;
    font-size: 0.8em;

    p {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      width: 90%;
    }
  }
}
</style>