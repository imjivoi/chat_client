<template>
  <li class="chat-item">
    <div class="chat-item__header">
      <div class="chat-item__header-left">
        <div class="chat-item__header-info">
          <h3>{{ name }}</h3>
          <!--            <p> </p>-->
        </div>
      </div>
      <div class="chat-item__header-right">
        <p>Created:{{ createdAt }}</p>
      </div>
    </div>
    <div class="chat-item__participants">
      <p>Participants : {{ participants.length }}</p>
      <!--      <template v-for="participant in participants" :key="participant._id">-->
      <!--        <el-avatar :src="participant.user.avatar" ></el-avatar>-->

      <!--      </template>-->
    </div>
  </li>
</template>

<script lang="ts">

import {format} from "date-fns";
import {defineComponent, PropType} from "vue";
import {IParticipant} from "@/store/chat/types/chat";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    created: {
      type: String,
      required: true
    },
    participants: {
      type: Array as PropType<IParticipant[]>
    }
  },
  computed: {
    createdAt(): string {
      return format(new Date(this.created), 'P')
    }
  }
});
</script>

<style lang="scss" scoped>
.chat-item {
  background: #ffffff;
  border-radius: 6px;
  width: 100%;
  padding: 15px;
  cursor: pointer;
  transition: $transition;
  overflow: hidden;

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

  &__participants {
    position: relative;
    display: flex;
  }
}

.el-avatar {
  position: relative;

  &:not(:first-child) {
    //right: ;
  }
}
</style>
