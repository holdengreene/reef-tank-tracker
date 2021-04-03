<template>
  <div class="container mx-auto px-2 md:px-0">
    <h1 class="mb-3 text-4xl font-bold">All Parameters</h1>

    <table
      class="rounded-t-md w-full bg-gray-200 text-gray-800 shadow-sm border border-gray-100 overflow-hidden"
    >
      <thead>
        <tr class="text-left">
          <th class="px-4 py-3">Name</th>
          <th class="px-4 py-3">Range</th>
          <th class="px-4 py-3">Target</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="parameter in parameters"
          :key="parameter.id"
          class="bg-white border-b border-gray-200"
        >
          <td class="px-4 py-3">{{ parameter.parameter_name }}</td>
          <td class="px-4 py-3">
            {{ `${parameter.min_range} - ${parameter.max_range}` }}
          </td>
          <td class="px-4 py-3">{{ parameter.target }}</td>
          <td class="px-4 py-3">
            <NuxtLink
              :to="`/parameter/edit/${parameter.parameter_name.toLowerCase()}`"
              class="bg-blue-600 text-white px-3 py-1 rounded-sm"
            >
              Edit
            </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { allParameters } from '~/assets/apollo/queries';

export default {
  async asyncData({ $graphql }) {
    const { parameters } = await $graphql.default.request(allParameters);

    return { parameters };
  },
  data() {
    return {
      currentParameter: 0,
    };
  },
};
</script>
