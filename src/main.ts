import { createApp } from "vue";
import PrimeVue from "primevue/config";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import App from "./App.vue";
import router from "./router";
import { store } from "./store";

createApp(App)
  .use(PrimeVue, { ripple: true })
  .use(store)
  .use(router)
  .mount("#app");
