//libraries
import {createApp} from "vue";
import {VueCookieNext} from "vue-cookie-next";
import Toast from "vue-toastification";
import {createPinia} from "pinia";
import {i18n} from "@/resource/i18n";
//styles
import "vue-toastification/dist/index.css";
import "@/styles/main.scss";

//modules
import App from "./App.vue";
import router from "./router";
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
  } else if (to.path === '/' && auth.isLogged) {
    next('/app')
  } else {
    next()
  }
  ;
});
// app.config.errorHandler = error => ErrorService.onError(error);

app.mount("#app");

