<template>
  <form
    action="#"
    method="post"
    :class="saving ? 'opacity-60' : ''"
    @submit.stop.prevent="edit ? updateParameter() : createParameter()"
  >
    <div class="flex flex-col max-w-xs mb-2">
      <label for="parameterName">Name</label>
      <input
        id="parameterName"
        v-model.trim="parameterName"
        class="p-1 border"
        name="parameterName"
        type="text"
        required
      />
    </div>

    <div class="flex flex-col max-w-xs mb-2">
      <label for="minValue">Min Value</label>
      <input
        id="minValue"
        v-model.number.trim="minValue"
        class="p-1 border"
        name="minValue"
        min="0"
        required
      />
    </div>

    <div class="flex flex-col max-w-xs mb-2">
      <label for="maxValue">Max Value</label>
      <input
        id="maxValue"
        v-model.number.trim="maxValue"
        class="p-1 border"
        name="maxValue"
        min="0"
        required
      />
    </div>

    <div class="flex flex-col max-w-xs mb-2">
      <label for="target">Target</label>
      <input
        id="target"
        v-model.number.trim="target"
        class="p-1 border"
        name="target"
        required
      />
    </div>

    <!-- TODO: Switch to checkboxes -->

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

    <button
      class="bg-green-400 p-2 rounded-sm mt-6"
      type="submit"
      :disabled="saving"
    >
      {{ edit ? 'Update Parameter' : 'Create Parameter' }}
    </button>
  </form>
</template>

<script>
import { updateParameter, createParameter } from '~/assets/apollo/mutations';

export default {
  props: {
    parameter: {
      type: Object,
      default() {
        return {};
      },
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: null,
      parameterName: '',
      minValue: 0,
      maxValue: 0,
      target: 0,
      color: 'green',
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
  mounted() {
    // Prepopulate the fields if editing
    if (this.edit) {
      this.id = this.parameter.id;
      this.parameterName = this.parameter.name;
      this.minValue = this.parameter.min_range;
      this.maxValue = this.parameter.max_range;
      this.target = this.parameter.target;
      this.color = this.parameter.color;
    }
  },
  methods: {
    async updateParameter() {
      this.saving = true;
      const variables = {
        color: this.color,
        max_range: this.maxValue,
        min_range: this.minValue,
        name: this.parameterName,
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
    async createParameter() {
      this.saving = true;

      const variables = {
        color: this.color,
        max_range: this.maxValue,
        min_range: this.minValue,
        name: this.parameterName,
        target: this.target,
      };

      const {
        insert_parameters_one: parameter,
      } = await this.$graphql.default.request(createParameter, variables);

      if (parameter.id !== 0) {
        // Success
        this.$router.push(`/parameter/${parameter.name}?created=true`);
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
