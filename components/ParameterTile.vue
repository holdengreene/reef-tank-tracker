<template>
  <li
    class="p-2 bg-white rounded-md shadow-sm text-center border border-gray-100"
  >
    <h2 class="text-lg font-semibold">{{ parameterData.name }}</h2>
    <p
      class="text-2xl font-bold"
      :class="parameterData.inRange ? 'text-green-600' : 'text-red-600'"
    >
      {{ parameterData.value }}
    </p>
    <div>{{ parameterData.trend }}</div>
  </li>
</template>

<script>
export default {
  props: {
    parameterData: {
      type: Object,
      default() {
        return {
          name: '',
          value: 0,
          trend: '',
          inRange: false,
        };
      },
    },
  },
};
</script>
