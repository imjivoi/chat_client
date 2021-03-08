import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { state } from "../store/auth/state";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { title: "Home", layout: "Main" },
  },
  {
    path: "/chats/",
    name: "Chats",
    meta: { title: "Chats", layout: "Main" },

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
    path: "/voices",
    name: "Voices",
    meta: { title: "Voices", layout: "Main" },
    component: () => import("@/views/Voices.vue"),
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

export default router;
