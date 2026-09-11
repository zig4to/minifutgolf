<!--
  Skupen širinski "recept" za vsebino strani (Storitve, Predstavitev prog ...).

  - do `lg` se container razteza do max-w-295 (a ga na manjših zaslonih
    v praksi omeji širina viewporta, ne ta vrednost)
  - od `lg` naprej je container trajno omejen na max-w-4xl, da vsebina
    na širokih zaslonih ne postane pretirano raztegnjena; ista vrednost
    zato velja tudi na xl in 2xl (ni dodatnega override-a)

  Če je treba kdaj prilagoditi širino samo za eno stran, raje spremeni
  razrede na klicnem mestu (prek dodatnega ovoja), kot da tu dodajaš
  props/variante brez resnične potrebe.

  `pt`/`pb` sta izjemi, ker se je izkazalo, da odmika nad in pod vsebino
  dejansko potrebujeta stran od strani drugačno vrednost.
-->
<script setup>
defineProps({
  pt: { type: String, default: 'pt-20 md:pt-28' },
  pb: { type: String, default: 'pb-20 md:pb-28' },
})
</script>

<template>
  <div :class="['mx-auto max-w-295 px-6 lg:max-w-4xl', pt, pb]">
    <slot />
  </div>
</template>
