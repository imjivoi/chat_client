<template>
  <div class="chat-item">
    <div class="chat-item__header">
      <div class="chat-item__header-left">
        <div class="chat-item__header-info">
          <h3>{{ name }}</h3>
        </div>
      </div>
      <div class="chat-item__header-right">
        <p>{{ $t('Created:') }}{{ createdAt }}</p>
      </div>
    </div>
    <div class="last-message">
      <template v-if="lastMessage && lastMessage.sender">
        <Avatar
          :image="lastMessage.sender.user.avatar"
          :nickname="lastMessage.sender.user.nickname"
        />
        <p>{{ lastMessage.text }}</p>
      </template>
      <template v-else>{{ $t('This chat has no message yet') }}</template>
    </div>
    <!-- <div class="chat-item__participants">
      <div
        class="chat-item__participant"
        v-for="participant in firstParticipants"
        :key="participant.id"
      >
        <Avatar :image="participant.user.avatar" :nickname="participant.user.username" />
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { format } from 'date-fns';
import { defineComponent, PropType } from 'vue';
import { IParticipant } from '@/store/chat/types/chat';
import Avatar from '@/components/ui/Avatar.vue';
import { IMessage } from '@/store/chat/types/message';

export default defineComponent({
  components: { Avatar },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
    },
    created: {
      type: String,
      required: true,
    },
    participants: {
      type: Array as PropType<IParticipant[]>,
      default: [],
    },
    lastMessage: {
      type: Object as PropType<IMessage>,
      required: false,
    },
  },

  computed: {
    createdAt(): string {
      return format(new Date(this.created), 'P');
    },
    firstParticipants(): IParticipant[] | [] {
      return this.participants?.filter((participant, idx) => idx !== 4);
    },
  },
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
  max-width: 300px;
  min-height: 86.8px;

  &:hover {
    //background: $color_blue;
    transition: $transition;
    box-shadow: $box_shadow;

    //.chat-item__header {
    //  p {
    //    color: #fff !important;
    //  }
    //}

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
        max-width: 130px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      p {
        font-size: 10px;
        font-weight: 500;
        color: $primary;
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

  &__participant {
    margin: 0 10px 0 0;

    &:last-child {
      margin: 0;
    }
    p {
      max-width: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.last-message {
  display: flex;
  align-items: center;
  .avatar {
    margin: 0 10px 0 0;
  }
  p {
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
