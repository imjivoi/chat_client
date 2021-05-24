<template>
  <div class="message" :class="{ messageMe: isMe }"
       @contextmenu.prevent="handleRightClick"
       ref="message">
    <div class="message__container">


      <div class="message__content"
           :style="{background: isPicked ? '#707c979e' : ''}">
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

              <img :src="baseUrl + '/'+i.file" alt=""
                   v-if="i.type.includes('image')"/>
              <AudioPlayer v-if="i.type.includes('audio') " :src="audioSrc"
                           :color="isMe ? '' :
            '#fff'"/>
            </li>
          </ul>
        </div>
        <div class="message__time">
          {{ updatedAt ? 'Updated  ' + updatedAt : createdAt }}
        </div>
      </div>
      <div class="message__user-avatar">
        <Avatar :image="messageData.sender.user.avatar "
                :nickname="messageData.sender.user.username"/>

      </div>
      <div class="message__readed">
        <transition name="fade">
          <i
            class="el-icon-check check"

            v-if="messageData.isReaded"
          ></i>
        </transition>


      </div>

    </div>
  </div>
</template>

<script lang="ts">
import AudioPlayer from "./AudioPlayer.vue"
import Modal from "../common/Modal.vue";
import {formatDistanceToNow} from "date-fns";
//@ts-ignore
import ClickOutside from "vue-click-outside";

import {computed, defineComponent, PropType, ref, toRefs} from "vue";
import {IMessage} from "@/store/chat/types/message";
import Avatar from "@/components/ui/Avatar.vue";

export default defineComponent({
  name: 'Message',
  components: {Avatar, Modal, AudioPlayer},
  props: {
    messageData: {
      type: Object as PropType<IMessage>,
      required: true,
    },
    isMe: {
      type: Boolean,
      required: true,
      default: false,
    },
    isPicked: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    pickMsg: null
  },
  setup(props, {emit}) {

    const {messageData, isMe} = toRefs(props)
    const message = ref<HTMLElement | null>()
    const activeMessageOptions = ref(false);

    const hasAttachment = computed(() => messageData.value.attachment &&
      messageData.value.attachment.content.length)
    const attachments = computed(() => messageData.value?.attachment?.content)
    const audioSrc = computed(() => {
      const file = attachments.value?.find((item: any) => item.type === 'audio')
      return file?.file?.replace('audio', 'audio/webm')
    })


    const baseUrl = process.env.VUE_APP_BASE_URL;

    const createdAt = formatDistanceToNow(new Date(messageData.value.createdAt));
    const updatedAt = computed(() => messageData.value.updatedAt &&
      formatDistanceToNow(new Date(messageData.value!.updatedAt!)))

    function hideMessageOptions() {
      activeMessageOptions.value = false;
    }

    function handleRightClick() {
      if (isMe.value) {
        emit('pickMsg', messageData.value)
      }
    }


    return {
      activeMessageOptions,
      baseUrl,
      createdAt,
      hideMessageOptions,
      hasAttachment,
      audioSrc,
      attachments,
      message,
      handleRightClick,
      updatedAt,
    };
  },


  directives: {
    ClickOutside,
  },
});
</script>

<style scoped lang="scss">
.message {

  &__container {
    margin: 0 auto 50px 0;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    width: fit-content;
    max-width: 80%;
    position: relative;

  }

  &.messageMe {

    .message__container {
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
          right: 0;
          left: auto;
        }
      }

      .message__user-avatar {
        display: none;
      }

      .message__readed {
        left: -25px;
        right: auto;

        .double-check {
          right: 0;
        }

        .check {
          right: 0;
        }
      }

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
    left: 5px;

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
    right: -25px;
    bottom: 0;

    .check, .double-check {
      color: $primary;
      position: relative;

    }

    .double-check {
      right: -12px;
    }
  }
}
</style>
