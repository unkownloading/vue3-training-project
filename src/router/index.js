import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Form from "@/views/FormPage.vue";
import Chat from "@/views/ChatPage.vue";
import User from "@/views/UserPage.vue";
import Api from "@/views/ApiPage.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/about", name: "about", component: About },
  { path: "/chat", name: "chat", component: Chat },
  { path: "/form", name: "form", component: Form },
  { path: "/user", name: "user", component: User },
  { path: "/api", name: "api", component: Api },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;