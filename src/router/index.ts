import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/chats/",
        component: () => import("../views/Chats.vue"),
      },
      {
        path: "/friends/",
        component: () => import("../views/Friends.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("../views/auth/Auth.vue"),
    children: [
      {
        path: "/auth/login/",
        component: () => import("../views/auth/Login.vue"),
      },
      {
        path: "/auth/signup/",
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
