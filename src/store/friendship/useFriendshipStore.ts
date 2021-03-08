import friendsAPI from "@/utils/api/friendsAPI";
import { defineStore } from "pinia";

export const useFriendshipStore = defineStore({
  id: "friendship",
  state: () => ({
    isLoading: false,
    accepted: [],
    denied: [],
    requested: [],
  }),
  actions: {
    CREATE(toUser: string) {
      return new Promise(async (resolve, reject) => {
        this.isLoading = true;
        try {
          const { data } = await friendsAPI.create(toUser);
          this.requested = data;
          resolve(data);
        } catch (error) {
          reject(error);
        }
        this.isLoading = false;
      });
    },
    GET_ALL() {
      return new Promise(async (resolve, reject) => {
        this.isLoading = true;
        try {
          const { data } = await friendsAPI.getAll();
          this.$patch({
            accepted: data.accepted,
            requested: data.requested,
            denied: data.denied,
          });
          resolve(data);
        } catch (error) {
          reject(error);
        }

        this.isLoading = false;
      });
    },
  },
});
