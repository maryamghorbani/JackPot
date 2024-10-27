<template>
  <div class="flex flex-col bg-white py-10 items-center mt-64 text-center text-black rounded-lg shadow-md">
    <div class="relative w-56 h-56 -mt-32 rounded-full bg-slate-700 flex items-center justify-center border-4 border-slate-200">
      <div class="absolute inset-3 rounded-full border-4 border-cyan-500"></div>
      <span class="relative text-slate-200 font-black text-xl">
        {{ isWon ? 'YOU WON!' : 'YOU LOST!' }}
      </span>
    </div>

    <!-- Slot Machine Spinner/Loader -->
    <p class="pt-20 pb-10 text-6xl">
      <span class="px-4" v-for="(symbol, index) in currentSymbols" :key="index">
        {{ symbol }}
      </span>
    </p>

    <div class="font-bold" v-if="isWon">
      <p class="py-2 px-4 mt-6 text-slate-500">Your balance now is {{ balance }} ;)</p>
    </div>
    <div v-else>
      <p class="font-bold py-2 px-4 mt-6 text-slate-500">Sorry, you lost :(</p>
    </div>
    <button
        class="font-semibold py-2 px-4 mt-8 text-white bg-cyan-500 rounded-lg"
        @click="onBackToGame"
    >
      {{ isWon ? 'Let’s play again' : 'No worries, let’s play again ;)'}}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  isWon: boolean;
  balance: number;
  playResult: string[];
}>();

const emit = defineEmits<{
  (event: 'btn-visibility'): void;
}>();

const currentSymbols = ref<string[]>(["🔔", "⭐", "🍒", "🍋"]);
const loadingIntervals = ref<Array<number | null>>([null, null, null, null]);
const isLoading = ref(true);

function startLoadingEffect() {
  props.playResult.forEach((_, index) => {
    loadingIntervals.value[index] = setInterval(() => {
      currentSymbols.value[index] = props.playResult[Math.floor(Math.random() * props.playResult.length)];;
    }, 200);
  });
}

function stopLoadingEffect() {
  loadingIntervals.value.forEach((interval, index) => {
    if (interval) clearInterval(interval);
    currentSymbols.value[index] = props.playResult[index];
  });
  isLoading.value = false;
}

function onBackToGame() {
  emit('btn-visibility');
}

onMounted(() => {
  startLoadingEffect();
  setTimeout(stopLoadingEffect, 3000);
});

onUnmounted(() => {
  loadingIntervals.value.forEach(interval => {
    if (interval) clearInterval(interval);
  });
});
</script>
