<template>
  <li
    class="p-2 bg-white rounded-md shadow-sm text-center border border-gray-100 relative overflow-hidden"
  >
    <NuxtLink :to="`/parameter/${parameter.parameter_name.toLowerCase()}`">
      <div
        class="border-t-4 absolute inset-0"
        :class="`border-${parameter.color}-400`"
      ></div>
      <h2 class="text-lg font-semibold">{{ parameter.parameter_name }}</h2>
      <p class="text-2xl font-bold" :class="inRange()">
        {{ parameter.tests[0].value }}
      </p>
      <div>{{ trend() }}</div>

      <p class="absolute right-1 bottom-0 text-sm text-gray-500">
        Tested: {{ date() }}
      </p>
    </NuxtLink>
  </li>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: {
    parameter: {
      type: Object,
      default() {
        return {
          id: 0,
          parameter_name: '',
          color: 'green',
          max_range: 0,
          min_range: 0,
          target: 0,
          test: [
            {
              value: 0,
              date_tested: new Date(),
            },
          ],
        };
      },
    },
  },
  methods: {
    date() {
      return dayjs(this.parameter.tests[0].date_tested).format('MM/DD/YYYY');
    },
    inRange() {
      const { min_range: minRange, max_range: maxRange } = this.parameter;
      const { value } = this.parameter.tests[0];

      // If true it's in range, otherwise time to clean
      return value >= minRange && value <= maxRange
        ? 'text-green-600'
        : 'text-red-600';
    },
    trend() {
      const { value: newValue } = this.parameter.tests[0] ?? { value: 0 };
      const { value: oldValue } = this.parameter.tests[1] ?? { value: 0 };

      return newValue > oldValue ? 'up' : 'down';
    },
  },
};
</script>
