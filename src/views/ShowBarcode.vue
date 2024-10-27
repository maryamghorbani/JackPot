<template>
  <div class="flex justify-center flex-col items-center">
    <img class="w-1/3 m-24" :src="barcodeSrc" alt="TOTP QR Code" />
    <p class="font-medium text-black">{{ message }}</p>

    <div>
      <button
          type="submit"
          class="w-full justify-center rounded-md bg-cyan-600 mt-20 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
      >
        <router-link to="/login" class="font-semibold leading-6 text-white">
          <p>Done!</p>
          <p>Go to login page</p>
        </router-link>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();

const message = computed(() => userStore.message);
const barcodeSrc = computed(() => `data:image/png;base64,${userStore.totpDevice}`);

</script>
