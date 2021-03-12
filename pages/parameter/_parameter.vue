<template>
  <div>
    <div class="container mx-auto px-2 md:px-0">
      <h1 class="mb-3 text-4xl font-bold">{{ parameterName }}</h1>
      <div v-if="$apollo.loading">Loading...</div>
      <table
        v-else
        class="rounded-t-md w-full bg-gray-200 text-gray-800 shadow-sm border border-gray-100 overflow-hidden"
      >
        <thead :class="`bg-${color()}-400`">
          <tr class="text-left">
            <th class="px-4 py-3">Test Date</th>
            <th class="px-4 py-3">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="test in latestTests"
            :key="test.id"
            class="bg-white border-b border-gray-200"
          >
            <td class="px-4 py-3">{{ date(test.created_at) }}</td>
            <td class="px-4 py-3" :class="inRange(test.value)">
              {{ test.value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { allTests } from '~/assets/apollo/queries';

export default {
  data() {
    return {
      parameterName: this.capitalizeFirstLetter(this.$route.params.parameter),
    };
  },
  apollo: {
    latestTests: {
      query: allTests,
      variables() {
        return {
          parameter: this.capitalizeFirstLetter(this.$route.params.parameter),
        };
      },
      update(data) {
        return data.tests;
      },
    },
  },
  methods: {
    date(date) {
      return new Date(date).toLocaleString('en-US');
    },
    inRange(value) {
      const {
        min_range: minRange,
        max_range: maxRange,
      } = this.latestTests[0].parameter;

      // If true it's in range, otherwise time to clean
      return value >= minRange && value <= maxRange
        ? 'text-green-600'
        : 'text-red-600';
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    color() {
      return this.latestTests[0].parameter.color;
    },
  },
};
</script>
