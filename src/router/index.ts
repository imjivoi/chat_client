import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

const Home = () => import("../views/Home.vue");
const Chats = () => import("../views/Chats.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/chats/",
        component: Chats,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),

  routes,
});

export default router;
