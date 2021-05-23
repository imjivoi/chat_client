import friendsAPI from "@/services/api/friendsAPI";
import {defineStore} from "pinia";

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
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        friendsAPI.create(toUser)
          .then(({data}) => {
            this.requested = data;
            resolve(data);

          })
          .catch((error) => reject(error)
          );
        this.isLoading = false;
      });
    },
    GET_ALL() {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        friendsAPI.getAll()
          .then(({data}) => {
            this.$patch({
              accepted: data.accepted,
              requested: data.requested,
              denied: data.denied,
            });
            resolve(data);

          })
          .catch((error) => reject(error)
          );

        this.isLoading = false;
      });
    },
  },
});
