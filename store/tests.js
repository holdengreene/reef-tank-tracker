import Vue from 'vue';

import { allTests, latestTests } from '~/assets/apollo/queries';
import { capitalizeFirstLetter } from '~/assets/js/helpers';

export const state = () => ({
  list: {},
  latest: [],
});

export const mutations = {
  setTests(state, { parameter, tests }) {
    Vue.set(state.list, parameter, tests);
  },
  setLatestTests(state, tests) {
    state.latest.push(...tests);
  },
};

export const actions = {
  // Fetch all tests for a specific parameter
  async fetchAllTestsParameter({ commit }, parameter) {
    const variables = {
      parameter: capitalizeFirstLetter(parameter),
    };

    const { tests } = await this.$graphql.default.request(allTests, variables);

    commit('setTests', { parameter, tests });
  },
  async fetchLatestTests({ commit }) {
    const { parameters } = await this.$graphql.default.request(latestTests);

    commit('setLatestTests', parameters);
  },
};
