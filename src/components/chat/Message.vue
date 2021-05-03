<template>
  <div class="message" :class="{ messageMe: isMe }">
    <div class="message__options" v-click-outside="hideMessageOptions">
      <!-- <vs-button
        icon
        shadow
        @click="activeMessageOptions = !activeMessageOptions"
        ><i class="bx bx-dots-horizontal-rounded"></i
      ></vs-button> -->
      <transition name="fade-bottom">
        <Modal
          v-if="activeMessageOptions"
          :style="[isMe ? { left: '-200px' } : { right: '-200px' }]"
        >
          <ul class="options__list">
            <li @click="deleteMessage">delete</li>
          </ul>
        </Modal>
      </transition>
    </div>

    <div class="message__content">
      <div
        class="message__text"
        :style="hasAttachment ? `margin-bottom:10px` :
         ''"
        v-if="messageData.text"
      >
        <p>{{ messageData.text }}</p>
      </div>
      <div class="message__attachments" v-if="hasAttachment ">
        <ul>
          <li v-for="i in attachments" :key="i">

            <img :src="baseUrl + '/attachments/'+i.file" alt=""
                 v-if="i.type.includes('image')"/>
            <audio controls="controls" v-if="i.type.includes('audio') ">
              <source :src="audioSrc"/>
              Your browser doesn't support <code>audio</code>.
            </audio>
          </li>
        </ul>
      </div>
      <div class="message__time">
        {{ createdAt }}
      </div>
    </div>
    <div class="message__user-avatar">
      <el-avatar :src="messageData.sender.avatar ?? ''"></el-avatar>
    </div>
    <div class="message__readed">
      <i
        class="bx bx-check-double"
        style="font-size: 20px"
        v-if="messageData.isReaded"
      ></i>

      <i class="bx bx-check" style="font-size: 20px" v-else></i>
    </div>
  </div>
</template>

<script lang="ts">
import Modal from "../common/Modal.vue";

import {formatDistanceToNow} from "date-fns";
//@ts-ignore
import ClickOutside from "vue-click-outside";

import {computed, defineComponent, ref} from "vue";

export default defineComponent({
  components: {Modal},
  props: {
    messageData: {
      type: Object,
      required: true,
    },
    isMe: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  setup(props, ctx) {
    const activeMessageOptions = ref(false);
    const hasAttachment = computed(() => props.messageData.attachment &&
      props.messageData.attachment.content.length)
    const attachments = computed(() => props.messageData.attachment.content)
    const audioSrc = computed(() => {
      const file = attachments.value.find((item: any) => item.type === 'audio')
      return file.file.replace('audio', 'audio/webm')
    })

    const baseUrl = process.env.VUE_APP_BASE_URL;

    const createdAt = computed(() =>
      formatDistanceToNow(new Date(props.messageData.createdAt))
    );

    function hideMessageOptions() {
      activeMessageOptions.value = false;
    }

    return {
      activeMessageOptions,
      baseUrl,
      createdAt,
      hideMessageOptions, hasAttachment, audioSrc, attachments
    };
  },


  directives: {
    ClickOutside,
  },
});
</script>

<style scoped lang="scss">
.message {
  margin: 0 auto 50px 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: fit-content;
  max-width: 80%;
  position: relative;

  &.messageMe {
    margin: 0 30px 35px auto;
    flex-direction: row;

    .message__content {
      background: #fff;
      margin-left: 0;
      border-radius: 10px;
      border-bottom-right-radius: 0;
      box-shadow: 1px 1px 6px 0px #9e9e9e;

      .message__text {
        color: $color_gray3;
      }

      .message__time {
        position: absolute;
        text-align: left;
        bottom: -20px;
        left: 0;
      }
    }

    .message__user-avatar {
      display: none;
    }

    .message__readed {
      left: 17px;
      right: auto;
    }
  }

  &__options {
    .options__list {
      li {
        cursor: pointer;
      }
    }
  }

  &__content {
    background: $background_blue_gradient;
    margin-left: 40px;
    padding: 15px 20px;
    border-radius: 10px;
    border-bottom-left-radius: 0;
    color: #fff;
    box-shadow: 10px 10px 25px rgba(42, 139, 242, 0.1),
    15px 15px 35px rgba(42, 139, 242, 0.05),
    10px 10px 50px rgba(42, 139, 242, 0.1); // max-width: 90%;
    position: relative;
  }

  &__attachments {
    width: fit-content;
    position: relative;
    overflow: hidden;

    ul {
      display: flex;
      flex-wrap: wrap;
      width: fit-content;
      position: relative;

      li {
        width: 100%;
        max-width: 250px;
        margin: 0 10px 10px 0;

        &:last-child {
          margin: 0;
        }

        audio {
          max-width: 300px;

          &:focus {
            outline: none;
          }
        }

        img {
          width: 100%;
          max-width: 250px;
          display: flex;
        }
      }
    }
  }

  &__text {
    text-align: left;
    font-size: 0.8em;
    font-weight: 500;
    overflow-wrap: break-word;
    width: fit-content;
  }

  &__time {
    font-size: 0.6em;
    font-weight: 500;
    color: #9e9e9e;
    margin: 5px 0 0;
    text-align: right;
    bottom: -20px;
    right: 0;
    position: absolute;
    width: max-content;
  }

  &__user-avatar {
    position: absolute;
    bottom: -25px;
    left: 0;
  }

  &__readed {
    position: absolute;
    right: 17px;
    bottom: -10px;
  }
}
</style>
