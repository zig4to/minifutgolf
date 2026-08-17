<script setup>
import { ref, onMounted } from 'vue'

const initialForm = { ime: '', podjetje: '', email: '', telefon: '', zelje: '' }
const form = ref({ ...initialForm })
const sent = ref(false)

function progeStavek(izbrane) {
  const stevilke = izbrane.slice().sort((a, b) => a - b)
  const seznam =
    stevilke.length === 1
      ? `${stevilke[0]}`
      : `${stevilke.slice(0, -1).join(', ')} in ${stevilke[stevilke.length - 1]}`
  const samostalnik = stevilke.length === 1 ? 'proge' : 'prog'
  return `Pozdravljeni,\n\nzanimam se za najem ${samostalnik} št. ${seznam}. `
}

onMounted(() => {
  const shranjeno = localStorage.getItem('izbrane-proge')
  if (!shranjeno) return

  localStorage.removeItem('izbrane-proge')

  try {
    const izbrane = JSON.parse(shranjeno)
    if (Array.isArray(izbrane) && izbrane.length) {
      form.value.zelje = progeStavek(izbrane)
    }
  } catch {
    // neveljavni podatki v localStorage, ignoriramo
  }
})

function submit() {
  sent.value = true
  form.value = { ...initialForm }
}

function resetForm() {
  form.value = { ...initialForm }
  sent.value = false
}
</script>

<template>
  <section class="bg-page-gradient flex flex-col md:min-h-screen">
    <div class="h-19 shrink-0" aria-hidden="true"></div>

    <div class="px-6 py-12 md:flex md:flex-1 md:items-center md:justify-center md:px-6 md:py-0">
      <div class="mx-auto w-full max-w-160">
        <h1 class="mb-2 text-3xl font-extrabold text-dark md:text-4xl">Obrazec za povpraševanje</h1>
        <span class="mb-8 block h-1 w-14 rounded-full bg-linear-to-r from-primary to-primary-dark"></span>

        <div class="relative overflow-hidden rounded-2xl p-0.5">
          <div
            class="animate-[spin_11s_linear_infinite] absolute -inset-1/2 bg-[conic-gradient(from_0deg,transparent_0%,#6db165_10%,transparent_22%)]"
            aria-hidden="true"
          ></div>

          <form
            class="relative z-10 grid gap-5 rounded-2xl bg-light p-8"
            @submit.prevent="submit"
            @reset.prevent="resetForm"
          >
            <label class="grid gap-1.5 text-sm font-semibold text-dark">
              Ime in priimek
              <input
                v-model="form.ime"
                type="text"
                required
                placeholder="Janez Novak"
                class="rounded-[10px] border border-dark/15 bg-white px-3.5 py-3 font-normal focus:outline-2 focus:outline-primary focus:outline-offset-1"
              />
            </label>

            <label class="grid gap-1.5 text-sm font-semibold text-dark">
              Podjetje (opcijsko)
              <input
                v-model="form.podjetje"
                type="text"
                placeholder="Ime podjetja"
                class="rounded-[10px] border border-dark/15 bg-white px-3.5 py-3 font-normal focus:outline-2 focus:outline-primary focus:outline-offset-1"
              />
            </label>

            <label class="grid gap-1.5 text-sm font-semibold text-dark">
              E-naslov
              <input
                v-model="form.email"
                type="email"
                required
                placeholder="janez@primer.si"
                class="rounded-[10px] border border-dark/15 bg-white px-3.5 py-3 font-normal focus:outline-2 focus:outline-primary focus:outline-offset-1"
              />
            </label>

            <label class="grid gap-1.5 text-sm font-semibold text-dark">
              Telefon
              <input
                v-model="form.telefon"
                type="tel"
                required
                placeholder="041 234 567"
                class="rounded-[10px] border border-dark/15 bg-white px-3.5 py-3 font-normal focus:outline-2 focus:outline-primary focus:outline-offset-1"
              />
            </label>

            <label class="grid gap-1.5 text-sm font-semibold text-dark">
              Opišite vaše želje
              <textarea
                v-model="form.zelje"
                required
                rows="5"
                placeholder="Povejte nam več o vašem dogodku..."
                class="resize-y rounded-[10px] border border-dark/15 bg-white px-3.5 py-3 font-normal focus:outline-2 focus:outline-primary focus:outline-offset-1"
              ></textarea>
            </label>

            <div class="mt-2 flex flex-wrap gap-4">
              <button
                type="submit"
                class="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-white shadow-[0_8px_24px_-8px_rgba(109,177,101,0.6)] transition-transform hover:-translate-y-0.5"
              >
                Pošlji
              </button>
              <button
                type="reset"
                class="inline-flex items-center gap-2 rounded-full border-2 border-dark/20 px-7 py-3.5 font-bold text-dark transition-colors hover:border-dark/40"
              >
                Ponastavi
              </button>
            </div>

            <p v-if="sent" class="m-0 font-semibold text-primary-dark">
              Hvala! Vaše povpraševanje je bilo poslano, kmalu se oglasimo.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
