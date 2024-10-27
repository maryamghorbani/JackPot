<template>
  <div class="play-area">
    <div class="slot-machine-frame">

      <div v-if="!isLoadingProcess" class="slot-machine-name">{{ slotMachineName }}</div>

      <div v-if="!isLoadingProcess" class="result-text">{{ isWon ? 'YOU WON!' : 'YOU LOST!' }}</div>
      <div class="symbols-display">
        <span v-for="(item, index) in currentSymbols" :key="index" :class="{'symbol': true, 'spin': isLoading}">
          {{ item }}
        </span>
      </div>
    </div>

    <p v-if="!isLoadingProcess" class="balance-text">
      {{ isWon ? `Your balance now is ${balance} 😉` : 'Sorry, you lost 😔' }}
    </p>
    <button v-if="!isLoadingProcess" @click="onBackToGame" class="play-again-button">
      {{ isWon ? 'Let’s play again' : 'No worries, let’s play again 😉' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  isLoadingProcess: boolean;
  isWon: boolean;
  balance: number;
  slotMachineName: string;
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
<style>
.play-area {
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  align-items: center;
  background: linear-gradient(135deg, rgba(115, 119, 178, 0.6), rgba(15, 18, 56, 0.6));
  min-height: 50vh;
  min-width: 60vw;
  color: #fff;
}

.slot-machine-frame {
  background-color: #333;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  text-align: center;
  margin-top: 60px;
}

.slot-machine-name {
  position: absolute;
  left: 50%;
  margin-top:-1.5em;
  transform: translateX(-50%);
  color: #333;
  background-color: #f7e600;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 2px 40px;
  border-radius: 5px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
}

.result-text {
  font-size: 2rem;
  font-weight: bold;
  color: #f7e600;
  margin-top: .8em;
  margin-bottom: 20px;
}

.symbols-display {
  display: flex;
  justify-content: center;
  font-size: 4rem;
  padding: 20px 0;
  border-top: 3px solid #888;
  border-bottom: 3px solid #888;
}

.symbol {
  padding: 0 15px;
}

.spin {
  animation: spin 0.8s linear infinite;
}

.balance-text {
  font-size: 1.2rem;
  color: #ddd;
  margin-top: 20px;
}

.play-again-button {
  padding: 10px 20px;
  margin-top: 30px;
  font-size: 1.5rem;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.play-again-button:hover {
  background-color: #218838;
  transform: scale(1.05);
}

@keyframes spin {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(180deg); }
  100% { transform: scale(1) rotate(360deg); }
}
</style>
