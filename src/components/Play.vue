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
      type="submit"
      class="flex w-full justify-center rounded-md bg-cyan-600 mt-96 py-10 text-2xl font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
      @click="onSubmitPlay"
  >
    Play
  </button>
</template>
<script setup lang="ts">
import { useUserStore } from "../stores/UserStore";
import { ref } from "vue";

const userStore = useUserStore();
const username = ref(userStore.user?.name || 'Guest');
const balance = ref(10);
const onSubmitPlay = () => {
  console.log('Play button clicked');
};
const onLogout = () => {
  userStore.logout();
};
</script>
