import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { state } from "../store/modules/auth/state";

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
        children: [
          {
            path: "/chats/:id",
            name: "Chat",
            component: () => import("../views/Chat.vue"),
          },
        ],
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
    redirect: (to) => {
      return { path: "/auth/login/" };
    },
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

router.beforeResolve((to, from, next) => {
  if (!to.path.includes("auth") && !state.isLogged) next({ name: "Login" });
  else next();
});

export default router;
