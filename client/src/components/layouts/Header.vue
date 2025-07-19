<script lang="ts">
import { BContainer, BRow, BCol, BButton } from "bootstrap-vue-next";
import { Heart, Settings, UserCircle } from "lucide-vue-next";

export default {
  name: "HeaderLayout",
  components: {
    BContainer,
    BRow,
    BCol,
    BButton,
    Heart,
    Settings,
    UserCircle,
  },
};
</script>

<template>
  <header class="bg-gradient-to-r from-purple-600 to-pink-500 shadow sticky-top z-3">
    <BContainer class="py-2">
      <BRow class="align-items-center justify-content-between">
        <!-- Left: Logo -->
        <BCol cols="auto" class="d-flex align-items-center gap-2">
          <Heart class="text-white" :size="24" />
          <h1 class="text-white fw-bold fs-5 m-0">Iltuo Chat</h1>
        </BCol>

        <!-- Right: Buttons -->
        <BCol cols="auto" class="d-flex align-items-center gap-3">
          <BButton variant="link" class="text-white p-0">
            <Settings class="text-white" :size="20" />
          </BButton>
          <BButton variant="link" class="text-white p-0">
            <UserCircle class="text-white" :size="20" />
          </BButton>
        </BCol>
      </BRow>
    </BContainer>
  </header>
</template>

<style scoped>
.bg-gradient-to-r {
  background-image: linear-gradient(to right, #9333ea, #ec4899); /* from-purple-600 to-pink-500 */
}
.gap-2 {
  gap: 0.5rem;
}
.gap-3 {
  gap: 1rem;
}
</style>
