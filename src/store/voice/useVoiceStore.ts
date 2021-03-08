import voiceAPI from "@/utils/api/voiceAPI";
import { defineStore } from "pinia";
import { state } from "./state";
export const useVoiceStore = defineStore({
  id: "voice",
  state: () => state,
  actions: {
    async GET_VOICES() {
      this.isLoading = true;
      try {
        const { data } = await voiceAPI.getAll();
        this.voices = data;
      } catch (error) {}
      this.isLoading = false;
    },
    CREATE_VOICE(name: string) {
      return new Promise(async (resolve, reject) => {
        this.isLoading = true;

        try {
          const { data } = await voiceAPI.create(name);
          this.voices = [...this.voices, data];
          resolve(data);
        } catch (error) {
          reject(error);
        }
        this.isLoading = false;
      });
    },
  },
});
