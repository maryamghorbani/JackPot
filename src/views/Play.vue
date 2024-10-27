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

  <!-- Error Popup -->
  <div v-if="showErrorPopup" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-white p-6 rounded shadow-lg max-w-md w-full">
      <h3 class="text-lg font-semibold text-red-600">Error</h3>
      <p class="mt-4 text-sm text-gray-700">
        {{ errorMessage }}
      </p>
      <button @click="closeErrorPopup" class="mt-4 px-4 py-2 bg-cyan-600 text-white rounded">
        Back
      </button>
    </div>
  </div>

</template>
<script setup lang="ts">
import { useUserStore } from "../stores/UserStore";
import { ref } from "vue";
import { getTokenBalance } from "../services/TokenService/TokenService";
import { getPlayData } from "../services/MachineService/MachineService";
import PlayResult from "./PlayResult.vue";

const userStore = useUserStore();
const username = ref(userStore.loggedUser?.user.name || 'Guest');
const balance = ref();
const isBtnShow = ref(true);
const isWon = ref(false);
const playResult = ref();
const showErrorPopup = ref(false);
const errorMessage = ref('');

const onSubmitPlay = async () => {
  try {
    const response = await getPlayData();
    isBtnShow.value = false;
    isWon.value = response.play.won;
    balance.value = response.balance;
    playResult.value = response.play.result;
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      isBtnShow.value = true;
      errorMessage.value = error.response.data.error;
      showErrorPopup.value = true;
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
};

const closeErrorPopup = () => {
  showErrorPopup.value = false;
  isBtnShow.value = true;
};

getTokenBalance().then((response) => {
  balance.value = response.balance;
});
const onLogout = () => {
  userStore.logout();
};
const handleBtnVisibility = () => {
  isBtnShow.value = true;
};
</script>
