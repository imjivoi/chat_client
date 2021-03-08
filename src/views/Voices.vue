<template>
  <!-- <div class="header">
    <el-button type="primary" icon="el-icon-plus" @click="showModal"
      >Create new
    </el-button>
  </div>
  <div class="voice-list">
    <ul>
      <li
        v-for="voice in voiceLsit"
        :key="voice._id"
        @click="joinVoice(voice._id)"
      >
        <div>
          <p>{{ voice.name }}</p>
        </div>
        <el-button type="text" size="medium">Join</el-button>
      </li>
    </ul>
  </div>
  <Audio :peer="peer" v-for="(peer, index) in peers" :key="index" /> -->
  <div>Page are in progress</div>
</template>

<script lang="ts">
import Audio from "@/components/voice/Audio.vue";
import { useModal } from "@/store/";
import useVoice from "@/composition-api/useGroupVoice";
import { useVoiceStore } from "@/store";
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref,
} from "vue";
export default defineComponent({
  name: "Voices",
  components: { Audio },
  setup() {},
});
</script>
<style lang="scss" scoped>
.header {
  text-align: right;
  margin: 0 0 15px;
}
.voice-list {
  font-size: 20px;

  ul {
    display: flex;

    li {
      padding: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.4s;
      border-radius: 10px;
      margin: 5px;
      width: 120px;
      height: 120px;
      background: #fff;

      &:hover {
        transition: all 0.4s;
        box-shadow: $box_shadow;
        .el-button {
          opacity: 1;
          transition: 1s;
        }
      }

      .el-button {
        opacity: 0;
        transition: 1s;
      }
    }
  }
}
</style>
