<template>
  <header class="w-full fixed top-0 left-0 flex flex-col items-end py-4 px-6 bg-white shadow-md z-10">
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

  <!-- Main Play Area -->
  <div class="play-area-button flex items-center justify-center min-h-screen">
    <button
        v-if="isBtnShow"
        type="submit"
        class="play-button"
        @click="onSubmitPlay"
    >
      <img src="https://media.lordicon.com/icons/wired/gradient/29-play-pause-circle.svg" alt="playIcon" width="60"/>
      <p class="ml-2 text-4xl font-bold">Play</p>
    </button>

    <PlayResult
        v-else
        :is-loading-process="isLoading"
        :isWon="isWon"
        :balance="balance"
        :slot-machine-name="slotMachineName"
        :playResult="playResult"
        @btn-visibility="handleBtnVisibility"
    />
  </div>

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
const playResult = ref([]);
const showErrorPopup = ref(false);
const errorMessage = ref('');
const isLoading = ref(false);
const slotMachineName = ref('');

const onSubmitPlay = async () => {
  try {
    isLoading.value = true;
    isBtnShow.value = false;

    const response = await getPlayData();
    playResult.value = response.play.result;
    setTimeout(() => {
      isLoading.value = false;
      slotMachineName.value = response.play.slot_machine.name;
      isWon.value = response.play.won;
      balance.value = response.balance;
    }, 3000);
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

<style scoped>
.play-area-button {
  background: linear-gradient(135deg, #1a2a6c, #799eb6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 4rem;
}

.play-button {
  display: flex;
  align-items: center;
  padding: 20px 40px;
  background: linear-gradient(145deg, #4a5568, #2d3748);
  color: #edf2f7;
  border-radius: 15px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.5rem;
  transform: translateY(0);
}

.play-button:hover {
  background: linear-gradient(145deg, #2d3748, #4a5568);
  transform: translateY(-4px);
  box-shadow: 0 8px 14px rgba(0, 0, 0, 0.3);
}

.play-button:active {
  transform: translateY(2px);
}

.play-button img {
  margin-right: 10px;
}

.play-button p {
  font-size: 2rem;
}

.fixed-header {
  z-index: 10;
}
</style>
