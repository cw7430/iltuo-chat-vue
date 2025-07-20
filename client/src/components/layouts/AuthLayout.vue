<script lang="ts">
import type { PropType } from "vue";
import { BCard, BCardBody, BButton } from "bootstrap-vue-next";
import { Heart } from "lucide-vue-next";

import { CLIENT_PATH } from "@shared/constants/url";

export default {
  name: "AuthLayout",
  components: {
    BCard,
    BCardBody,
    BButton,
    Heart,
  },
  props: {
    page: { type: String as PropType<"sign-in" | "sign-up">, required: true },
  },
  computed: {
    switchPath(): string {
      return this.page === "sign-in"
        ? CLIENT_PATH(["auth", "sign-up"])
        : CLIENT_PATH(["auth", "sign-in"]);
    },
    switchText(): string {
      return this.page === "sign-in" ? "회원가입" : "로그인";
    },
    switchDesc(): string {
      return this.page === "sign-in" ? "계정이 없으신가요?" : "이미 계정이 있으신가요?";
    },
  },
};
</script>

<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center p-4 custom-gradient">
    <BCard class="w-100 mx-auto border shadow-lg custom-box">
      <BCardBody class="p-custom">
        <div class="text-center custom-mb">
          <div class="d-flex justify-content-center mb-3">
            <div class="p-3 rounded-pill custom-gradient">
              <Heart class="text-white fs-4" />
            </div>
          </div>
          <h2 class="fs-4 fw-bold text-white mb-2">
            Iltuo Chat에 {{ page === "sign-in" ? "로그인" : "회원가입" }}
          </h2>
          <p class="text-gray-400-custom">MBTI 기반 완벽한 매칭을 경험해보세요</p>
        </div>
        <slot />
        <p class="text-center fs-6 mt-3 text-gray-400-custom">
          {{ switchDesc }}
          <span class="ms-1">
            <BButton
              variant="link"
              size="sm"
              :to="switchPath"
              tag="router-link"
              class="text-decoration-none p-0 align-baseline"
            >
              {{ switchText }}
            </BButton>
          </span>
        </p>
      </BCardBody>
    </BCard>
  </div>
</template>

<style scoped>
.custom-gradient {
  background: linear-gradient(to bottom right, #0a0a0a, #4b0082, #0a0a0a);
}

.custom-box {
  max-width: 28rem;
  background-color: rgba(30, 30, 30, 0.5);
  backdrop-filter: blur(1rem);
  border-color: rgba(168, 85, 247, 0.2);
}

.p-custom {
  padding: 2rem;
}

.custom-mb {
  margin-bottom: 2rem;
}

.custom-gradient {
  background: linear-gradient(to right, #a855f7, #ec4899);
}

.text-gray-400-custom {
  color: #9ca3af;
}
</style>
