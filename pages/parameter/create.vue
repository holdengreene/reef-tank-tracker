<template>
  <div class="container mx-auto px-2 md:px-0">
    <h1 class="mb-3 text-4xl font-bold">Create Parameter</h1>

    <ParameterForm :edit="false" />
  </div>
</template>

<script>
import ParameterForm from '~/components/ParameterForm';

export default {
  components: {
    ParameterForm,
  },
};
</script>
