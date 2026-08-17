<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const open = ref(false)

const links = [
  { to: '/', label: 'Domov' },
  { to: '/storitve', label: 'Storitve' },
  { to: '/predstavitev-prog', label: 'Predstavitev prog' },
  { to: '/onas', label: 'O nas' },
  { to: '/kontakt', label: 'Kontakt' },
]

function close() {
  open.value = false
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-100" :class="route.path === '/' ? 'bg-dark/70' : 'bg-dark/95'">
    <div
      class="mx-auto flex h-19 max-w-295 items-center justify-between px-6 md:grid md:grid-cols-[1fr_auto_1fr]"
    >
      <RouterLink to="/" class="flex items-center gap-2.5 text-2xl font-black tracking-tight text-white" @click="close">
        <span>MiniFutGolf</span>
      </RouterLink>

      <nav
        class="absolute inset-x-0 top-19 flex max-h-0 flex-col gap-0 overflow-hidden bg-dark transition-[max-height] duration-250 ease-in-out md:static md:col-start-2 md:max-h-none md:flex-row md:justify-center md:gap-10 md:overflow-visible md:bg-transparent"
        :class="{ 'max-h-75': open }"
      >
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="border-t border-white/10 px-6 py-4 text-lg font-black text-white/85 transition-colors hover:text-white hover:underline hover:decoration-primary hover:decoration-3 hover:underline-offset-6 [&.router-link-exact-active]:text-white [&.router-link-exact-active]:underline [&.router-link-exact-active]:decoration-primary [&.router-link-exact-active]:decoration-3 [&.router-link-exact-active]:underline-offset-6 md:border-0 md:px-0 md:py-0"
          @click="close"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <button
        class="flex flex-col justify-self-end gap-1.5 p-2 md:hidden"
        @click="open = !open"
        :aria-expanded="open"
        aria-label="Odpri meni"
      >
        <span class="h-0.5 w-5.5 bg-white"></span>
        <span class="h-0.5 w-5.5 bg-white"></span>
        <span class="h-0.5 w-5.5 bg-white"></span>
      </button>
    </div>
  </header>
</template>
