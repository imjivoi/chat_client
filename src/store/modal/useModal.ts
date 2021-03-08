import { computed, ref } from "vue";
import { defineStore } from "pinia";

type DialogType = "Voice" | "Chat";

export const useModal = defineStore({
  id: "modal",
  state: () => ({
    type: "" as DialogType,
    isActive: false,
  }),
  actions: {
    SHOW(modalType: DialogType) {
      this.type = modalType;
      this.isActive = true;
    },
    HIDE() {
      this.isActive = false;
    },
  },
});
