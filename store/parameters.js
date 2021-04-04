import { allParameters } from '~/assets/apollo/queries';

export const state = () => ({
  list: [],
});

export const mutations = {
  setParameters(state, parameters) {
    state.list.push(...parameters);
  },
};

export const actions = {
  async fetchAllParameters({ commit }) {
    const { parameters } = await this.$graphql.default.request(allParameters);

    commit('setParameters', parameters);
  },
};
