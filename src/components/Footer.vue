<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-dark py-8 text-white/70">
    <div class="mx-auto flex max-w-295 flex-wrap items-center justify-between gap-4 px-6">
      <div class="flex items-center gap-2.5 font-bold text-white">
        <span>MiniFutGolf</span>
      </div>
      <p class="m-0 text-sm">&copy; {{ year }} MiniFutGolf. Vse pravice pridržane.</p>
    </div>
  </footer>
</template>
