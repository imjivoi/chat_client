//libraries
import {createApp} from "vue";
import {VueCookieNext} from "vue-cookie-next";
import Toast from "vue-toastification";
import ElementPlus from "element-plus";
import {createPinia} from "pinia"; //@ts-ignore
import {i18n} from "@/resource/i18n";

//styles
import "element-plus/lib/theme-chalk/index.css";
import "vue-toastification/dist/index.css";
import "@/styles/main.scss";

//modules
import App from "./App.vue";
import router from "./router";
import ErrorService from "./services/errorService";
import {useAuthStore} from "./store/";
import {setAuthHeader} from "./utils/axios"

const app = createApp(App);

app.directive("click-outside", {
  beforeMount(el, binding, vnode) {
    el.clickOutsideEvent = function (event: any) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  }
});

app
  .use(Toast, {
    transition: "Vue-Toastification__fade",
    maxToasts: 5,
    newestOnTop: true
  })
  .use(i18n)
  .use(ElementPlus)
  .use(createPinia())
  .use(router);

//check jwt token
const auth = useAuthStore();
const token = VueCookieNext.getCookie("accessToken");
if (token) {
  auth.$state.isLogged = true;
  setAuthHeader(token);
}

router.beforeEach((to, from, next) => {
  if (to.path.includes('app') && !auth.isLogged) {
    next({name: "Welcome"})
  } else next();
});

app.mount("#app");

app.config.errorHandler = error => ErrorService.onError(error);
