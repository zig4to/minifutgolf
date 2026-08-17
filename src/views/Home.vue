<script setup>
import ModelViewer from '../components/ModelViewer.vue'
import proga2Model from '../assets/3dmodels/testnaproga.glb'
import golfHoleSvg from '../assets/svg/golf-hole.svg'
import footballPlayerSvg from '../assets/svg/football-player.svg'
</script>

<template>
  <section class="relative flex h-screen items-center justify-center overflow-hidden text-white">
    <div class="absolute inset-0" aria-hidden="true">
      <ModelViewer :model="proga2Model" :interactive="false" class="h-full w-full" />
    </div>
    <div
      class="pointer-events-none absolute inset-0"
      style="background: linear-gradient(120deg, rgba(20, 24, 26, 0.78) 0%, rgba(20, 24, 26, 0.58) 45%, rgba(20, 24, 26, 0.4) 100%)"
    ></div>

    <img
      :src="golfHoleSvg"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute -right-8 -bottom-8 w-80 opacity-10 md:w-md"
    />
    <img
      :src="footballPlayerSvg"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute -top-5 -left-5 w-64 opacity-10 md:w-96"
    />

    <div class="pointer-events-none relative mx-auto max-w-160 px-6 text-center">
      <h1 class="m-0 mb-81 text-[clamp(2.6rem,6vw,3.9rem)] leading-[1.15] font-black text-white/70">Prinesite zabavo kamorkoli!</h1>
      <p class="mx-auto mt-16 max-w-130 text-3xl tracking-wide text-white/90">Enostavna postavitev, razburljiva igra in nepozabni spomini.</p>
    </div>
  </section>
</template>
