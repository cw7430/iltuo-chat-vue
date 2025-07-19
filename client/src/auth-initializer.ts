import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { CLIENT_PATH } from "@shared/constants/url";

export const InitializeAuth = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const hasAccessToken = document.cookie
    .split("; ")
    .some((cookie) => cookie.startsWith("accessToken="));

  if (hasAccessToken) {
    authStore.signIn();
    router.push(CLIENT_PATH());
  } else {
    authStore.signOut();
    router.push(CLIENT_PATH(["auth", "sign-in"]));
  }
};
