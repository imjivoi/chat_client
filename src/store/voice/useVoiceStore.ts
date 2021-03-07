import { defineStore } from "pinia";
import { state } from "./state";
export const useVoiceStore = defineStore({
  id: "voice",
  state: () => state,
});
