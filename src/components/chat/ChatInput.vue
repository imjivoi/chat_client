<template>
  <div class="input-block">
    <Btn
      icon="smiling-face"
      style="position: absolute; left: 5px; bottom: 7px"
    />
    <Btn
      icon="attach-2-outline"
      style="position: absolute; left: 35px; bottom: 7px"
    />

    <textarea type="text" placeholder="Type your message" v-model="text" />
    <Btn
      outline
      label="Send"
      style="position: absolute; right: 5px; bottom: 7px"
      v-if="text.length"
    />
    <Btn
      icon="mic"
      style="position: absolute; right: 5px; bottom: 7px"
      v-else
    />
  </div>
</template>

<script>
import Btn from "../Button";

export default {
  components: { Btn },
  data: () => ({
    text: "",
  }),
};
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

    ::-webkit-scrollbar {
      display: none !important;
    }
    &:active,
    &:focus {
      outline: none;
    }

    &:focus {
      transition: 0.2s;
      box-shadow: 0 0 10px 1px rgb(184, 184, 184);
    }
  }
}
</style>