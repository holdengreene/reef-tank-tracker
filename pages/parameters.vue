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
          <td class="px-4 py-3">{{ parameter.name }}</td>
          <td class="px-4 py-3">
            {{ `${parameter.min_range} - ${parameter.max_range}` }}
          </td>
          <td class="px-4 py-3">{{ parameter.target }}</td>
          <td class="px-4 py-3">
            <NuxtLink
              :to="`/parameter/edit/${parameter.name.toLowerCase()}`"
              class="bg-blue-600 text-white px-3 py-1 rounded-sm"
            >
              Edit
            </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>

    <Fab link="/parameter/create" />
  </div>
</template>

<script>
import Fab from '~/components/Fab';

export default {
  components: {
    Fab,
  },
  data() {
    return {
      currentParameter: 0,
    };
  },
  async fetch() {
    if (this.$store.state?.parameters.list.length === 0) {
      await this.$store.dispatch('parameters/fetchAllParameters');
    }
  },
  computed: {
    parameters() {
      return this.$store.state?.parameters.list;
    },
  },
};
</script>
