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
    meta: {title: "Chats", layout: "Main"},
    component: () => import("../views/Chats.vue"),
    children: [
      {
        path: "/app/chats/",
        name: "Chats",
        meta: {title: "Chats", layout: "Main", back: true},

        component: () => import("@/components/chat/ChatItems.vue")
      },
      {
        path: "/app/chats/:id",
        name: "Chat",
        component: () => import("../views/Chat.vue"),
        meta: {back: true, title: ''}
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
    path: '/app/invite/:key',
    name: 'Invite',
    meta: {title: 'Invite', layout: 'Main'},
    component: () => import('@/views/Invite.vue')
  },
  {
    path: '/error',
    name: 'Error',
    meta: {layout: 'Empty'},
    component: () => import('@/views/Error.vue')
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
