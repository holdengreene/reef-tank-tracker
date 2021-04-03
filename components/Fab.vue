<template>
  <NuxtLink
    :to="link"
    class="fixed right-6 bottom-24 rounded-full h-14 w-14 flex items-center justify-center bg-green-400 text-white text-5xl text-center font-bold"
    ><img src="/plus.svg" alt="Plus symbol"
  /></NuxtLink>
</template>

<script>
export default {
  props: {
    link: {
      default: '/',
      type: String,
    },
  },
};
</script>
