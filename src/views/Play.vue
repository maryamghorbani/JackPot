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
      class="flex w-96 justify-center items-center rounded-md bg-slate-600 mt-96 mx-auto py-14 text-4xl font-semibold leading-6 text-indigo-200 shadow-sm hover:bg-slate-300 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
      @click="onSubmitPlay"
  >
    <img src="https://media.lordicon.com/icons/wired/gradient/29-play-pause-circle.svg" alt="playIcon" width="100"/>
    <p class="ml-2">Play</p>
  </button>
  <PlayResult
      v-else
      :isWon="isWon"
      :balance="balance"
      :playResult="playResult"
      @btn-visibility="handleBtnVisibility"
  />

  <img src="../assets/images/slot-machine-symbols.svg" alt="playImage" class="-mt-24 absolute" width="400"/>

</template>
<script setup lang="ts">
import { useUserStore } from "../stores/UserStore";
import { ref } from "vue";
import authService from "../services/auth/AuthService";
import PlayResult from "./PlayResult.vue";

const userStore = useUserStore();
const username = ref(userStore.user?.name || 'Guest');
const balance = ref();
const isBtnShow = ref(true);
const isWon = ref(false);
const playResult = ref();
const onSubmitPlay = () => {
  isBtnShow.value = false;
  authService.getPlayData().then((response) => {
    isWon.value = response.play.won;
    playResult.value = response.play.result;
    balance.value = isWon.value ? response.balance : balance.value;
    console.log(response)
  });
};

authService.getTokenBalance().then((response) => {
  console.log(response.balance)
  balance.value = response.balance;
});
const onLogout = () => {
  userStore.logout();
};
const handleBtnVisibility = () => {
  isBtnShow.value = true;
};
</script>
