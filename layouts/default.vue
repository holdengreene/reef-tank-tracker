<template>
  <div class="bg-gray-50 min-h-screen">
    <Header />
    <Nuxt class="py-5" />
    <BottomNav />
  </div>
</template>

<script>
import Header from '~/components/Header';
import BottomNav from '~/components/BottomNav';

export default {
  components: {
    Header,
    BottomNav,
  },
};
</script>
