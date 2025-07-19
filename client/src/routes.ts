import { createRouter, createWebHistory } from "vue-router";

import { CLIENT_PATH } from "@shared/constants/url";
import HomePage from "@/pages/home/page.vue";
import SignInPage from "@/pages/auth/sign-in/page.vue";
import SignUpPage from "@/pages/auth/sign-up/page.vue";
import NotFoundPage from "@/pages/not-found/page.vue";

const routes = [
  {
    path: CLIENT_PATH(),
    name: "Home",
    component: HomePage,
  },
  {
    path: CLIENT_PATH(["auth", "sign-in"]),
    name: "SignIn",
    component: SignInPage,
  },
  {
    path: CLIENT_PATH(["auth", "sign-up"]),
    name: "SignUp",
    component: SignUpPage,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(CLIENT_PATH()),
  routes,
});

export default router;
