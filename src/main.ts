import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { VueCookieNext } from "vue-cookie-next";
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import ErrorService from "./services/errorService";

const app = createApp(App);
app
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
