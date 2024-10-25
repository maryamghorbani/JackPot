<template>
  <button
      type="submit"
      class="flex w-full justify-center rounded-md bg-cyan-600 mt-80 py-10 text-2xl font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
      @click="submitPlay"
  >
    Play
  </button>
</template>
<script setup lang="ts">
const submitPlay = () => {
  console.log('Play button clicked');
};
</script>
