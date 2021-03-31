import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import ('@/views/Welcome.vue'),
    meta: {layout: 'Empty'}
  },
  {
    path: "/app",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {title: "Home", layout: "Main"},
  },
  {
    path: "/app/chats/",
    name: "Chats",
    meta: {title: "Chats", layout: "Main"},

    component: () => import("../views/Chats.vue"),
    children: [
      {
        path: "/app/chats/",
        name: "ChatItems",
        component: () => import("@/components/chat/ChatItems.vue")
      },
      {
        path: "/app/chats/:id",
        name: "Chat",
        component: () => import("../views/Chat.vue"),
      },
    ],
  },
  {
    path: "/app/voices",
    name: "Voices",
    meta: {title: "Voices", layout: "Main"},
    component: () => import("@/views/Voices.vue"),
  },
  {
    path: '/app/settings',
    name: 'Settings',
    meta: {title: 'Settings', layout: 'Main'},
    component: () => import ('@/views/Settings.vue')
  },
  {
    path: "/auth",
    component: () => import("../views/auth/Auth.vue"),
    name: "Auth",
    redirect: (to) => {
      return {path: "/auth/login/"};
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
