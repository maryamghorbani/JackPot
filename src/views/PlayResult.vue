<template>
  <div
      class="flex flex-col bg-white py-10 items-center mt-64 text-center text-black rounded-lg shadow-md"
  >
    <div class="relative w-56 h-56 -mt-32 rounded-full bg-slate-700 flex items-center justify-center border-4 border-slate-200">
      <div class="absolute inset-3 rounded-full border-4 border-cyan-500"></div>
      <span class="relative text-slate-200 font-black text-xl">
        {{ isWon ? 'YOU WON!' : 'YOU LOST!' }}
      </span>
    </div>

    <p class="pt-20 pb-10 text-6xl">
      <span class="px-4" v-for="(item, index) in playResult" :key="index">
        {{ item }}
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
      {{ isWon ? 'Lets play again' : 'No worries, lets play again ;)'}}
    </button>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const Props = defineProps<{
  isWon: boolean;
  balance: number;
  playResult: string;
}>();

const emit = defineEmits<{
  (event: 'btn-visibility'): void;
}>();

function onBackToGame() {
  emit('btn-visibility');
}

</script>
