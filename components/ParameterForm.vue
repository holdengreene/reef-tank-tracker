<template>
  <form
    action="#"
    method="post"
    :class="saving ? 'opacity-60' : ''"
    @submit.stop.prevent="updateParameter"
  >
    <div class="flex flex-col max-w-xs mb-2">
      <label for="parameterName">Name</label>
      <input
        id="parameterName"
        v-model="parameterName"
        class="p-1 border"
        name="parameterName"
        type="text"
      />
    </div>

    <div class="flex flex-col max-w-xs mb-2">
      <label for="minValue">Min Value</label>
      <input
        id="minValue"
        v-model.number="minValue"
        class="p-1 border"
        name="minValue"
        type="number"
      />
    </div>

    <div class="flex flex-col max-w-xs mb-2">
      <label for="maxValue">Max Value</label>
      <input
        id="maxValue"
        v-model.number="maxValue"
        class="p-1 border"
        name="maxValue"
        type="number"
      />
    </div>

    <div class="flex flex-col max-w-xs mb-2">
      <label for="target">Target</label>
      <input
        id="target"
        v-model.number="target"
        class="p-1 border"
        name="target"
        type="number"
      />
    </div>

    <!-- <div class="flex flex-col max-w-xs mb-2">
      <label for="color">Color</label>
      <div class="grid grid-cols-4 gap-1 place-items-center">
        <div
          v-for="colorSel in colorsArray"
          :key="colorSel"
          class="w-8 h-8"
          :class="colorSel"
        ></div>
      </div>
    </div> -->

    <button class="bg-green-400 p-2 rounded-sm mt-6" type="submit">
      Update Parameter
    </button>
  </form>
</template>

<script>
import { updateParameter } from '~/assets/apollo/mutations';

export default {
  props: {
    parameter: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      id: this.parameter.id,
      parameterName: this.parameter.parameter_name,
      minValue: this.parameter.min_range,
      maxValue: this.parameter.max_range,
      target: this.parameter.target,
      color: this.parameter.color,
      colorsArray: [
        'bg-green-400',
        'bg-red-400',
        'bg-blue-400',
        'bg-yellow-400',
        'bg-indigo-400',
        'bg-purple-400',
        'bg-pink-400',
        'bg-gray-400',
      ],
      saving: false,
    };
  },
  methods: {
    async updateParameter() {
      this.saving = true;
      const variables = {
        color: this.color,
        max_range: this.maxValue,
        min_range: this.minValue,
        parameter_name: this.parameterName,
        target: this.target,
        id: this.id,
      };

      const {
        update_parameters: parameter,
      } = await this.$graphql.default.request(updateParameter, variables);

      if (parameter.returning[0].id !== 0) {
        // Success
        this.$router.push(`/parameter/${this.parameterName}?updated=true`);
      } else {
        this.saving = false;
        // Not so success
        throw new Error(
          "Something didn't work. I'd suggest coming up with a better error message."
        );
      }
    },
  },
};
</script>
