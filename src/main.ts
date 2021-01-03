import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { VueCookieNext } from "vue-cookie-next";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import App from "./App.vue";
import router from "./router";
import { store } from "./store";

createApp(App)
  .use(PrimeVue, { ripple: true }) //@ts-ignore
  .use(VueCookieNext)
  .use(store)
  .use(router)
  .mount("#app");
