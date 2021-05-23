<template>
  <div class="chat-item">
    <div class="chat-item__header">
      <div class="chat-item__header-left">
        <div class="chat-item__header-info">
          <h3>{{ name }}</h3>
        </div>
      </div>
      <div class="chat-item__header-right">
        <p>Created:{{ createdAt }}</p>
      </div>
    </div>
    <div class="chat-item__participants">
      <div class="chat-item__participant"
           v-for="participant in firstParticipants"
           :key="participant._id">
        <Avatar :image="participant.user.avatar"
                :nickname="participant.user.username"/>
        <p>{{ participant.user.username }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">


import {format} from "date-fns";
import {defineComponent, PropType} from "vue";
import {IParticipant} from "@/store/chat/types/chat";
import Avatar from "@/components/ui/Avatar.vue";

export default defineComponent({
  components: {Avatar},
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
      type: Array as PropType<IParticipant[]>,
      default: []
    }
  },

  computed: {
    createdAt(): string {
      return format(new Date(this.created), 'P')
    },
    firstParticipants(): IParticipant[] | [] {
      return this.participants?.filter((participant, idx) => idx !== 4)
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
  max-width: 300px;
  margin: 0 10px 10px 0;

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

  &__participant {
    margin: 0 10px 0 0;

    &:last-child {
      margin: 0;
    }
  }
}

.el-avatar {
  position: relative;

  &:not(:first-child) {
    //right: ;
  }
}
</style>
