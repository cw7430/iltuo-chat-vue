<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView, useRoute } from "vue-router";

import { InitializeAuth } from "@/auth-initializer";
import { HeaderLayout } from "@/components/layouts";

const route = useRoute();

onMounted(() => {
  InitializeAuth();
});
</script>

<template>
  <div fluid class="min-vh-100 d-flex flex-column p-0">
    <HeaderLayout v-if="!route.path.startsWith('/auth') && route.name !== 'NotFound'" />
    <main class="flex-fill py-4">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
