<template>
  <div class="bg-gray-50 min-h-screen">
    <Header />
    <Nuxt class="py-5" />
  </div>
</template>

<script>
import Header from '~/components/Header'

export default {
  components: {
    Header,
  },
}
</script>
