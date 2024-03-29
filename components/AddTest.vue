<template>
  <div>
    <form
      action="#"
      method="POST"
      :class="saving ? 'opacity-60' : ''"
      @submit.stop.prevent="addTest"
    >
      <div class="flex flex-col max-w-xs mb-2">
        <label for="parameterId">Parameter</label>
        <select
          id="parameterId"
          v-model.number="parameterId"
          name="parameterId"
          class="p-1 border"
        >
          <option
            v-for="parameter in parameters"
            :key="parameter.id"
            :value="parameter.id"
          >
            {{ parameter.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col max-w-xs mb-2">
        <label for="value">Value</label>
        <input
          id="value"
          v-model.number="value"
          name="value"
          class="p-1 border"
          min="0"
          required
        />
      </div>

      <div class="mb-2">
        <label for="testedToday">Tested Today?</label>
        <input
          id="testedToday"
          v-model="testedToday"
          type="checkbox"
          name="testedToday"
        />
      </div>

      <div v-if="!testedToday">
        <div class="flex flex-col max-w-xs mb-2">
          <label for="testDate">Test Date</label>
          <input
            id="testDate"
            v-model="testDate"
            type="date"
            name="testDate"
            :max="testDate"
            class="p-1 border"
          />
        </div>

        <div class="flex flex-col max-w-xs mb-2">
          <label for="testDate">Test Time</label>
          <input
            id="testTime"
            v-model="testTime"
            type="time"
            name="testTime"
            :max="testTime"
            class="p-1 border"
          />
        </div>
      </div>

      <button
        class="bg-green-400 p-2 rounded-sm"
        type="submit"
        :disabled="saving"
      >
        {{ saving ? 'Adding Test' : 'Add Test' }}
      </button>
    </form>
    <transition name="fade">
      <ToastNotification v-if="showToast" message="Test Added" />
    </transition>
  </div>
</template>

<script>
import dayjs from 'dayjs';

// Apollo
import { parameterNames, parameterId } from '~/assets/apollo/queries';
import { createTest } from '~/assets/apollo/mutations';

export default {
  components: {
    ToastNotification: () => import('~/components/ToastNotification'), // Lazy load it
  },
  data() {
    return {
      parameterId: 1,
      value: 0,
      testedToday: true,
      testDate: dayjs().format('YYYY-MM-DD'),
      testTime: dayjs().format('HH:mm'),
      parameters: [],
      saving: false,
      created: false,
    };
  },
  async fetch() {
    const { parameters } = await this.$graphql.default.request(parameterNames);

    return (this.parameters = parameters);
  },
  computed: {
    showToast() {
      if (this.created === true) {
        this.setToastHide();
        return true;
      }

      return false;
    },
  },
  beforeMount() {
    if (this.$route.query?.parameter) {
      this.getParameterId(this.$route.query.parameter);
    }
  },
  methods: {
    async addTest() {
      this.saving = true;

      const variables = {
        parameterId: this.parameterId,
        value: this.value,
        dateTested: new Date(`${this.testDate} ${this.testTime}`).toISOString(),
      };

      const {
        insert_tests_one: insertTestsOne,
      } = await this.$graphql.default.request(createTest, variables);

      if (insertTestsOne.id && insertTestsOne.id > 0) {
        this.resetForm();
        this.created = true;
      }

      this.saving = false;
    },
    // Reset the form back to it's original glory
    resetForm() {
      this.parameterId = 1;
      this.value = 0;
      this.testedToday = true;
      this.testDate = dayjs().format('YYYY-MM-DD');
      this.testTime = dayjs().format('HH:mm');
    },
    setToastHide() {
      setTimeout(() => (this.created = false), 3000);
    },
    async getParameterId(name) {
      const variables = {
        name,
      };

      const { parameters } = await this.$graphql.default.request(
        parameterId,
        variables
      );

      return (this.parameterId = parameters[0].id);
    },
  },
};
</script>
