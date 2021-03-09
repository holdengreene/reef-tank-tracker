<template>
  <div>
    <div class="container mx-auto px-2 md:px-0">
      <h1 class="mb-3 text-4xl font-bold capitalize">{{ parameterName }}</h1>
      <table
        class="rounded-t-md w-full bg-gray-200 text-gray-800 shadow-sm border border-gray-100"
      >
        <thead>
          <tr class="text-left border-b-2 border-gray-300">
            <th class="px-4 py-3">Test Date</th>
            <th class="px-4 py-3">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="parameter in parameterData"
            :key="parameter.testDate"
            class="bg-white border-b border-gray-200"
          >
            <td class="px-4 py-3">{{ parameter.testDate }}</td>
            <td
              class="px-4 py-3"
              :class="parameter.inRange ? 'text-green-600' : 'text-red-600'"
            >
              {{ parameter.value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import nitrateDummy from '~/assets/js/nitrateDummy';

export default {
  asyncData({ params }) {
    const parameter = params.parameter;

    // Replace with API call
    return {
      parameterName: parameter,
      parameterData: nitrateDummy,
    };
  },
};
</script>
