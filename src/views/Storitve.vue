<script setup>
import golfSvg from '../assets/svg/golf.svg'
import slika1Image from '../assets/2dpictures/golf2.webp'

const paketi = [
  {
    ime: 'Small',
    proge: 4,
    icon: '⛳',
    opis: 'Odlična izbira za manjše skupine, rojstne dneve in krajša druženja.',
  },
  {
    ime: 'Medium',
    proge: 7,
    icon: '⛳',
    opis: 'Več raznolikosti in več izzivov za večje skupine, team buildinge in družabne dogodke.',
  },
  {
    ime: 'Large',
    proge: 10,
    icon: '⛳',
    opis: 'Celotna izkušnja z vsemi našimi progami. Idealna izbira za večje dogodke, turnirje in vse, ki želijo preizkusiti vseh 10 izzivov.',
  },
]

function progeLabel(n) {
  const zadnji = n % 100
  if (zadnji === 1) return 'proga'
  if (zadnji === 2) return 'progi'
  if (zadnji === 3 || zadnji === 4) return 'proge'
  return 'prog'
}

const priloznosti = [
  { icon: '🎉', naslov: 'Rojstnodnevne zabave' },
  { icon: '🏢', naslov: 'Team buildingi in druženja podjetij' },
  { icon: '⚽', naslov: 'Nogometni klubi in športni dogodki' },
  { icon: '🎪', naslov: 'Festivali, sejmi in druge prireditve' },
  { icon: '👨‍👩‍👧', naslov: 'Družinska druženja' },
  { icon: '☀️', naslov: 'Pikniki in zasebne zabave' },
]
</script>

<template>
  <section class="bg-page-gradient min-h-screen pt-19">
    <div class="mx-auto max-w-295 px-6 py-20 md:py-28">
      <!-- Uvod -->
      <div class="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <p class="mb-3 text-sm font-bold tracking-widest text-primary-dark uppercase">Najem opreme</p>
          <h1 class="mb-4 text-4xl font-black text-dark md:text-5xl">Najem prog za mini nogometni golf</h1>
          <span class="mb-8 block h-1 w-14 rounded-full bg-linear-to-r from-primary to-primary-dark"></span>

          <div class="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              Iščete zabavno in nekoliko drugačno popestritev vašega dogodka? Ponujamo
              <strong class="font-bold text-dark">najem prog za mini nogometni golf</strong>, kjer se nogomet
              sreča z minigolfom.
            </p>
            <p>
              Namesto palice uporabite nogo, namesto klasičnih lukenj pa vas na vsaki progi čakajo različne
              ovire in izzivi. Cilj je preprost – žogo spraviti skozi progo in v cilj z čim manj udarci.
            </p>
          </div>
        </div>

        <div class="aspect-video w-full overflow-hidden rounded-2xl">
          <img :src="slika1Image" alt="Igranje mini nogometnega golfa" class="h-full w-full object-cover opacity-90" />
        </div>
      </div>

      <!-- Paketi -->
      <div class="mt-24 md:mt-32">
        <h2 class="mb-2 text-center text-2xl font-extrabold text-dark md:text-3xl">
          Izberite paket, ki ustreza vašemu dogodku
        </h2>
        <span class="mx-auto mb-4 block h-1 w-14 rounded-full bg-linear-to-r from-primary to-primary-dark"></span>
        <p class="mx-auto mb-12 max-w-160 text-center text-lg text-muted">
          Pripravili smo tri različne pakete, zato lahko ponudbo prilagodite velikosti vaše skupine in dogodka.
        </p>

        <div class="grid gap-7 sm:grid-cols-3">
          <article
            v-for="paket in paketi"
            :key="paket.ime"
            class="relative flex flex-col items-center overflow-hidden rounded-[4rem] bg-white p-8 text-center shadow-[0_20px_40px_-28px_rgba(20,24,26,0.35)] transition-transform hover:-translate-y-1.5"
          >
            <span
              class="pointer-events-none absolute top-2 left-4 -z-10 text-[9rem] leading-none font-black text-primary/20 select-none"
            >
              {{ paket.proge }}
            </span>

            <span class="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/12 text-3xl">
              {{ paket.icon }}
            </span>
            <h3 class="text-xl font-extrabold text-dark">Paket {{ paket.ime }}</h3>
            <p class="mt-1 mb-4 text-sm font-bold text-primary-dark uppercase">
              {{ paket.proge }} {{ progeLabel(paket.proge) }}
            </p>
            <p class="text-base leading-relaxed text-muted">{{ paket.opis }}</p>
          </article>
        </div>
      </div>

      <!-- Priložnosti -->
      <div class="mt-24 md:mt-32">
        <h2 class="mb-2 text-center text-2xl font-extrabold text-dark md:text-3xl">Za različne priložnosti</h2>
        <span class="mx-auto mb-4 block h-1 w-14 rounded-full bg-linear-to-r from-primary to-primary-dark"></span>
        <p class="mx-auto mb-12 max-w-160 text-center text-lg text-muted">
          Naše proge so primerne za različne vrste dogodkov:
        </p>

        <div class="grid grid-cols-1 justify-center gap-6 sm:grid-cols-[repeat(3,240px)]">
          <article
            v-for="p in priloznosti"
            :key="p.naslov"
            class="flex flex-col items-center gap-4 rounded-3xl bg-white p-6 text-center shadow-[0_16px_32px_-26px_rgba(20,24,26,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-20px_rgba(20,24,26,0.3),0_0_24px_-4px_rgba(109,177,101,0.45)]"
          >
            <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/12 text-2xl">
              {{ p.icon }}
            </span>
            <h3 class="text-base font-bold text-dark">{{ p.naslov }}</h3>
          </article>
        </div>
      </div>

      <!-- Organizacija -->
      <div class="mt-24 grid gap-12 md:mt-32 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <h2 class="mb-2 text-2xl font-extrabold text-dark md:text-3xl">
            Vi izberete dogodek, mi poskrbimo za proge
          </h2>
          <span class="mb-6 block h-1 w-14 rounded-full bg-linear-to-r from-primary to-primary-dark"></span>
          <div class="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              Poskrbimo za pripravo in organizacijo najema, vi pa se lahko posvetite svojim gostom. Glede na
              vaše želje, število udeležencev in lokacijo vam pomagamo izbrati najprimernejši paket.
            </p>
            <p>
              Vsaka od naših <strong class="font-bold text-dark">10 prog prinaša svoj izziv</strong>, zato lahko
              ustvarite zabavno tekmovanje, kjer štejeta tako natančnost kot spretnost.
            </p>
          </div>
        </div>

        <img :src="golfSvg" alt="" aria-hidden="true" class="mx-auto w-full max-w-54 justify-self-center opacity-10" />
      </div>

      <!-- CTA -->
      <div
        class="mt-24 flex flex-col items-center rounded-[10rem] bg-linear-to-br from-primary to-primary-dark px-8 py-10 text-center text-white md:mt-32"
      >
        <h2 class="mb-3 text-2xl font-black md:text-3xl">Pripravljeni na malo drugačen nogomet?</h2>
        <p class="mb-8 max-w-130 text-lg text-white/90">
          Izberite svoj paket in popestrite svoj naslednji dogodek.
        </p>
        <RouterLink
          to="/kontakt"
          class="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-bold text-primary-dark shadow-[0_8px_24px_-8px_rgba(20,24,26,0.35)] transition-transform hover:-translate-y-0.5"
        >
          Povprašaj za ponudbo
        </RouterLink>
      </div>
    </div>
  </section>
</template>
