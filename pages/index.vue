<template>
  <div class="flex justify-center items-center h-screen">
    <p>Redirecting to dashboard...</p>
  </div>
</template>

<script setup lang="ts">
await navigateTo('/dashboard')
</script>
