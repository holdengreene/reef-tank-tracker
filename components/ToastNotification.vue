<template>
  <div
    class="fixed bottom-28 inset-x-0 mx-auto w-3/5 md:w-2/5 lg:w-1/6 bg-blue-600 rounded-sm shadow-lg px-6 py-2 text-xl font-semibold text-center text-white"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
  },
};
</script>
