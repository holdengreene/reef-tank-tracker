<template>
  <div class="container mx-auto px-2 md:px-0">
    <h1 class="mb-3 text-4xl font-bold capitalize">
      Edit {{ parameter.parameter_name }}
    </h1>

    <ParameterForm :parameter="parameter" :edit="true" />
  </div>
</template>

<script>
import { capitalizeFirstLetter } from '~/assets/js/helpers';

import { parameter } from '~/assets/apollo/queries';

import ParameterForm from '~/components/ParameterForm';

export default {
  components: {
    ParameterForm,
  },
  async asyncData({ $graphql, params }) {
    const variables = {
      name: capitalizeFirstLetter(params.parameter),
    };

    const { parameters } = await $graphql.default.request(parameter, variables);

    return { parameter: parameters[0] };
  },
};
</script>
