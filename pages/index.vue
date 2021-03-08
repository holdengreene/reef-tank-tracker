<template>
  <div class="container mx-auto px-2 md:px-0">
    <h1 class="mb-3 text-4xl font-bold">Parameters Overview</h1>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <ul v-for="parameterData in latestParameters" :key="parameterData.name">
        <Parameter :parameter-data="parameterData" />
      </ul>
    </div>
  </div>
</template>

<script>
import Parameter from '~/components/Parameter';

import latestParameters from '~/assets/js/parameterDummy';

export default {
  components: {
    Parameter,
  },
  data() {
    return {
      latestParameters,
    };
  },
};
</script>
