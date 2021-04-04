<template>
  <div class="container mx-auto px-2 md:px-0">
    <h1 class="mb-3 text-4xl font-bold">Parameters Overview</h1>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <ul v-for="tests in latestTests" :key="tests.id">
        <ParameterTile :parameter="tests" />
      </ul>
    </div>
  </div>
</template>

<script>
import ParameterTile from '~/components/ParameterTile';

export default {
  components: {
    ParameterTile,
  },
  async fetch() {
    if (this.$store.state?.tests.latest.length === 0) {
      await this.$store.dispatch('tests/fetchLatestTests');
    }
  },
  computed: {
    latestTests() {
      return this.$store.state.tests.latest;
    },
  },
};
</script>
