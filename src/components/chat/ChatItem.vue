<template>
  <div class="chat-item">
    <template v-if="last_message">
      <div class="chat-item__header">
        <div class="chat-item__header-left">
          <el-avatar size="medium" :src="last_message.sender.avatar"></el-avatar>
          <div class="chat-item__header-info">
            <h3>{{ last_message.sender.nickname }}</h3>
            <p>last online 5 hours ago</p>
          </div>
        </div>
        <div class="chat-item__header-right">
          <p>3 days ago</p>
        </div>
      </div>
      <div class="chat-item__content">
        <div class="chat-item__content-text">
          <p>
            {{ last_message.text }}
          </p>
        </div>
        <div class="chat-item__content-unreaded">
          <p>2</p>
        </div>
      </div>
    </template>
    <template v-else>Click to start</template>
  </div>
</template>

<script lang="ts">
import Avatar from "../common/Avatar.vue";

import { defineComponent, PropType } from "vue";
import { IMessage } from "@/store/chat/types/message";
export default defineComponent({
  props: {
    last_message: {
      type: Object as PropType<IMessage>,
    },
    id: {
      type: String,
      required: true,
    },
  },
  components: { Avatar },
});
</script>

<style lang="scss" scoped>
.chat-item {
  background: #ffffff;
  border-radius: 6px;
  width: 100%;
  padding: 20px;
  cursor: pointer;
  margin: 0 0 20px;
  transition: $transition;

  &:hover {
    background: $background_blue_gradient;
    transition: $transition;

    .chat-item__header {
      p {
        color: #fff !important;
      }
    }

    .chat-item__content {
      &-text {
        color: #fff;
      }
    }
  }

  &.active {
    background: $background_blue_gradient;
    transition: $transition;

    .chat-item__header {
      p {
        color: #fff !important;
      }
    }

    .chat-item__content {
      &-text {
        color: #fff;
      }
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;

    &-left {
      display: flex;
      text-align: left;
      h3 {
        font-size: 14px;
        margin: 0 0 6px;
      }

      p {
        font-size: 10px;
        font-weight: 500;
        color: $color_blue;
      }
    }
    &-right {
      p {
        font-size: 10px;
        font-weight: 500;
        color: $color_gray;
        margin: 3px 0 0;
      }
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    margin: 10px 0 0;
    &-text {
      text-align: left;
      font-size: 12px;
      color: $color_gray;
      font-weight: 500;
      width: 90%;
      max-height: 46px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &-unreaded {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      overflow: hidden;
      background: #ff3366;
      color: #ffffff;
      box-shadow: 4px 4px 15px rgba(198, 27, 74, 0.05),
        2px 2px 10px rgba(198, 27, 74, 0.1),
        1px 1px 50px rgba(198, 27, 74, 0.15);

      p {
        font-size: 12px;
      }
    }
  }
}
</style>
