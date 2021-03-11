<template>
  <nav class="w-full">
    <div class="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
      <ul class="flex md:divide-x">
        <NavTab link="/" name="Overview">
          <OverviewLogo />
        </NavTab>
        <NavTab link="/add-test" name="Add Test">
          <TestLogo />
        </NavTab>
        <NavTab link="/tank-health" name="Parameters"> </NavTab>
        <NavTab link="/tank-health" name="Tank Health">
          <HealthLogo />
        </NavTab>
      </ul>
    </div>
  </nav>
</template>

<script>
import NavTab from '~/components/NavTab';

// Import SVGs
import OverviewLogo from '~/assets/svg/home.svg';
import TestLogo from '~/assets/svg/test.svg';
import HealthLogo from '~/assets/svg/health.svg';

export default {
  components: {
    NavTab,
    OverviewLogo,
    TestLogo,
    HealthLogo,
  },
};
</script>
