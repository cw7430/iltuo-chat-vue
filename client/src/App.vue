<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView, useRoute } from "vue-router";
import { BContainer } from "bootstrap-vue-next";

import { InitializeAuth } from "@/auth-initializer";
import { HeaderLayout } from "@/components/layouts";

const route = useRoute();

onMounted(() => {
  InitializeAuth();
});
</script>

<template>
  <BContainer fluid class="min-vh-100 d-flex flex-column p-0">
    <HeaderLayout v-if="!route.path.startsWith('/auth') && route.name !== 'NotFound'" />
    <BContainer as="main" class="flex-fill py-4">
      <RouterView />
    </BContainer>
  </BContainer>
</template>

<style scoped></style>
