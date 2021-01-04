import { store } from "@/store";
import { state } from "@/store/modules/auth/state";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/chats/",
        name: "Chats",
        component: () => import("../views/Chats.vue"),
      },
      {
        path: "/friends/",
        name: "Friends",
        component: () => import("../views/Friends.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("../views/auth/Auth.vue"),
    name: "Auth",
    children: [
      {
        path: "/auth/login/",
        name: "Login",
        component: () => import("../views/auth/Login.vue"),
      },
      {
        path: "/auth/signup/",
        name: "Signup",

        component: () => import("../views/auth/Signup.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !state.isLogged) {
    store
      .dispatch("GET_USER_DATA")
      .then((res) => next())
      .catch((e) => next({ name: "Login" }));
  } else if (to.name === "Login" || (to.name === "Signup" && state.isLogged)) {
    next("/");
  } else if (to.name === "Auth") {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
