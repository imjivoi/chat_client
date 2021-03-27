<template>
  <transition name="fade">
    <div v-show="isActiveModal" class="modal">
      <div id="modal-content">
        <div class="header">
          <el-button
            circle
            icon="el-icon-close"
            type="text"
            @click="hideModal"
          ></el-button>
        </div>
        <component :is="acitveComponent"/>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Chat from "@/components/chat/CreateChat.vue"
import Voice from "@/components/voice/CreateVoice.vue";
import {useModal} from "@/store";

import {computed, defineComponent, inject} from "vue";

export default defineComponent({
  name: "Modal",
  components: {Voice, Chat},
  setup() {
    const modal = useModal();
    const acitveComponent = computed(() => modal.type);
    const hideModal = () => {
      modal.HIDE();
    };
    return {
      acitveComponent,
      hideModal,
      isActiveModal: computed(() => modal.isActive),
    };
  },
});
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;

  #modal-content {
    min-width: 30%;
    max-width: 300px;
    box-shadow: $box_shadow;
    @include block_mixin;

    .header {
      text-align: right;
    }
  }
}
</style>
