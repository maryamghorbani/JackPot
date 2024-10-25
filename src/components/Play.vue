<template>
  <header class="w-full fixed top-0 left-0 flex flex-col items-end py-4 px-6 bg-white shadow-md">
    <div class="flex items-center space-x-2">
      <span class="text-gray-900 font-medium">{{ username }} /</span>
      <router-link
          to="/login"
          class="text-cyan-600 hover:text-cyan-500 font-medium"
          @click="onLogout"
      >
        Logout
      </router-link>
    </div>
    <div class="mt-1 text-gray-700 font-medium">
      Your balance is {{ balance }} tokens
    </div>
  </header>
  <button
      v-if="isBtnShow"
      type="submit"
      class="flex w-full justify-center rounded-md bg-cyan-600 mt-96 py-10 text-2xl font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
      @click="onSubmitPlay"
  >
    Play
  </button>
  <div
      v-else
      class="flex flex-col bg-white py-32 items-center mt-72 text-center text-black rounded-lg border-cyan-500 border-4"
  >
    <div class="font-bold" v-if="isWon">
      <p class="py-2 text-2xl">Congratulation!</p>
      <p class="py-2 text-xl">YOU WON!</p>
      <p class="py-2 text-2xl">{{ playResult }}</p>
      <p class="py-2 mt-6 bg-cyan-200 rounded-lg">Your balance is now {{ balance }}</p>
    </div>
    <div v-else>
      <p class="text-lg mb-8">Sorry, you lost :(</p>
      <button
          class="font-semibold py-2 px-4 text-white bg-cyan-500 rounded-lg"
          @click="onBackToGame"
      >
        No worries, lets play again ;)
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "../stores/UserStore";
import { ref } from "vue";
import AuthService from "../services/auth/authService";

const userStore = useUserStore();
const username = ref(userStore.user?.name || 'Guest');
const balance = ref();
const isBtnShow = ref(true);
const isWon = ref(false);
const playResult = ref();
const onSubmitPlay = () => {
  isBtnShow.value = false;
  AuthService.getPlayData().then((response) => {
    isWon.value = response.play.won;
    playResult.value = response.play.result;
    balance.value = isWon.value ? response.balance : balance.value;
    console.log(response)
  });
};

AuthService.getTokenBalance().then((response) => {
  console.log(response.balance)
  balance.value = response.balance;
});
const onLogout = () => {
  userStore.logout();
};
const onBackToGame = () => {
  isBtnShow.value = true;
};
</script>
