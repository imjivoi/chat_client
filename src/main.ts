import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { VueCookieNext } from "vue-cookie-next";
import Toast from "vue-toastification";
import SocketIO from "@/plugins/scoektIO";

import "vue-toastification/dist/index.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import ErrorService from "./services/errorService";
import { AllMutationTypes } from "./store/types/mutations.types";

const app = createApp(App);

const token = VueCookieNext.getCookie("accessToken");
if (token) store.commit(AllMutationTypes.SET_LOGGED, true);

app.directive("click-outside", {
  beforeMount(el, binding, vnode) {
    el.clickOutsideEvent = function(event: any) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

app
  .use(SocketIO, {
    connection: "http://localhost:8000",
    options: {},
  })
  .use(Toast, {
    transition: "Vue-Toastification__fade",
    maxToasts: 8,
    newestOnTop: true,
  })
  .use(PrimeVue) //@ts-ignore
  .use(VueCookieNext)
  .use(store)
  .use(router)
  .mount("#app");

app.config.errorHandler = (error) => ErrorService.onError(error);
