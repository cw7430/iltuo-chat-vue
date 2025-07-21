<script lang="ts">
import "@/pages/auth/index.css";

import { BForm, BFormGroup, BFormInput, BButton } from "bootstrap-vue-next";

import { AuthLayout } from "@/components/layouts";

export default {
  name: "SignInPage",
  components: {
    AuthLayout,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
  },
};
</script>

<template>
  <AuthLayout page="sign-in">
    <BForm>
      <BFormGroup label="이메일" label-for="email" class="mb-3" label-class="text-gray-300-custom">
        <BFormInput id="email" type="email" placeholder="이메일" placeholder-class="text-gray-400-custom" />
      </BFormGroup>
      <BFormGroup label="비밀번호" label-for="password" class="mb-4" label-class="text-gray-300-custom">
        <BFormInput id="password" type="password" placeholder="비밀번호" placeholder-class="text-gray-400-custom" />
      </BFormGroup>
      <BButton
        type="submit"
        size="sm"
        class="w-100 d-inline-flex align-items-center justify-content-center gap-2 rounded shadow-lg text-white custom-purple-pink custom-purple-pink-hover"
        >로그인</BButton
      >
    </BForm>
  </AuthLayout>
</template>
