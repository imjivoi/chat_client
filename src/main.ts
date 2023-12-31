//libraries
import { createApp } from 'vue';
import { VueCookieNext } from 'vue-cookie-next';
import Toast from 'vue-toastification';
import { createPinia } from 'pinia';
import { i18n } from '@/resource/i18n';
//styles
import 'vue-toastification/dist/index.css';
import '@/styles/main.scss';

//modules
import App from './App.vue';
import router from './router';
import { useUserStore } from './store/';
import { setAuthHeader } from './plugins/axios';
import ErrorService from '@/services/errorService';

const app = createApp(App);

app.directive('click-outside', {
  beforeMount(el, binding, vnode) {
    el.clickOutsideEvent = function(event: any) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
});

app
  .use(Toast, {
    transition: 'Vue-Toastification__fade',
    maxToasts: 5,
    newestOnTop: true,
  })
  .use(i18n)
  .use(createPinia())
  .use(router);

//check jwt token
const auth = useUserStore();
const token = localStorage.getItem('accessToken');
if (token) {
  auth.$state.isLogged = true;
  setAuthHeader(token);
}

router.beforeEach((to, from, next) => {
  if (to.path.includes('app') && !auth.isLogged) {
    next({ name: 'Login', query: { next: to.path } });
    return;
  }
  if (to.path === '/' && auth.isLogged) {
    next('/app');
    return;
  }

  next();
});
app.config.errorHandler = error => ErrorService.onError(error);

app.mount('#app');
