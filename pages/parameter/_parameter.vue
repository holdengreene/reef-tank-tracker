<template>
  <div class="mb-16">
    <div class="container mx-auto px-2 md:px-0">
      <h1 class="mb-3 text-4xl font-bold">{{ parameterName }}</h1>
      <table
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
            v-for="test in tests"
            :key="test.id"
            class="bg-white border-b border-gray-200"
          >
            <td class="px-4 py-3">{{ date(test.date_tested) }}</td>
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
import dayjs from 'dayjs';

import { allTests } from '~/assets/apollo/queries';

import { capitalizeFirstLetter } from '~/assets/js/helpers';

export default {
  async asyncData({ $graphql, params }) {
    const variables = {
      parameter: capitalizeFirstLetter(params.parameter),
    };

    const { tests } = await $graphql.default.request(allTests, variables);

    return { tests };
  },
  data() {
    return {
      parameterName: capitalizeFirstLetter(this.$route.params.parameter),
    };
  },
  methods: {
    date(date) {
      return dayjs(date).format('MM/DD/YYYY hh:mm a');
    },
    inRange(value) {
      const {
        min_range: minRange,
        max_range: maxRange,
      } = this.tests[0].parameter;

      // If true it's in range, otherwise time to clean
      return value >= minRange && value <= maxRange
        ? 'text-green-600'
        : 'text-red-600';
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    color() {
      return this.tests[0].parameter.color;
    },
  },
};
</script>
