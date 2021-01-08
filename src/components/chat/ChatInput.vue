<template>
  <div class="input-block">
    <Btn style="position: absolute; left: 5px; bottom: 7px">
      <template v-slot:icon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g id="Layer_2" data-name="Layer 2">
            <g id="smiling-face">
              <g id="smiling-face" data-name="smiling-face">
                <rect width="24" height="24" opacity="0" />
                <path
                  d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm5 9a5 5 0 0 1-10 0z"
                  id="🎨-Icon-Сolor"
                />
              </g>
            </g>
          </g></svg
      ></template>
    </Btn>
    <Btn style="position: absolute; left: 35px; bottom: 7px">
      <template v-slot:icon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g data-name="Layer 2">
            <g data-name="attach">
              <rect width="24" height="24" opacity="0" />
              <path
                d="M9.29 21a6.23 6.23 0 0 1-4.43-1.88 6 6 0 0 1-.22-8.49L12 3.2A4.11 4.11 0 0 1 15 2a4.48 4.48 0 0 1 3.19 1.35 4.36 4.36 0 0 1 .15 6.13l-7.4 7.43a2.54 2.54 0 0 1-1.81.75 2.72 2.72 0 0 1-1.95-.82 2.68 2.68 0 0 1-.08-3.77l6.83-6.86a1 1 0 0 1 1.37 1.41l-6.83 6.86a.68.68 0 0 0 .08.95.78.78 0 0 0 .53.23.56.56 0 0 0 .4-.16l7.39-7.43a2.36 2.36 0 0 0-.15-3.31 2.38 2.38 0 0 0-3.27-.15L6.06 12a4 4 0 0 0 .22 5.67 4.22 4.22 0 0 0 3 1.29 3.67 3.67 0 0 0 2.61-1.06l7.39-7.43a1 1 0 1 1 1.42 1.41l-7.39 7.43A5.65 5.65 0 0 1 9.29 21z"
              />
            </g>
          </g></svg
      ></template>
    </Btn>

    <textarea placeholder="Type your message" v-model="message" />
    <Btn
      outline
      label="Send"
      style="position: absolute; right: 5px; bottom: 7px"
      v-if="message"
      @click="sendMessage($event, chatId)"
    />
    <Btn style="position: absolute; right: 5px; bottom: 7px" v-else>
      <template v-slot:icon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g data-name="Layer 2">
            <g data-name="mic">
              <rect width="24" height="24" opacity="0" />
              <path
                d="M12 15a4 4 0 0 0 4-4V6a4 4 0 0 0-8 0v5a4 4 0 0 0 4 4zm-2-9a2 2 0 0 1 4 0v5a2 2 0 0 1-4 0z"
              />
              <path
                d="M19 11a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H8.89a.89.89 0 0 0-.89.89v.22a.89.89 0 0 0 .89.89h6.22a.89.89 0 0 0 .89-.89v-.22a.89.89 0 0 0-.89-.89H13v-2.08A7 7 0 0 0 19 11z"
              />
            </g>
          </g>
        </svg>
      </template>
    </Btn>
  </div>
</template>

<script lang='ts'>
import Btn from "../Button.vue";

//@ts-ignore
import { computed, defineComponent, inject, PropType, ref, watch } from "vue";
import useChatinput from "@/composition-api/useChatInput";
import { AllActionTypes } from "@/store/types/actions.types";
import { ChatSocketEvents } from "@/store/interfaces/chat";
import { IUserData } from "@/store/interfaces/user";
export default defineComponent({
  props: {
    chatId: {
      type: String,
      required: true,
    },
    user: {
      type: Object as PropType<IUserData>,
      required: true,
    },
  },

  components: { Btn },
  setup({ chatId, user }, ctx) {
    const {
      sendMessage,
      sendTyping,
      setAttachments,
      message,
      attachments,
      timeout,
      typing,
    } = useChatinput(inject("socket"));

    watch(message, () => {
      message.value === "" ? (message.value = null) : message.value;
      clearInterval(timeout.value);
      if (!typing.value) {
        sendTyping(true, chatId, user?.id);
      }

      typing.value = true;
      timeout.value = setTimeout(() => {
        typing.value = false;
        sendTyping(false, chatId, user?.id);
      }, 3000);
    });
    return {
      sendMessage,
      setAttachments,
      message,
    };
  },
});
</script>

<style scoped lang='scss'>
.input-block {
  position: absolute;
  bottom: 10px;
  width: 97%;
  display: flex;
  justify-content: space-between;

  textarea {
    text-align: left;
    resize: none;
    width: 100%;
    height: 50px;
    border: none;
    box-shadow: 0 0 0 1px rgb(184, 184, 184);
    padding: 10px 90px 10px 84px;
    border-radius: 5px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    transition: 0.2s;
    color: #000;
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow: hidden;
    border: 1px solid #ced4da;

    ::-webkit-scrollbar {
      display: none !important;
    }
    &:active,
    &:focus {
      outline: none;
    }

    &:focus {
      transition: 0.2s;
      box-shadow: 0 0 0 0.2rem #a6d5fa;
      border-color: #2196f3;
    }
  }
}
</style>