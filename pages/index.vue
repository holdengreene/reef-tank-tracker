<template>
  <div class="container mx-auto px-2 md:px-0">
    <h1 class="mb-3 text-4xl font-bold">Parameters Overview</h1>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <ul v-for="parameter in latestTests" :key="parameter.id">
        <ParameterTile :parameter="parameter" />
      </ul>
    </div>
  </div>
</template>

<script>
import ParameterTile from '~/components/ParameterTile';

// GraphQL queries
import { latestTests } from '~/assets/apollo/queries';

export default {
  components: {
    ParameterTile,
  },
  data() {
    return {
      latestTests,
    };
  },
  apollo: {
    latestTests: {
      query: latestTests,
      update(data) {
        return data.parameters;
      },
    },
  },
};
</script>
