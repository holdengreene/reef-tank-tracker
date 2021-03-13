<template>
  <li class="flex w-full justify-center">
    <NuxtLink
      :to="link"
      class="flex flex-col justify-center items-center pt-2 pb-1 w-full h-full border-t-4 border-transparent hover:bg-gray-100 focus:bg-gray-100 transition duration-300 outline-none"
    >
      <slot></slot>
      <span class="text-base">{{ name }}</span>
    </NuxtLink>
  </li>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: '/',
    },
    name: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="postcss">
/* Has to be unscoped for path to take */
@layer components {
  .nuxt-link-exact-active path {
    @apply fill-green-300;
  }
}
</style>

<style lang="postcss" scoped>
@layer components {
  .nuxt-link-exact-active {
    @apply border-green-300;
  }
}
</style>
